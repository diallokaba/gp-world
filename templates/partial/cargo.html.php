<div class="flex justify-between items-center">
    <h1 class="font-bold">Liste des cargaisons</h1>
    <button type="button" onclick="my_modal_4.showModal()" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><i class="fa-solid fa-plus"></i>&nbsp;Ajouter cargaison</button>
</div>
<div class="shadow-sm border-b mt-4"></div>

<div class="flex mt-5">
    <a class="flex flex-col items-center mr-5" href="#">
        <img class="h-14 w-14 rounded-full p-[1.5px] border-2 border-red-500 flex justify-center items-center hover:cursor-pointer hover:scale-110 transition-transform duration-200 ease-out" src="https://www.inc-conso.fr/sites/default/files/avion-800_1.png" alt="Cargaison Maritime">
        <p class="text-xs w-14 text-center">Aérienne</p>
    </a>
    <a class="flex flex-col items-center mr-5" href="#">
        <img class="h-14 w-14 rounded-full p-[1.5px] border-2 border-red-500 flex justify-center items-center hover:cursor-pointer hover:scale-110 transition-transform duration-200 ease-out" src="https://www.actu-environnement.com/images/illustrations/news/36586_large.jpg" alt="Cargaison Maritime">
        <p class="text-xs w-14 text-center">Maritime</p>
    </a>
    <a class="flex flex-col items-center mr-5" href="#">
        <img class="h-14 w-14 rounded-full p-[1.5px] border-2 border-red-500 flex justify-center items-center hover:cursor-pointer hover:scale-110 transition-transform duration-200 ease-out" src="https://img.freepik.com/vecteurs-libre/camion-transport-dessine-main_23-2149161394.jpg" alt="Cargaison Maritime">
        <p class="text-xs w-14 text-center">Routière</p>
    </a>
    <div class="relative ml-40 mt-[8px]">
        <input class="h-12 w-[600px] rounded-full outline-none pl-10 border border-gray-300" type="text" placeholder="Rechercher">
        <div class="absolute top-3 left-3">
            <i class="fa-solid fa-magnifying-glass text-gray-400"></i>
        </div>
    </div>
    <div class="mt-3 ml-14">
        <label for="">Date départ</label>
        <input type="date" class="border py-1 px-2 rounded-xl border-gray-300">
    </div>
    <div class="mt-3 ml-10">
        <label for="">Date arrivée</label>
        <input type="date" class="border py-1 px-2 rounded-xl border-gray-300">
    </div>
</div>

<div class="shadow-sm border-b mt-4"></div>

