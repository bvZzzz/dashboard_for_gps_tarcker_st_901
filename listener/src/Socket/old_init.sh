#!/bin/bash

#php /var/www/listener/src/Socket/start.php

while true
    do
     php /var/www/listener/src/Socket/start.php &
     PID=$!
     sleep 10800
     kill -SIGKILL $PID
done


