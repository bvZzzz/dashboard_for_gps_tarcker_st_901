#!/bin/bash
while true
    do
    php /var/www/gps/listener/src/Socket/start.php &

    sleep 1800;

    PIDPHP=$(ps aux | grep start.php | grep -v grep | awk '{print $2}');

    kill $PIDPHP;
done