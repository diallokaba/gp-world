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
<link href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" rel="stylesheet">
<style>
    body, html{
        height: 100%;
        width: 100%;
    }
    .main-content-height{
        flex: 1;
        min-height: calc(100vh - 80px); /* Adjust 80px according to your header height */
    }

    .swiper-container {
      width: 100%;
      height: 59vh; /* Adjust height as needed */
    }
    .swiper-slide {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%; /* Ensure it takes full height of container */
      overflow: hidden; /* Hide any overflow */
    }
    .swiper-slide img {
      width: 100%;
      height: 100%;
      object-fit: cover; /* Ensure image covers the container without distortion */
    }
    .swiper-pagination-bullet {
      background: #4f46e5;
      position: relative;
      top: -275px; /* Adjust position as needed */
    }
    .swiper-button-prev, .swiper-button-next {
      background: rgba(255, 255, 255, 0.7); /* Light background for better visibility */
      border-radius: 50%;
      width: 44px;
      height: 44px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      margin-top: -170px; /* Adjust position as needed */
    }
    .swiper-button-prev::after, .swiper-button-next::after {
      font-size: 18px;
      color: #4f46e5;
    }
</style>
<body class="font-nunito">
    <?php
        if(isset($_POST["layout"]) && $_POST["layout"] == "cargo"){
            include("./templates/partial/layout.html.php");
        }else if(isset($_POST["login"]) && $_POST["login"] == "login-page"){
            include("./templates/login.html.php");
        }else{
            include('./templates/suivi-colis.html.php');
        }
    ?>

<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script src="./dist/carousel.js"></script>
</body>
</html>