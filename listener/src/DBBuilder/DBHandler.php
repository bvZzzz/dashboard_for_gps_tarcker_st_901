<?php


namespace Geo\DBBuilder;

use Geo\DBBuilder\GetErrorInfo;

class DBHandler extends \PDO
{
    use GetErrorInfo;
    /**
     * @var array
     */
    private $config_data;

    /**
     * @var string
     */
    private $dsn;

    /**
     * @var \PDO
     */
    private $handler;

    /**
     * DBHandler constructor.
     */
    public function __construct()
    {
        //Read config file
        if(file_exists(__DIR__ . '/../../config/conf.ini')){
            $this->config_data = parse_ini_file(__DIR__ . '/../../config/conf.ini');
        } else {
            printf(self::class .  " - config file not found!");
            exit();
        }

        try {
            $this->dsn = $this->config_data['db_type'] . ":dbname=" .
                $this->config_data['db_name'] . ";host=" . $this->config_data['db_host'];

            parent::__construct($this->dsn, $this->config_data['db_user'], $this->config_data['db_passwd']);

        } catch (\PDOException $e){
            throw new \Exception("Can't connect to DB.");
        }
    }

}
