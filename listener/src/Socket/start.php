<?php

//var_dump(__DIR__);

require __DIR__ . "/../../vendor/autoload.php";

$listener = new \Geo\Socket\Listener();
$listener->getSocketInit();
