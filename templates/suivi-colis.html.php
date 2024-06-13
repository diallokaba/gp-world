<nav class="bg-custom-blue-sky shadow-md">
    <div class="flex justify-between items-center">
        <div class="flex flex-row items-center ml-4">
            <a class="flex flex-row items-center cursor-pointer" href="#">
                <img class="h-20" src="./dist/images/gp-world.jpeg" alt="GP-WORLD LOGO">
                <span class="font-bold text-xl ml-2">GP-World</span>
            </a>
            
        </div>
        <div class="flex items-center mr-4">
            <!-- <button class="text-danger btn border-danger border-2 hover:bg-danger hover:text-white transition ease-out duration-700">
                Suivi colis
            </button> -->
            <form method="post">
                <input type="hidden" name="login" value="login-page">
                <button class="text-danger ml-2 btn border-danger border-2 hover:bg-danger hover:text-white transition ease-out duration-700">
                    Se connecter
                </button>
            </form>
        </div>
    </div>
</nav>


<div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Computer_generated_image_of_the_M%C3%A6rsk_Triple_E_Class_%28cropped%29.jpg/1200px-Computer_generated_image_of_the_M%C3%A6rsk_Triple_E_Class_%28cropped%29.jpg" alt="Slide 1">
      </div>
      <div class="swiper-slide">
        <img src="https://cdn.pixabay.com/photo/2017/08/07/11/23/container-2602812_1280.jpg" alt="Slide 2">
      </div>
      <div class="swiper-slide">
        <img src="https://cdn.pixabay.com/photo/2013/05/05/02/14/cargo-jet-108882_1280.jpg" alt="Slide 3">
      </div>
    </div>
    <!-- Add Pagination -->
    <div class="swiper-pagination"></div>
    <!-- Add Navigation -->
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
      
<div class="mt-10">
 <h2 class="text-center font-bold">Bienvenu(e) sur votre application GP-WORLD</h2>
 <div class="text-center mt-3">
    <form method="post" id="form-suivi-colis">
        <input style="width: 420px"  type="text" id="code" placeholder="Entrer le code de votre colis pour voir son état">
        <button type="submit" class="text-danger btn border-danger border-2 hover:bg-danger hover:text-white transition ease-out duration-700">
            Rechercher
        </button>
    </form>
    <div class="pl-2.5 text-red-600 mr-40 hidden" id="err-search-colis-date"><i class="fa-solid fa-triangle-exclamation"></i>&nbsp;Le champ de recherche est obligatoire</div>

 </div>
</div>


<div class="mt-3 flex justify-center" id="result">
    <!-- <div style="width: 30%" class="bg-white p-3 shadow-md shadow-blue-200">
        <div class="flex justify-between mb-3">
            <p>Produit</p>
            <strong>PR000001</strong>
        </div>
        <div class="flex justify-between items-center mb-3">
            <p>Etat</p> -->
            <!-- <p class="bg-gray-300 p-2 rounded-lg">En attente</p> -->
            <!-- <p class="bg-yellow-300 p-2 rounded-lg">Encours</p> -->
            <!-- <p class="bg-blue-300 p-2 rounded-lg">Arrivé</p> -->
            <!-- <p class="bg-green-300 p-2 rounded-lg">Récupérer</p> -->
            <!-- <p class="bg-danger text-white p-2 rounded-lg">Perdu</p> -->
            <!-- <p class="bg-gray-800 text-white p-2 rounded-lg">Archivé</p>
        </div>
        <div class="flex justify-between mb-3">
            <p>Type de produit</p>
            <p>Alimentaire</p>
        </div>
        <div class="flex justify-between">
            <p>Prix total</p>
            <strong>5141880</strong>
        </div>
    </div> -->
</div>

<script type="module" src="./dist/suivi-colis.js"></script>


