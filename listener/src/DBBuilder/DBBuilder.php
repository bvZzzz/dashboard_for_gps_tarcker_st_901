<?php

namespace Geo\DBBuilder;

use Geo\DBBuilder\SQLQueryBuilder;
use Geo\DBBuilder\GetErrorInfo;

class DBBuilder implements SQLQueryBuilder
{
    use GetErrorInfo;

    /**
     * @var
     */
    private static $instance;

    /**
     * @var \stdClass
     */
    private $query;

    /**
     * @var array
     */
    private array $where = [];
    /**
     * @var string
     */
    private string $table;

    /**
     *
     */
    private $DBhandler;

    /**
     * DBBuilder constructor.
     * @param string $table
     */
    public function __construct(string $table)
    {
        $this->query = new \stdClass();
        $this->table = $table;

        $this->DBhandler = new DBHandler();
    }

    public static function table(string $table): DBBuilder
    {
//        if(!self::$instance){
//            return new DBBuilder($table);
//        }
        return new DBBuilder($table);
    }

    /**
     * @param array|string[] $fields
     * @return SQLQueryBuilder
     */
    public function select(string $fields = '*'): SQLQueryBuilder
    {
        $this->query->base = FilterBuilder::getSelectSql($this->table, $fields);
        $this->query->type = 'select';

        return $this;
    }

    /**
     * @param array $fields
     * @return SQLQueryBuilder
     */
    public function insert(array $fields): SQLQueryBuilder
    {
        $column = "(`".implode("`, `", array_keys($fields))."`)";
        $values = "(:".implode(", :", array_keys($fields)).")";

        $this->query->base = FilterBuilder::getInsertSql($this->table, $column, $values);
        $this->query->data = $fields;
        $this->query->type = 'insert';

        return $this;
    }

    /**
     * @param array $fields
     * @return SQLQueryBuilder
     */
    public function update(array $fields): SQLQueryBuilder
    {
        $this->query->base = FilterBuilder::getUpdateSql($this->table, $fields);
        $this->query->data = $fields;
        $this->query->type = 'update';

        return $this;
    }

    public function left_join(string $table, string $field, string $value, string $operator = '=')
    {
        $this->query->join_table = $table;
        $this->query->left_join = $field . $operator . $value;

        return $this;
    }

    /**
     * @return SQLQueryBuilder
     */
    public function delete(): SQLQueryBuilder
    {
        $this->query->base = FilterBuilder::getDeleteSql($this->table);
        $this->query->type = 'delete';

        return $this;
    }

    /**
     * @return SQLQueryBuilder
     */
    public function truncate(): SQLQueryBuilder
    {
        $this->query->base = FilterBuilder::getTruncateSql($this->table);
        $this->query->type = 'truncate';

        return $this;
    }

    /**
     * @param string $field
     * @param string $value
     * @param string $operator
     * @return SQLQueryBuilder
     * @throws \Exception
     */
    public function where(string $field, string $value, string $operator = '='): SQLQueryBuilder
    {
        FilterBuilder::checkRequestType($this->query->type, ['select', 'update', 'delete']);

        $this->query->where[] = "{$field} {$operator} :" . trim($field);
        $this->query->data[$field] = $value;

        return $this;
    }

    /**
     * @param string $field
     * @param string $value
     * @return SQLQueryBuilder
     * @throws \Exception
     */
    public function like(string $field, string $value): SQLQueryBuilder
    {
        FilterBuilder::checkRequestType($this->query->type, ['select']);

        $this->query->like_field = $field;
        $this->query->like_value = $value;

        return $this;
    }

    /**
     * @param int $start
     * @param int $offset
     * @return SQLQueryBuilder
     * @throws \Exception
     */
    public function limit(int $start, int $offset = 0): SQLQueryBuilder
    {
        FilterBuilder::checkRequestType($this->query->type, ['select']);

        $offset = $offset != 0 ? ", " . $offset : '';
        $this->query->limit = " LIMIT " . $start .  $offset;

        return $this;
    }

    /**
     * @param string $value
     * @return SQLQueryBuilder
     * @throws \Exception
     */
    public function groupBy(string $value): SQLQueryBuilder
    {
        FilterBuilder::checkRequestType($this->query->type, ['select']);

        $this->query->groupBy = " GROUP BY " . $value;

        return $this;
    }

