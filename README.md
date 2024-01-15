# Dashboard for GPS ST-901

* Your own monitoring system for your GPS tracker st-901 which can be deployed on your local server
* You can create groups
* Personal profile for each device
* Displays stopping points on the map
* Points can be saved
* All routes are recorded in the database, it is possible to look at the date you need
* Displays device statistics
* OpenStreetMap/Yandex maps (need API key)

//RU
* Собственная система мониторинга для вашего GPS-трекера ST-901, которую можно развернуть на локальном сервере
* Может создавать группы устройств
* Персональная карточка для каждого устройства
* Отображает точки остановки на карте
* Точки можно сохранять
* Все маршруты записываются в БД, есть возможность посмотреть за нужную вам дату
* Отображает статистику по устройству
* Карты - OpenStreetMap/Яндекс карты(будет нужен API ключ)

[![Dashboard.jpg](https://i.postimg.cc/Pqy3V4ks/7-7.jpg)](https://postimg.cc/B88BX26M)

| Profile | Groups | Devices | ST 901 |
| --- | --- | --- | --- |
| [![Profile](https://i.postimg.cc/8zp4xvkh/8-8.jpg)](https://postimg.cc/D8N1X8XZ)  | [![Groups](https://i.postimg.cc/k4d1Tg4Z/9.jpg)](https://postimg.cc/94JYMVyt) | [![Devices](https://i.postimg.cc/bvFbvCXR/10-10.jpg)](https://postimg.cc/wtL3fkjt)  | [![ST-901](https://i.postimg.cc/ZYWfDZRV/1-a9e46097fc045f1ea0ef6753ad2eb172.jpg)](https://postimg.cc/qgdXzP23) |

# Getting Started

- For Debian/Ubuntu install LEMP/PHP 8.2
- Install Nodejs 16+

- Settings nginx example

```nginx

server {
    listen 80;
    server_name sitename;
    root /var/www/sitename/public;

    index index.html index.htm index.php;

    error_log  /var/log/nginx/error.log;
    access_log /var/log/nginx/access.log;

    #location / {
    #    try_files $uri $uri/ =404;
    #}

    location / {
         try_files $uri $uri/ /index.php$is_args$args;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
		
	#try_files $uri /index.php =404;
        #fastcgi_pass php-upstream;
        #fastcgi_index index.php;
        fastcgi_buffers 16 16k;
        fastcgi_buffer_size 32k;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        #fixes timeouts
        fastcgi_read_timeout 600;
        #include fastcgi_params;
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
     }

    location ~ /\.ht {
        deny all;
    }

}
```

`sudo ln -s /etc/nginx/sites-available/your_domain /etc/nginx/sites-enabled/`


# Dashboard

`git clone https://github.com/bvZzzz/dashboard_for_gps_tarcker_st-901.git`

`apt install php8.2-curl php8.2-gd php8.2-dom php8.2-xml php8.2-mysql` - optional

`mv dashboard_for_gps_tarcker_st-901 sitename`

`composer install`

`npm install`

`php artisan migrate`

`npm run prod`

`php artisan view:cache`

`php artisan view:clear`

`chmod 777 storage -R`

`php artisan key:generate`


After
- Go to http://sitename/register

- Add Groups - Settings - Groups
- Add Devices - Settings - Devices


# ST-901

Command: 804+PASSWORD+ +IP+ +PORT

`804000 10.10.10.10 11111` (send SMS)


# Listener

- listener\config\config.ini - for access the database

```
db_type = "mysql"
db_host = "localhost"
db_name = "db_name"
db_user = "user"
db_passwd = "user"
```

- listener\config\serverconf.ini - server settings

```
server_address = "10.10.10.10"
server_port = "11111"
timezone = "UTC"
```

if you are using a local server, you must specify the local server address

- Start listener

`./listener/src/Socket/init.sh`


# More

- env - description

``` env
MIX_APP_NAME=AppName 
MIX_STROKECOLOR=#f3005f //Color line
MIX_STROKEWIDTH_LINE=5 //Width line
MIX_STROKEOPACITY=0.6 //Opacity
MIX_ICONCOLOR=#0095b6 //Baloon color stay
MIX_ICONCOLOR_MOVE=#cc4f1e //Baloon color move
MIX_STROKEWIDTH_BALOON=4 //Baloon width
MIX_APIKEY=api_key //API KEY for Yandex map
MIX_LATITUDE=55.755793 //Default latitude 
MIX_LONGITUDE=37.617134 //Default longitude
MIX_LOCALE=eu //Language ru/eu
MIX_ALTERNATIVE_ICON=/images/vendor/leaflet/dist/marker-icon-red.png //Alternative icon
MIX_UPDATE_INTERVAL=30000 //Update location interval
MIX_MAP_ZOOM=16 //Default zoom map
```
