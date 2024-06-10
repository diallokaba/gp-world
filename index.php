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
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<style>
    body, html{
        height: 100%;
        width: 100%;
    }
    .main-content-height{
        flex: 1;
        min-height: calc(100vh - 80px); /* Adjust 80px according to your header height */
    }

    .swal-custom {
        font-family: 'Arial', sans-serif;
        border-radius: 10px;
        background-color: #f9f9f9;
        padding: 20px;
    }

    .swal-custom .swal2-title {
        font-size: 24px;
        color: #333;
    }

    .swal-custom .swal2-icon.swal2-error {
        border-color: #e74c3c;
        color: #e74c3c;
    }

    .swal-custom .swal2-timer-progress-bar {
        background-color: #e74c3c;
    }
</style>
<body class="font-nunito">
    <?php
        if(isset($_POST["suivi"]) && $_POST["suivi"] == "dashboard"){
            include("./templates/partial/layout.html.php");
        }else{
            include('./templates/suivi-colis.html.php');
        }
    ?>
</body>
</html>