<!-- TABLEAU -->
<div class="overflow-x-auto mt-5">
    <table class="table">
        <thead class="bg-custom-blue-sky text-black">
        <tr>
            <th></th>
            <th>Poids / Nbr Colis</th>
            <th>Lieu de départ</th>
            <th>Lieu d'arrivée</th>
            <th>Date de départ</th>
            <th>Date d'arrivée</th>
            <th>Distance</th>
            <th>Type</th>
            <th>Etat Global</th>
            <th>Etat Avancement</th>
        </tr>
        </thead>
        <tbody id="tbody-cargo">
            <!-- <tr class="tr-hoverable">
            <td>
                <div class="flex items-center gap-3">
                <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                    <img
                        src="https://www.inc-conso.fr/sites/default/files/avion-800_1.png"
                        alt="Avatar Tailwind CSS Component"
                    />
                    </div>
                </div>
                <div>
                    <div class="font-bold">101</div>
                    <div class="border-2 border-white text-xs opacity-50 badge badge-xs badge-error"></div>
                </div>
                </div>
            </td>
            <td>
                Aly TAll
                <br />
                <span class="text-xs opacity-50">
                inscrit le : 10/10/2004
                </span>
            </td>
            <td>NIANG</td>
            <td>
                70.000
            </td>
            
            </tr>
            <tr class="tr-hoverable">
            <td>
                <div class="flex items-center gap-3">
                <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                    <img
                        src="https://www.inc-conso.fr/sites/default/files/avion-800_1.png"
                        alt="Avatar Tailwind CSS Component"
                    />
                    </div>
                </div>
                <div>
                    <div class="font-bold">101</div>
                    <div class="border-2 border-white text-xs opacity-50 badge badge-xs badge-error"></div>
                </div>
                </div>
            </td>
            <td>
                Aly TAll
                <br />
                <span class="text-xs opacity-50">
                inscrit le : 10/10/2004
                </span>
            </td>
            <td>NIANG</td>
            <td>
                70.000
            </td>
            
            </tr>
            <tr class="tr-hoverable">
            <td>
                <div class="flex items-center gap-3">
                <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                    <img
                        src="https://www.inc-conso.fr/sites/default/files/avion-800_1.png"
                        alt="Avatar Tailwind CSS Component"
                    />
                    </div>
                </div>
                <div>
                    <div class="font-bold">101</div>
                    <div class="border-2 border-white text-xs opacity-50 badge badge-xs badge-error"></div>
                </div>
                </div>
            </td>
            <td>
                Aly TAll
                <br />
                <span class="text-xs opacity-50">
                inscrit le : 10/10/2004
                </span>
            </td>
            <td>NIANG</td>
            <td>
                70.000
            </td>
            </tr>
            <tr class="tr-hoverable">
            <td>
                <div class="flex items-center gap-3">
                <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                    <img
                        src="https://www.inc-conso.fr/sites/default/files/avion-800_1.png"
                        alt="Avatar Tailwind CSS Component"
                    />
                    </div>
                </div>
                <div>
                    <div class="font-bold">101</div>
                    <div class="border-2 border-white text-xs opacity-50 badge badge-xs badge-error"></div>
                </div>
                </div>
            </td>
            <td>
                Aly TAll
                <br />
                <span class="text-xs opacity-50">
                inscrit le : 10/10/2004
                </span>
            </td>
            <td>NIANG</td>
            <td>
                70.000
            </td>
            </tr>
            <tr class="tr-hoverable">
            <td>
                <div class="flex items-center gap-3">
                <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                    <img
                        src="https://www.inc-conso.fr/sites/default/files/avion-800_1.png"
                        alt="Avatar Tailwind CSS Component"
                    />
                    </div>
                </div>
                <div>
                    <div class="font-bold">101</div>
                    <div class="border-2 border-white text-xs opacity-50 badge badge-xs badge-error"></div>
                </div>
                </div>
            </td>
            <td>
                Aly TAll
                <br />
                <span class="text-xs opacity-50">
                inscrit le : 10/10/2004
                </span>
            </td>
            <td>NIANG</td>
            <td>
                70.000
            </td>
            </tr>
            <tr class="tr-hoverable">
            <td>
                <div class="flex items-center gap-3">
                <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                    <img
                        src="https://www.inc-conso.fr/sites/default/files/avion-800_1.png"
                        alt="Avatar Tailwind CSS Component"
                    />
                    </div>
                </div>
                <div>
                    <div class="font-bold">101</div>
                    <div class="border-2 border-white text-xs opacity-50 badge badge-xs badge-error"></div>
                </div>
                </div>
            </td>
            <td>
                Aly TAll
                <br />
                <span class="text-xs opacity-50">
                inscrit le : 10/10/2004
                </span>
            </td>
            <td>NIANG</td>
            <td>
                70.000
            </td>
            </tr> -->
            
        </tbody>
    </table>
</div>

    <!-- MODAL -->
