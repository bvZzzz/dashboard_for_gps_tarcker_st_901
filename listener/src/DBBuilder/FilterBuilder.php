<?php
namespace Geo\DBBuilder;

class FilterBuilder
{
    /**
     * Превращает массив для функции update в строку - имя поля = значение
     *
     * @param array $data - массив в данными
     * @return string $fields - возвращает готовую строку
     */
    public static function getUpdateString(array $data)
    {
        $i=0; $fields="";
        foreach ($data as $k => $v) {
            $mark = (count($data) - 1 > $i) ? "," : "";
            $fields .= "" . $k . "=:" . $k . $mark;
            $i++;
        }
        return $fields;
    }

    /**
     * @param string $type
     * @param array $value
     * @throws \Exception
     */
    public static function checkRequestType(string $type, array $value)
    {
        if(!in_array($type, $value)){
            throw new \Exception("Can only be added to SELECT or UPDATE");
        }
    }

    /**
     * @param string $table
     * @param string $field
     * @param string $as
     * @return string
     */
    public static function getCountSql(string $table, string $field, string $as): string
    {
        if(isset($field)){

            if(!empty($as)){
                $as = " AS " . $as;
            }

            return "SELECT COUNT(" . $field . ") " . $as . " FROM " . $table;
        }

        return '';
    }

    /**
     * @param string $table
     * @param array $fields
     * @return string
     */
    public static function getSelectSql(string $table, string $fields): string
    {
        if(!empty($fields) && !empty($table)){
            preg_match('/\w+/', $table, $matchTable);

            return "SELECT " . $fields . " FROM " . $matchTable[0];
        }

        return '';
    }

    /**
     * @param string $table
     * @param string $column
     * @param string $values
     * @return string
     */
    public static function getInsertSql(string $table, string $column, string $values): string
    {
        if(isset($column) && isset($values)){
            return "INSERT INTO `" . $table . "` " . $column . " VALUES " . $values;
        }

        return '';
    }

    /**
     * @param string $table
     * @param array $fields
     * @return string
     */
    public static function getUpdateSql(string $table, array $fields): string
    {
        if(isset($fields)){
            return 'UPDATE ' . $table . ' SET ' . self::getUpdateString($fields);
        }

        return '';
    }

    public static function getLeftJoinSql($table, $join)
    {
        if(!empty($table) && !empty($join)){
            return " LEFT JOIN " . $table . " ON " . $join;
        }

        return '';
    }

    /**
     * @param string $table
     * @return string
     */
    public static function getDeleteSql(string $table)
    {
        if(isset($table)){
            return 'DELETE FROM ' . $table;
        }

        return '';
    }

    /**
     * @param string $table
     * @return string
     */
    public static function getTruncateSql(string $table)
    {
        if(isset($table)){
            return 'TRUNCATE TABLE ' . $table;
        }

        return '';
    }

    /**
     * @param array $where
     * @return string
     */
    public static function getWhereString($where = []): string
    {
        if (!empty($where)) {
            return " WHERE " . implode(' AND ', $where);
        }

        return '';
    }

    /**
     * @param $limit
     * @return string
     */
    public static function getLimitString($limit): string
    {
        if (isset($limit)) {
            return $limit;
        }

        return '';
    }

    /**
     * @param $groupBy
     * @return string
     */
    public static function getGroupByString($groupBy): string
    {
        if(isset($groupBy)){
            return $groupBy;
        }

        return '';
    }

    /**
     * @param $orderBy
     * @return string
     */
    public static function getOrderByString($orderBy): string
    {
        if(isset($orderBy)){
            return $orderBy;
        }

        return '';
    }

    /**
     * @param string $filed
     * @param string $value
     * @param array $where
     * @return string
     */
    public static function getLikeString($filed, $value, $where = []): string
    {
        if (!empty($filed)) {
            $and = (count($where) >= 1) ? ' AND ' : '';
            return $and . $filed . " LIKE '" . $value . "'";
        }

        return '';
    }
}