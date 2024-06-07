<nav class="bg-pink-600 shadow-md text-black">
        <div class="flex justify-between items-center">
            <div class="flex flex-row items-center ml-4">
                <a class="flex flex-row items-center cursor-pointer" href="#"><img class="h-20" src="./dist/images/logo1.png" alt="SMD-GP"><span class="font-bold text-xl ml-2">SMD-GP</span></a>
                <button class="ml-16 cursor-pointer"><i class="fa-solid fa-bars text-xl"></i></button>
            </div>
            <div class="relative flex-1 hidden lg:block mx-16">
                <input class="h-12 w-full max-w-xl rounded-full outline-none pl-10 border border-blue-400 bg-gray-200" type="text" placeholder="Rechercher">
                <div class="absolute top-3 left-3">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </div>       
            </div>  
            <div class="flex items-center mr-4">
                <div class="relative mr-4 cursor-pointer">
                </div>
                <button type="button" onclick="my_modal_4.showModal()" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><i class="fa-solid fa-plus"></i>&nbsp;Ajouter cargaison</button>
                <img class="h-10 rounded-full cursor-pointer hover:scale-125 transition-transform duration-200 ease-out" src="./dist/images/logo1.png" alt="Moi">
            </div>
            <!-- <div class="mr-4">
                <img class="h-10 rounded-full cursor-pointer hover:scale-125 transition-transform duration-200 ease-out" src="./dist/images/profile.png" alt="Moi">
            </div> -->
        </div>
    </nav>
    <div class="flex main-content-height">
        <!-- Sidebar -->
        <div class="w-64 bg-blue-400">
            <ul class="text-custom-blue-sky text-lg font-bold p-6">
                <form method="post">
                    <input type="hidden" name="layout" value="cargo">
                    <li class="mb-10">
                        <button type="submit" class="hover:text-gray-300">
                            <i class="bi bi-luggage"></i>
                            <span>Cargaisons</span>
                        </button>
                    </li>
                </form>
                <form method="post">
                    <input type="hidden" name="layout" value="product">
                    <li class="mb-10">
                        <button type="submit" class="hover:text-gray-300">
                            <i class="fa-solid fa-box mr-2"></i>
                            <span>Produits</span>
                        </button>
                    </li>
                </form>
                <li class="mb-10">
                    <a href="" class="hover:text-gray-300">
                        <i class="fa-solid fa-cog mr-2"></i>
                        <span>Paramètre</span>
                    </a>
                </li>
                <li class="mb-10">
                    <a href="" class="hover:text-gray-300">
                        <i class="fa-solid fa-user mr-2"></i>
                        <span>Utilisateur</span>
                    </a>
                </li>
                <li class="mb-10">
                    <a href="" class="hover:text-gray-300">
                        <i class="fa-solid fa-chart-line mr-2"></i>
                        <span>Dashbord</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="flex flex-col w-full">
            <!-- main content -->
            <div class="flex-1 p-4">
               <?php
                if(isset($_POST["layout"])){
                    switch($_POST["layout"]){
                        case 'cargo': 
                            include('cargo.html.php');
                            break;
                        case 'product': 
                            include('product.html.php');
                            break;
                        default: 
                    }
                }else{
                    include('cargo.html.php');
                }
               ?>
            </div>

            <!-- footer -->
            <footer class="p-4 bg-pink-600 flex items-center justify-between">
                <div>
                    <a class="flex flex-row items-center cursor-pointer" href="#">
                        <img class="h-12" src="./dist/images/logo1.png" alt="SMD-GP">
                        <span class="font-bold text-sm ml-2">SMD-GP</span>
                    </a>
                </div>
                <div>
                    &copy;&nbsp;&nbsp;<span class="font-bold text-sm">Sonatel-2024</span>
                </div>
            </footer>
        </div>
    </div>
    