<dialog id="my_modal_4" class="modal">
  <div class="modal-box w-11/12 max-w-5xl">
    <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
    <h3 class="font-bold text-lg">Nouvelle Cargaison</h3>

    <form id="add-cargo">
          <label class="border border-gray-300 rounded-xl flex items-center p-2.5 mt-5">
            <span class="w-36">Type:</span>
            <!-- <input type="text" class="grow" placeholder="Email" /> -->
            <select class="grow py-2 pl-1 outline-none rounded-lg" id="cargo-type" name="cargo">
                <option value="0">Choisir un type de cargaison</option>
                <option value="AIR">Aérienne</option>
                <option value="MARITIME">Maritime</option>
                <option value="ROAD">Routière</option>
            </select>
          </label>
          <div class="pl-2.5 text-red-600 hidden" id="err-cargo-type">error</div>
          <div class="flex justify-between">
            <div class="flex flex-col">
                <label class="border border-gray-300 rounded-xl flex items-center p-2.5 mt-5">
                    <span class="">Date de départ:&nbsp;&nbsp;</span>
                    <input type="date" name="leavingDate" id="leavingDate" class="w-80 outline-none border border-gray-300 rounded-lg py-1 pl-1">
                </label>
                <div class="pl-2.5 text-red-600 hidden" id="err-leaving-date">error</div>
            </div>
            <div class="flex flex-col">
                <label class="border border-gray-300 rounded-xl flex items-center p-2.5 mt-5">
                    <span>Date d'arrivée:&nbsp;&nbsp;</span>
                    <input type="date" name="arrivedDate" id="arrivedDate" class="w-80 border outline-none border-gray-300 rounded-lg py-1 pl-1">
                </label>
                <div class="pl-2.5 text-red-600 hidden" id="err-arrived-date">error</div>
            </div>
          </div>
          <!-- <label class="border border-gray-300 rounded-xl flex items-center p-2.5 mt-5">
            <span class="w-36">Distance:</span>
            <input id="distance" name="distance" type="number" class="grow border border-gray-300 rounded-lg py-1 px-2 outline-none" placeholder="Entrer la distance en KM" />
          </label> -->
          <div class="mt-5 flex flex-row gap-2">
            <div class="flex items-center gap-2">
                <input type="radio" name="radio-2" id="byWeight" class="radio radio-primary" /><label for="">Remplissage par poids</label>
            </div>
            <div class="flex items-center gap-2">
                <input type="radio" name="radio-2" id="byProduct" class="radio radio-primary"/>Remplissage par nombre de produit/colis
            </div>
          </div>
          <div class="pl-2.5 text-red-600 hidden mt-2" id="radio-choice">error</div>
          <div id="quantity">
          </div>
          <div class="mt-5">
            <div id="map" style="width: 100%; height: 300px;"></div>
          </div>
          <div class="flex gap-2 justify-between mt-5">
            <div class="flex flex-col">
                <label class="border border-gray-300 rounded-xl flex items-center p-2.5 mt-5">
                    <span class="">Départ:&nbsp;</span>
                    <input type="texte" name="departurePoint" id="departurePoint" class="grow outline-none border border-gray-300 rounded-lg py-1 pl-1 bg-gray-200" readonly>
                </label>
                <div class="pl-2.5 text-red-600 hidden" id="err-departure-point">error</div>
            </div>
            <div class="flex flex-col">
                <label class="border border-gray-300 rounded-xl flex items-center p-2.5 mt-5">
                    <span class="">Arrivée:&nbsp;</span>
                    <input type="text" name="arrivalPoint" id="arrivalPoint" class="grow border outline-none border-gray-300 rounded-lg py-1 pl-1 bg-gray-200" readonly>
                </label>
                <div class="pl-2.5 text-red-600 hidden" id="err-arrival-point">error</div>
            </div>
            <div class="flex flex-col">
                <label class="border border-gray-300 rounded-xl flex items-center p-2.5 mt-5">
                    <span class="">Distance:&nbsp;</span>
                    <input type="text" name="distance" id="distance" class="grow border outline-none border-gray-300 rounded-lg py-1 pl-1 bg-gray-200" readonly>
                </label>
                <div class="pl-2.5 text-red-600 hidden" id="err-distance">error</div>
            </div>
          </div>
          <div class="flex justify-end gap-3 mt-5">
            <button type="button" class="btn btn-error text-white" onclick="document.getElementById('my_modal_4').close()">Annuler</button>
            <button class="btn btn-primary text-white">Ajouter</button>
          </div>
    </form>

  </div>
</dialog>



<script type="module" src="./dist/cargo-impl.js"></script>
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
<script type="module" src="./dist/map.js"></script>