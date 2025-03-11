<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Diablo Chess</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
        <h1>Sanctuary Chess</h1>
        <div class="game-info">
            <div id="turn-indicator">Angels' turn</div>
            <button id="reset-button">New Battle</button>
        </div>
        <div id="chessboard"></div>
        <div id="captured-pieces">
            <div id="white-captured" class="captured-area">
                <h3>Demons Slain</h3>
                <div class="pieces"></div>
            </div>
            <div id="black-captured" class="captured-area">
                <h3>Angels Fallen</h3>
                <div class="pieces"></div>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
