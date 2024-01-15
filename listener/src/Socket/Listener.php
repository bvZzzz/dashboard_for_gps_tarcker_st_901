<?php

namespace Geo\Socket;

use Geo\DBBuilder\DBBuilder;
use Geo\Lang\Language;

/**
 * Слушает порт.
 * Пишет данные геопозиции gps-трекера в БД.
 * Если данные не корректные, то записывает в черный список
 *
 * Listens on the port.
 * Writes GPS tracker geo position data to the database.
 * If the data is not correct, it is blacklisted
 */
class Listener
{
    /**
     * @var string
     */
    private $server_ip;

    /**
     * @var string
     */
    private $server_port;

    /**
     * @var \Socket
     */
    private $sock;

    /**
     * @var array
     */
    private $clients;

    /**
     * listener constructor.
     */
    public function __construct()
    {
        if (file_exists(__DIR__ . "/../../config/serverconf.ini")){
            $config = parse_ini_file(__DIR__ . "/../../config/serverconf.ini");

            $this->server_ip = $config["server_address"]; // сервер/server
            $this->server_port = $config["server_port"];// порт/port

            if (! empty($config["timezone"])) date_default_timezone_set($config["timezone"]);
        } else {
            printf(Language::CONFIG_NOT_FOUND);
        }
    }

    /**
     * Создаем потоковый сокет TCP/IP
     *
     * Create a TCP/IP stream socket
     */
    public function getSocketInit(): void
    {
        //Задаёт, какие ошибки PHP попадут в отчёт - Specifies which PHP errors will be included in the report
        error_reporting(E_ALL);

        //Время выполнения скрипта - 0 постоянно - Script execution time - 0 constantly
        set_time_limit(0);

        //Включите неявную очистку вывода, чтобы мы видели, что мы получаем, как только оно приходит.
        //Enable implicit output sanitization so we can see what we get as soon as it arrives.
        ob_implicit_flush();

        //Создаем потоковый сокет TCP/IP - Create a TCP/IP stream socket
        $this->sock = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);

        if($this->sock){
            //Сообщаем что сервер запущен - Info server is running
            $this->writeLog(Language::SERVER_READY, $this->server_ip, $this->server_port, Language::SERVER_READY_MSG);
        }

        socket_set_option($this->sock, SOL_SOCKET, SO_REUSEADDR, 1);
        socket_bind($this->sock, $this->server_ip, $this->server_port);
        socket_listen($this->sock);

