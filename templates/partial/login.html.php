<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
        body {
            background-image: url('https://static.vecteezy.com/ti/photos-gratuite/p1/21660306-global-affaires-reseau-distribution-et-la-technologie-numerique-futur-de-cargaison-conteneurs-logistique-transport-concept-double-exposition-de-cargaison-bateau-moderne-futuriste-transport-importer-exportation-photo.jpg');
            font-family: 'Poppins', sans-serif;
        }
    </style>
</head>
<body class="flex items-center justify-center min-h-screen mt-4">
    <div class="wrapper max-w-xs min-h-[500px] p-8 bg-[#ecf0f3] rounded-[15px] shadow-[10px_10px_10px_#cbced1,-10px_-10px_10px_#fff]">
        <div class="logo w-20 mx-auto mb-4">
            <img src="logo1.png" alt="Logo" class="w-full h-20 object-cover rounded-full shadow-[0_0_3px_#5f5f5f,0_0_0_5px_#ecf0f3,8px_8px_15px_#a7aaa7,-8px_-8px_15px_#fff]">
        </div>
        <div class="name text-center mt-4 text-xl font-semibold tracking-wider text-gray-600">
            SMD-GP
        </div>
        <div id="formContainer">
            <!-- Login Form -->
            <form class="p-3 mt-3" id="loginForm">
                <div class="form-field relative flex items-center p-2 mb-2 bg-white rounded-full shadow-[13px_13px_20px_#cbced1,-13px_-13px_20px_#fff]">
                    <span class="fas fa-user text-gray-500 pl-4"></span>
                    <input type="text" name="userName" id="loginUserName" placeholder="Email" class="pl-3 pr-4 text-lg text-gray-700 outline-none bg-transparent w-full rounded-full">
                </div>
                <div id="loginEmailError" class="text-red-500 text-xs italic mb-4 hidden">Please enter a valid email.</div>
                <div class="form-field relative flex items-center p-2 mb-2 bg-white rounded-full shadow-[13px_13px_20px_#cbced1,-13px_-13px_20px_#fff]">
                    <span class="fas fa-key text-gray-500 pl-4"></span>
                    <input type="password" name="password" id="loginPwd" placeholder="Password" class="pl-3 pr-4 text-lg text-gray-700 outline-none bg-transparent w-full rounded-full">
                </div>
                <div id="loginPasswordError" class="text-red-500 text-xs italic mb-4 hidden">Password must be at least 6 characters long.</div>
                <button type="submit" class="btn w-full py-2 mt-4 text-white bg-[#03A9F4] rounded-full shadow-[3px_3px_3px_#b1b1b1,-3px_-3px_3px_#fff] hover:bg-[#039BE5]">
                    Login
                </button>
            </form>
            <!-- Register Form -->
            <form class="p-3 mt-3 hidden" id="registerForm">
                <div class="form-field relative flex items-center p-2 mb-2 bg-white rounded-full shadow-[13px_13px_20px_#cbced1,-13px_-13px_20px_#fff]">
                    <span class="fas fa-user text-gray-500 pl-4"></span>
                    <input type="text" name="userName" id="registerUserName" placeholder="Email" class="pl-3 pr-4 text-lg text-gray-700 outline-none bg-transparent w-full rounded-full">
                </div>
                <div id="registerEmailError" class="text-red-500 text-xs italic mb-4 hidden">Please enter a valid email.</div>
                <div class="form-field relative flex items-center p-2 mb-2 bg-white rounded-full shadow-[13px_13px_20px_#cbced1,-13px_-13px_20px_#fff]">
                    <span class="fas fa-key text-gray-500 pl-4"></span>
                    <input type="password" name="password" id="registerPwd" placeholder="Password" class="pl-3 pr-4 text-lg text-gray-700 outline-none bg-transparent w-full rounded-full">
                </div>
                <div id="registerPasswordError" class="text-red-500 text-xs italic mb-4 hidden">Password must be at least 6 characters long.</div>
                <button type="submit" class="btn w-full py-2 mt-4 text-white bg-[#03A9F4] rounded-full shadow-[3px_3px_3px_#b1b1b1,-3px_-3px_3px_#fff] hover:bg-[#039BE5]">
                    Register
                </button>
            </form>
        </div>
        <div class="text-center text-sm text-gray-600 mt-4">
            <a href="#" id="toggleForm" class="text-[#03A9F4] hover:text-[#039BE5]">Sign up</a> or <a href="#" id="toggleFormLogin" class="text-[#03A9F4] hover:text-[#039BE5] hidden">Login</a>
        </div>
    </div>
    <script type="module" src="./dist/map.js"></script>
</body>
</html>
