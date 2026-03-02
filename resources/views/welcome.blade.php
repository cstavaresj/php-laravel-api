<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bands API - Laravel 12</title>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>
<body>
    <canvas id="bg-canvas"></canvas>
    <div class="container">
        <div class="icon">🎸</div>
        <h1>Bands API</h1>
        <p class="subtitle">API REST construída com Laravel 12 + PHP 8.5</p>

        <div class="endpoints">
            <h2>Endpoints Disponíveis</h2>
            <div class="endpoint">
                <span class="method">GET</span>
                <a href="/api/bands">/api/bands</a>
            </div>
            <div class="endpoint">
                <span class="method">GET</span>
                <a href="/api/bands?gender=Nu Metal">/api/bands?gender=Nu Metal</a>
            </div>
            <div class="endpoint">
                <span class="method">GET</span>
                <a href="/api/bands/1">/api/bands/{id}</a>
            </div>
            <div class="endpoint">
                <span class="method post">POST</span>
                <span class="endpoint-url">/api/bands</span>
            </div>
        </div>

        <p class="footer">Powered by Laravel 12 &bull; WampServer &bull; MySQL</p>
    </div>
    <script src="{{ asset('js/background.js') }}"></script>
</body>
</html>
