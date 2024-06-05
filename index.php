<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GP-WORLD</title>
</head>
<link rel="stylesheet" href="./dist/css/style.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css">
<style>
    body, html{
        height: 100%;
        width: 100%;
        background-color:white;
    }
    .main-content-height{
        flex: 1;
        min-height: calc(100vh - 80px); /* Adjust 80px according to your header height */
    }
</style>
<body class="font-nunito">
    <?php
        include('./templates/partial/layout.html.php')
    ?>
    <script type="module" src="./dist/test.js"></script>
</body>
</html>