    /**
     * @param string $filed
     * @param string $mode
     * @return SQLQueryBuilder
     * @throws \Exception
     */
    public function orderBy(string $filed, string $mode = 'ASC'): SQLQueryBuilder
    {
        FilterBuilder::checkRequestType($this->query->type, ['select']);

        $this->query->orderBy = " ORDER BY `" . $filed . "` " . $mode;

        return $this;
    }

    /**
     * @param $id
     * @return \PDOStatement
     */
    public function find($id)
    {
        //FilterBuilder::checkRequestType($this->query->type, ['select']);
        preg_match('/\w+/', $id, $matchId);

        $sql = "SELECT * FROM {$this->table} WHERE id=:id";

        $stmt = $this->DBhandler->prepare($sql);
        $stmt->bindParam(':id', $matchId[0]);
        $stmt->execute();

        if(!$stmt){
            die($this->getErrorMessage($stmt->errorInfo()));
        }

        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    /**
     * @param string $filed
     * @param string $as
     * @return \PDOStatement
     */
    public function count(string $field, string $as = '')
    {
        $sql = FilterBuilder::getCountSql($this->table, $field, $as);
        $request = $this->DBhandler->query($sql);

        if(!$request){
            die($this->getErrorMessage($this->DBhandler->errorInfo()));
        }

        return $request->fetch(\PDO::FETCH_ASSOC);
    }

    /**
     * debug mode
     */
    public function debug(): SQLQueryBuilder
    {
        $this->query->debug = true;

        return $this;
    }

    /**
     * @param $query
     * @return string
     */
    private function getSQLString($query): string
    {
        $sql = $query->base;

        if(isset($query->join_table)){
            $sql .= FilterBuilder::getLeftJoinSql($query->join_table, $query->left_join);
        }

        if(isset($query->where)){
            $sql .= FilterBuilder::getWhereString($query->where);
        }

        if(isset($query->like_field)){
            $sql .= FilterBuilder::getLikeString($query->like_field, $query->like_value, $query->where);
        }

        if(isset($query->groupBy)){
            $sql .= FilterBuilder::getGroupByString($query->groupBy);
        }

        if(isset($query->orderBy)){
            $sql .= FilterBuilder::getOrderByString($query->orderBy);
        }

        if(isset($query->limit)){
            $sql .= FilterBuilder::getLimitString($query->limit);
        }

        $sql .= ";";

        return $sql;
    }

    private function clear()
    {
        unset($this->query->where);
        unset($this->query->like_field);
        unset($this->query->like_value);
    }

    /**
     * @return mixed
     */
    public function get()
    {
        $sql = $this->getSQLString($this->query);

        $stmt = $this->DBhandler->prepare($sql);
        $stmt->execute($this->query->data);

        $error = $this->getErrorCode($stmt->errorInfo());

        if($error !== '00000'){
            print_r($this->getErrorMessage($stmt->errorInfo()));
        }

        if(isset($this->query->debug)){
            var_dump($sql);
        }

        $this->clear();

        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }
    /**
     * @return array
     */
    public function getAll()
    {
        $sql = $this->getSQLString($this->query);

        $stmt = $this->DBhandler->prepare($sql);
        $stmt->execute($this->query->data);

        $error = $this->getErrorCode($stmt->errorInfo());

        if($error !== '00000'){
            print_r($this->getErrorMessage($stmt->errorInfo()));
        }

        if(isset($this->query->debug)){
            var_dump($sql);
        }

        $this->clear();

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
    /**
     * @return bool
     */
    public function set()
    {
        $query = $this->query;
        $sql = $query->base;

        if(in_array($query->type,['update', 'delete'])){
            $sql .= FilterBuilder::getWhereString($this->query->where);
        }

        if(isset($this->query->debug)){
            var_dump($sql);
            var_dump($this->query->data);
        }

	//var_dump($this->query->data);

        $stmt = $this->DBhandler->prepare($sql);
        $stmt->execute($this->query->data);

        $error = $this->getErrorCode($stmt->errorInfo());

        if($error !== '00000'){
            print_r($this->getErrorMessage($stmt->errorInfo()));
        }

        $this->clear();

        return true;
    }

    public function __wakeup() {}

    public function __clone()  {}


}