        $this->getListener();
    }

    /**
     *  Вешает постоянный слушатель на указанный порт, проверяет новые подключения
     *  и футболит тех кто в черном списке
     *
     * Places a permanent listener on the specified port,
     * checks new connections and does not accept connections from those on the blacklist
     *
     * @return void
     */
    private function getListener(): void
    {
        $this->clients = array($this->sock);

        while (true){
	        sleep(1);
            //Создаем копию, чтобы $clients не модифицировались socket_select()
            //Create a copy so that $clients is not modified
            $read = $this->clients;
            $write = null;
            $except = null;

            //Смотрим есть че? - Looking
            if (socket_select($read, $write, $except, 0) < 1){
                continue;
            }

            //Смотрим клиента, если пытается подключиться отправляем ему сообщение, и себе на сервере в лог.
            //We look at the client, if it tries to connect, we send it a message and send it to the log on the server.
            if (in_array($this->sock, $read)){
                $this->clients[] = $newsock = socket_accept($this->sock);

                //socket_write($newsock, "There are ".(count($clients) - 1)." client(s) connected to the server\n"); - если надо отправить сообщение клиенту - if you need to send a message to the client
                socket_getpeername($newsock, $client_ip, $client_port);


                $this->writeLog(Language::CLIENT_CONN, $client_ip, $client_port, Language::CLIENT_CONN_MSG);

                $key = array_search($this->sock, $read);
                unset($read[$key]);


            }
            $this->getListenerData($read);
        }

	    socket_close($sock);
    }

    /**
     * Обрабатывает полученные данные от клиентов, если данные корректные - записывает,
     * если некорректные - клиента в ЧС и отключить.
     * Смотрит кто отключился, пишет в лог.
     *
     * Processes received data from clients,
     * if the data is correct - records it,
     * if incorrect - the client is banned and disabled.
     * Writes log.
     *
     * @param array $read
     * @return void
     */
    private function getListenerData($read): void
    {
        //Цикл по всем клиентам, которые имеют данные для чтения
        //Loop through all clients that have data to read
        foreach ($read as $read_sock){
            //Читаем до новой строки или 1024 байта - Read until newline or 1024 bytes
            //socket_read пока показывает ошибки, когда клиент отключен, поэтому замалчиваем сообщения об ошибках - hide errors
            $data = @socket_read($read_sock, 1024, PHP_BINARY_READ);

            //Отсекаем лишнее у $data которые пришли от клиента
            //We cut off the excess from $data that came from the client
            $data = preg_replace("/[^a-zA-Z0-9.,#]/", "", $data);

            //Тут смотрим отключившихся и пишем в лог
            //Look at those who have disconnected and write to the log
            if (empty($data)) {
                //Удалить клиент из массива $clients
                //Remove client from array $clients
                $key = array_search($read_sock, $this->clients);

                try {
                    if(!@socket_getpeername($read_sock, $client_ip, $client_port)){
                        throw new \Exception(Language::ERR_GETPEERNAME);
                    }
                } catch (\Exception $e){
                    print($e->getMessage() . PHP_EOL);
                }

                // Пишем в лог - logs -- Writes logs
                $this->writeLog(Language::CLIENT_DC . $key, $client_ip, $client_port, Language::CLIENT_DC_MSG);

		        unset($this->clients[$key]);
                continue;
            }

            //Смотрим, если $data не пустая, обрабатываем
            //if $data is not empty, process
            if (!empty($data)) {

                socket_getpeername($read_sock, $client_ip, $client_port);
                $key = array_search($read_sock, $this->clients);

                //Проверяем если IP в черном списке пошел нах..
                //check for ban
                $row = DBBuilder::table('blacklists')
                                    ->select()
                                    ->where('ip', $client_ip)
                                    ->limit(1)
                                    ->get();

                if(!empty($row && $row['attempts'] >= 10)){

                    $this->writeLog(Language::CLIENT_BANNED, $client_ip, $client_port, Language::CLIENT_BANNED_MSG);

                    $key = array_search($this->sock, $read);
                    socket_shutdown($read_sock);

                    unset($read[$key]);
                    continue;

                }

                //Выводит полученные от клиента данные в консоль
                //Outputs data received from the client to the console
                $this->getEventMessage(Language::RECEIVED_DATA . $key . ", data -->" . $data, $client_ip, $client_port);

                //Проверяем че пришло, если все ок то пишем в базу. Если нет, то в клиента в ЧС и дисконект
                //We check the data, if everything is ok, we write it to the database. If not, then ban the client and disconnect
                $received_data = explode(",", $data);

                if(isset($received_data[1])){
                    $id_tracker = preg_replace("/[^0-9]/", "", $received_data[1]);
                } else{
                    $id_tracker = null;
                }

                if(empty($id_tracker)){
                    $this->getBan($client_ip, $client_port, $read_sock, $data);
                    socket_shutdown($read_sock);
                } else {
                    $this->writeH02data($data, $id_tracker);
                }
            }
        }
    }

    /**
     * Пишем данные в таблицу - d_h02data
     *
     * We write data into a table
     *
     * @param string $data - строка с данными полученная от клиента/string with data received from the client
     * @param string $id_tracker - строка уникальный ID клиента/string unique client ID
     * @return void
     */
    private function writeH02data($data, $id_tracker): void
    {
        $row = DBBuilder::table('h02datas')
                                ->select('id_tracker')
                                ->where('id_tracker', $id_tracker)
                                ->limit(1)
                                ->get();

        if($row['id_tracker']){
            list(
                $hoc,
                $id_tracker,
                $sep1,
                $whattime,
                $sep2,
                $latitude,
                $latmark,
                $longitude,
                $longmark,
                $speed,
                $speedlongitude,
                $whatdate,
                $vehicle1,
                $vehicle2,
                $vehicle3,
                $vehicle4,
                $vehicle5
                ) = explode(",", $data);

            $fields = [
                "event_datetime" => date( "Y-m-d H:i:s" ),
                "hoc" => $hoc,
                "id_tracker" => $id_tracker,
                "sep1" => $sep1,
                "whattime" => $whattime,
                "sep2" => $sep2,
                "latitude" => $latitude,
                "latmark" => $latmark,
                "longitude" => $longitude,
                "longmark" => $longmark,
                "speed" => $speed,
                "speedlongitude" => $speedlongitude,
                "whatdate" => $whatdate,
                "vehicle1" => $vehicle1,
                "vehicle2" => $vehicle2,
                "vehicle3" => $vehicle3,
                "vehicle4" => $vehicle4,
                "vehicle5" => $vehicle5,
                "vehicle6" => null,
                "vehicle7" => null
            ];

            DBBuilder::table('h02datas')
                            ->insert($fields)
                            ->set();

        }
    }

    /**
     * Добавляет IP-адрес и порт в ЧС и выводит сообщение в консоль
     *
     * Adds an IP address and port to the ban list and displays a message in the console
     *
     * @param string $ip - IP-адрес клиента
     * @param string $port - порт клиента
     * @param \Socket $sock - сокет который ему дали в момент подключения
     * @param $value
     * @return void
     */
    private function getBan($ip, $port, $sock, $value): void
    {
        $row = DBBuilder::table('blacklists')
            ->select()
            ->where('ip', $ip)
            ->get();

        if(!empty($row)){
            $attempts = (int)$row['attempts'];

            DBBuilder::table('blacklists')
                ->update([
                    'attempts' => ++$attempts
                ])
                ->where('ip', $ip)
                ->set();
        } else {
            DBBuilder::table('blacklists')
                ->insert([
                    "ip" => $ip,
                    "port" => $port,
                    "value" => $value,
                    "attempts" => 0,
                ])
                ->set();
        }

        $this->writeLog(Language::ADD_TO_BLACKLIST, $ip, $port, Language::BAD_DATA);

        $key = array_search($sock, $this->clients);
        unset($this->clients[$key]);
    }

    /**
     * Пишем данные в таблицу - d_log и выводит сообщение в консоль
     *
     * Writes data to the table - d_log and display a message in the console
     *
     * @param string $event
     * @param string $ip
     * @param string $port
     * @param string $value - описание события/event description
     * @return void
     */
    private function writeLog($event, $ip, $port, $value = ""): void
    {
        DBBuilder::table('logs')
                    ->insert([
                        "event" => $event,
                        "ip" => $ip,
                        "port" => $port,
                        "value" => $value
                    ])
                    ->set();

        $this->getEventMessage($event, $ip, $port);
    }

    /**
     * Выводит в консоль сообщение
     *
     * Prints a message to the console
     *
     * @param string $event
     * @param string $ip
     * @param string $port
     * @return void
     */
    private function getEventMessage($event, $ip, $port): void
    {
        print "Event: " . date("Y-m-d H:i:s") . ", {$event} ip: {$ip}:{$port} \n";
    }

    public function __destruct()
    {
        socket_close($this->sock);
    }
}
