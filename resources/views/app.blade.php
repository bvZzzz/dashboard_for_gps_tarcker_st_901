<html lang="ru">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
    <link href="{{ mix('/css/app.css')}}" rel="stylesheet"/>
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <script src="{{ mix('/js/app.js')}}" defer></script>
    <script src="{{ mix('/js/manifest.js')}}" defer></script>
    <script src="{{ mix('/js/vendor.js')}}" defer></script>
</head>
<body>
    @routes
    @inertia
</body>
</html>
