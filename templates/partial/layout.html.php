<nav class="bg-custom-red-300 shadow-md">
    <div class="flex justify-between items-center py-4 px-6">
        <div class="flex items-center">
            <a class="flex items-center text-white text-2xl font-bold" href="#">
                <span>Menadi Cargo</span>
            </a>
            <button class="ml-16 text-white"><i class="fas fa-bars text-2xl"></i></button>
        </div>
        <div class="relative flex-1 hidden lg:block mx-16">
            <input
                class="h-12 w-full max-w-xl rounded-full outline-none pl-10 pr-4 border border-white text-gray-700 placeholder-gray-400"
                type="text" placeholder="Rechercher">
            <div class="absolute top-3 left-3 text-gray-400">
                <i class="fas fa-search"></i>
            </div>
        </div>
        <div class="flex items-center">
            <div class="relative mr-4 text-white">
                <i class="fas fa-bell text-2xl"></i>
                <span
                    class="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">3</span>
            </div>
            <!-- Uncomment and replace src with your profile image -->
            <!-- <img class="h-10 rounded-full cursor-pointer hover:scale-110 transition-transform duration-200 ease-out" src="./dist/images/profile.png" alt="Moi"> -->
        </div>
    </div>
</nav>

<div class="flex">
    <!-- Sidebar -->
    <div class="w-64 bg-custom-blue-sky-200 h-screen shadow-lg">
        <ul class="text-custom-blue-sky text-lg font-semibold p-6 space-y-10">
            <form method="post">
                <input type="hidden" name="layout" value="cargo">
                <li>
                    <button type="submit" class="flex items-center hover:text-red-300 w-full text-left">
                        <i class="fas fa-truck mr-2"></i>
                        <span>Cargaisons</span>
                    </button>
                </li>
            </form>
            <form method="post">
                <input type="hidden" name="layout" value="product">
                <li>
                    <button type="submit" class="flex items-center hover:text-red-300 w-full text-left">
                        <i class="fas fa-box mr-2"></i>
                        <span>Produits</span>
                    </button>
                </li>
            </form>
            <li>
                <a href="#" class="flex items-center hover:text-red-300">
                    <i class="fas fa-cog mr-2"></i>
                    <span>Paramètre</span>
                </a>
            </li>
            <li>
                <a href="#" class="flex items-center hover:text-red-300">
                    <i class="fas fa-user mr-2"></i>
                    <span>Utilisateur</span>
                </a>
            </li>
            <li>
                <a href="#" class="flex items-center hover:text-red-300">
                    <i class="fas fa-chart-line mr-2"></i>
                    <span>Dashboard</span>
                </a>
            </li>
        </ul>
    </div>

    <div class="flex-1 p-6">
        <!-- Main content -->
        <?php
        if (isset($_POST["layout"])) {
            switch ($_POST["layout"]) {
                case 'cargo':
                    include ('cargo.html.php');
                    break;
                case 'product':
                    include ('product.html.php');
                    break;
                default:
            }
        } else {
            include ('cargo.html.php');
        }
        ?>
    </div>
</div>

<!-- footer -->
<footer class="p-4 bg-custom-blue-sky flex justify-between items-center">
    <div class="w-full">
        <a class="flex items-center justify-center w-full text-custom-black-sky text-sm font-bold" href="#">
            <h2 class="flex items-center justify-center w-full text-custom-black-sky text-xl font-bold">Menadi Cargo</h2>
        </a>
    </div>
</footer>
</div>
</div>