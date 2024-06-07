<div class="flex justify-between items-center">
    <h1 class="font-bold text-[#FCA5A5]">Liste des cargaisons</h1>
    <button type="button" onclick="my_modal_4.showModal()"
        class="text-white bg-[#FCA5A5] hover:bg-[#F87171] focus:ring-4 focus:ring-[#FCA5A5] font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-[#F87171] dark:hover:bg-[#F87171] focus:outline-none dark:focus:ring-[#F87171]"><i
            class="fa-solid fa-plus"></i>&nbsp;Ajouter cargaison</button>
</div>
<div class="shadow-sm border-b border-[#FCA5A5] mt-4"></div>

<div class="flex">
    <div class="flex gap-2 mt-6">
        <div class="relative">
            <input class="h-12 w-64 rounded-full outline-none pl-8 border border-[#FCA5A5]" type="text"
                id="cargo-code-search" placeholder="Rechercher par code">
            <div class="absolute top-3 left-3">
                <i class="fa-solid fa-magnifying-glass text-[#FCA5A5]"></i>
            </div>
        </div>
        <div class="relative">
            <input class="h-12 w-80 rounded-full outline-none pl-8 border border-[#FCA5A5]" type="text"
                id="departure-point-search" placeholder="Rechercher par lieu de départ">
            <div class="absolute top-3 left-3">
                <i class="fa-solid fa-magnifying-glass text-[#FCA5A5]"></i>
            </div>
        </div>
        <div class="relative">
            <input class="h-12 w-80 rounded-full outline-none pl-8 border border-[#FCA5A5]" type="text"
                id="arrival-point-search" placeholder="Rechercher par lieu de d'arrivée">
            <div class="absolute top-3 left-3">
                <i class="fa-solid fa-magnifying-glass text-[#FCA5A5]"></i>
            </div>
        </div>
    </div>
    <div class="mt-6">
        <select id="cargo-type-search"
            class="bg-[#FEE2E2] border border-[#FCA5A5] text-[#B91C1C] rounded-lg focus:ring-[#FCA5A5] block w-full py-3 pl-2 pr-11 ml-3 dark:bg-[#F87171] dark:border-[#F87171] dark:placeholder-[#FCA5A5] dark:text-white dark:focus:ring-[#FCA5A5]">
            <option selected disabled value="">Filter par cargaison</option>
            <option value="AIR">Aérienne</option>
            <option value="MARITIME">Maritime</option>
            <option value="ROAD">Routière</option>
        </select>
    </div>
    <div class="ml-10 mt-2">
        <label class="text-[#FCA5A5]">Date départ</label>
        <input type="date" class="border pl-2 py-1 px-5 rounded-xl mt-1 border-[#FCA5A5] outline-none"
            id="leaving-date-search">
    </div>
    <div class="mt-2">
        <label class="text-[#FCA5A5]">Date arrivée</label>
        <input type="date" class="border pl-2 py-1 px-5 rounded-xl mt-1 border-[#FCA5A5] outline-none"
            id="arrived-date-search">
    </div>
</div>

<div class="shadow-sm border-b border-[#FCA5A5] mt-4"></div>

<?php
$json_data = file_get_contents('cargaisons.json');
$cargos = json_decode($json_data, true);
?>

<div class="overflow-x-auto mt-5">
    <table class="table">
        <thead class="bg-[#FEE2E2] text-black">
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
                <th>Action</th>
            </tr>
        </thead>
        <tbody id="tbody-cargo">
            <?php foreach ($cargos['cargaisons'] as $c): ?>
                <?php
                foreach ($c as $key => $value) {
                    if ($value === "null") {
                        $c[$key] = null;
                    }
                }
                ?>
                <tr>
                    <td>
                        <div class="flex items-center gap-3">
                            <div class="avatar">
                                <div class="mask mask-squircle w-12 h-12">

                                </div>
                            </div>
                            <div>
                                <div class="font-bold"><?= $c['reference'] ?></div>
                                <div class="border-2 border-white text-xs opacity-50 badge badge-xs badge-error"></div>
                            </div>
                        </div>
                    </td>
                    <td><?= !is_null($c['maxWeight']) ? $c['maxWeight'] . ' (KG)' : $c['maxNbrProduct'] ?></td>
                    <td><?= $c['departurePoint'] ?></td>
                    <td><?= $c['arrivalPoint'] ?></td>
                    <td><?= $c['leavingDate'] ?></td>
                    <td><?= $c['arrivedDate'] ?></td>
                    <td><?= $c['distance'] . ' (KM)' ?></td>
                    <td><?= $c['type'] ?></td>
                    <td><?= $c['globalState'] ?></td>
                    <td><?= $c['progressionState'] ?></td>
                    <td><button type="button"
                            class="add-product-btn text-white bg-[#FCA5A5] hover:bg-[#F87171] px-3 py-1 rounded-lg"
                            data-id="<?= $c['id'] ?>">Ajouter cargaison</button>
                    </td>
                </tr>
            <?php endforeach ?>
        </tbody>
    </table>
    <div class="flex justify-end pr-4 mt-2">
        <button id="prev-page" class="bg-[#FCA5A5] text-white px-2 py-1 rounded" type="button">Précédent</button>
        <span id="page-info" class="mx-2 text-[#FCA5A5]"></span>
        <button id="next-page" class="bg-[#FCA5A5] text-white px-2 py-1 rounded" type="button">Suivant</button>
    </div>
</div>

<dialog id="my_modal_4" class="modal">
    <div class="modal-box w-11/12 max-w-5xl">
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 class="font-bold text-lg text-[#FCA5A5]">Nouvelle Cargaison</h3>

        <form action="addCargaison" id="add-cargo">
            <input type="hidden" name="globalState" value="OPEN">
            <input type="hidden" name="progressionState" value="PENDING">
            <input type="hidden" name="totalAmount" value="0">
            <label class="border border-[#FCA5A5] rounded-xl flex items-center p-2.5 mt-4">
                <span class="w-36">Type:</span>
                <select class="grow py-2 pl-1 outline-none rounded-lg" id="cargo-type" name="type">
                    <option value="0">Choisir un type de cargaison</option>
                    <option value="AIR">Aérienne</option>
                    <option value="MARITIME">Maritime</option>
                    <option value="ROAD">Routière</option>
                </select>
            </label>
            <div class="pl-2.5 text-[#F87171] hidden" id="err-cargo-type">error</div>
            <div class="flex justify-between">
                <div class="flex flex-col">
                    <label class="border border-[#FCA5A5] rounded-xl flex items-center p-2.5 mt-5">
                        <span class="">Date de départ:&nbsp;&nbsp;</span>
                        <input type="date" name="leavingDate" id="leavingDate"
                            class="w-80 outline-none border border-[#FCA5A5] rounded-lg py-1 pl-1">
                    </label>
                    <div class="pl-2.5 text-[#F87171] hidden" id="err-leaving-date">error</div>
                </div>
                <div class="flex flex-col">
                    <label class="border border-[#FCA5A5] rounded-xl flex items-center p-2.5 mt-5">
                        <span class="">Date d'arrivée:&nbsp;&nbsp;</span>
                        <input type="date" name="arrivedDate" id="arrivedDate"
                            class="w-80 outline-none border border-[#FCA5A5] rounded-lg py-1 pl-1">
                    </label>
                    <div class="pl-2.5 text-[#F87171] hidden" id="err-arrived-date">error</div>
                </div>
            </div>
            <label class="border border-[#FCA5A5] rounded-xl flex items-center p-2.5 mt-5">
                <span class="w-36">Lieu de départ:</span>
                <input type="text" class="grow outline-none py-2 pl-1 border border-[#FCA5A5] rounded-lg"
                    name="departurePoint" id="departurePoint" placeholder="Point de départ">
            </label>
            <div class="pl-2.5 text-[#F87171] hidden" id="err-departure-point">error</div>
            <label class="border border-[#FCA5A5] rounded-xl flex items-center p-2.5 mt-5">
                <span class="w-36">Lieu d'arrivée:</span>
                <input type="text" class="grow outline-none py-2 pl-1 border border-[#FCA5A5] rounded-lg"
                    name="arrivalPoint" id="arrivalPoint" placeholder="Point d'arrivée">
            </label>
            <div class="pl-2.5 text-[#F87171] hidden" id="err-arrival-point">error</div>
            <label class="border border-[#FCA5A5] rounded-xl flex items-center p-2.5 mt-5">
                <span class="w-36">Quantité:</span>
                <input type="text" class="grow outline-none py-2 pl-1 border border-[#FCA5A5] rounded-lg"
                    name="quantity" id="quantity" placeholder="Quantité">
            </label>
            <div class="pl-2.5 text-[#F87171] hidden" id="err-quantity">error</div>
            <label class="border border-[#FCA5A5] rounded-xl flex items-center p-2.5 mt-5">
                <span class="w-36">Référence:</span>
                <input type="text" class="grow outline-none py-2 pl-1 border border-[#FCA5A5] rounded-lg"
                    name="reference" id="reference" placeholder="Référence">
            </label>
            <div class="pl-2.5 text-[#F87171] hidden" id="err-reference">error</div>
            <label class="border border-[#FCA5A5] rounded-xl flex items-center p-2.5 mt-5">
                <span class="w-36">Max poids:</span>
                <input type="text" class="grow outline-none py-2 pl-1 border border-[#FCA5A5] rounded-lg"
                    name="maxWeight" id="maxWeight" placeholder="Max poids">
            </label>
            <div class="pl-2.5 text-[#F87171] hidden" id="err-max-weight">error</div>
            <label class="border border-[#FCA5A5] rounded-xl flex items-center p-2.5 mt-5">
                <span class="w-36">Max nombre produit:</span>
                <input type="text" class="grow outline-none py-2 pl-1 border border-[#FCA5A5] rounded-lg"
                    name="maxNbrProduct" id="maxNbrProduct" placeholder="Max nombre produit">
            </label>
            <div class="pl-2.5 text-[#F87171] hidden" id="err-max-nbr-product">error</div>
            <label class="border border-[#FCA5A5] rounded-xl flex items-center p-2.5 mt-5">
                <span class="w-36">Distance (KM):</span>
                <input type="text" class="grow outline-none py-2 pl-1 border border-[#FCA5A5] rounded-lg"
                    name="distance" id="distance" placeholder="Distance">
            </label>
            <div class="pl-2.5 text-[#F87171] hidden" id="err-distance">error</div>
            <button type="submit"
                class="mt-6 text-white bg-[#FCA5A5] hover:bg-[#F87171] focus:ring-4 focus:ring-[#FCA5A5] font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-[#F87171] dark:hover:bg-[#F87171] focus:outline-none dark:focus:ring-[#F87171]">Submit</button>
        </form>
    </div>
</dialog>


<!-- MODAL ADD PRODUCT -->
<dialog id="my_modal_5" class="modal">
    <div class="modal-box w-11/12 max-w-5xl">
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 product-close-top">✕</button>
        </form>
        <h3 class="font-bold text-lg">Ajout de produit à une Cargaison</h3>

        <form id="add-product" method="POST">
            <input type="hidden" name="action" value="addProduct">
            <input type="hidden" name="state" value="PENDING">
            <label class="border border-red-300 rounded-xl flex items-center p-2.5 mt-4">
                <span class="w-36">Type:</span>
                <!-- <input type="text" class="grow" placeholder="Email" /> -->
                <select class="grow py-2 pl-1 outline-none rounded-lg" id="product-type" name="type">
                    <option value="0">Choisir un type de produit</option>
                    <option value="CHIMICAL">Chimique</option>
                    <option value="MATERIAL">Matériel</option>
                    <option value="ALIMENTARY">Alimentaire</option>
                </select>
            </label>
            <div class="pl-2.5 text-red-600 hidden" id="err-cargo-type">error</div>
            <div id="chimical-toxicity"></div>
            <div id="product-weight"></div>
            <div id="material"></div>


            <fieldset class="border p-4 rounded mt-3">
                <legend>Infos de l'expéditeur</legend>
                <div class="relative">
                    <input class="h-12 w-[530px] rounded-full outline-none pl-8 border border-red-300" type="text"
                        id="search-sender" placeholder="Rechercher l'expédideur par son numéro de téléphone">
                    <div class="absolute top-3 left-3">
                        <i class="fa-solid fa-magnifying-glass text-red-400"></i>
                    </div>
                </div>
                <div id="sender-info" class="mt-2"></div>
            </fieldset>

            <fieldset class="border p-4 rounded mt-3">
                <legend>Infos du destinataire</legend>
                <div class="relative">
                    <input class="h-12 w-[530px] rounded-full outline-none pl-8 border border-red-300" type="text"
                        id="search-receiver" placeholder="Rechercher le destinataire par son numéro de téléphone">
                    <div class="absolute top-3 left-3">
                        <i class="fa-solid fa-magnifying-glass text-red-400"></i>
                    </div>
                </div>
                <div id="receiver-info"></div>
            </fieldset>

            <!-- <div class="flex gap-2 justify-between mt-4">
            <div class="flex flex-col">
                <label class="border border-red-300 rounded-xl flex items-center p-2.5 mt-4">
                    <span class="">Départ:&nbsp;</span>
                    <input type="texte" name="departurePoint" id="departurePoint" class="grow outline-none border border-red-300 rounded-lg py-1 pl-1 bg-red-200" readonly>
                </label>
                <div class="pl-2.5 text-red-600 hidden" id="err-departure-point">error</div>
            </div>
            <div class="flex flex-col">
                <label class="border border-red-300 rounded-xl flex items-center p-2.5 mt-4">
                    <span class="">Arrivée:&nbsp;</span>
                    <input type="text" name="arrivalPoint" id="arrivalPoint" class="grow border outline-none border-red-300 rounded-lg py-1 pl-1 bg-red-200" readonly>
                </label>
                <div class="pl-2.5 text-red-600 hidden" id="err-arrival-point">error</div>
            </div>
            <div class="flex flex-col">
                <label class="border border-red-300 rounded-xl flex items-center p-2.5 mt-4">
                    <span class="">Distance:&nbsp;</span>
                    <input type="text" name="distance" id="distance" class="grow border outline-none border-red-300 rounded-lg py-1 pl-1 bg-red-200" readonly>
                </label>
                <div class="pl-2.5 text-red-600 hidden" id="err-distance">error</div>
            </div>
          </div> -->
            <label class="border border-red-300 rounded-xl flex items-center p-2.5 mt-4">
                <span class="">Prix total:&nbsp;&nbsp;</span>
                <input type="text" name="distance" id="total-price-product"
                    class="grow border outline-none border-red-300 rounded-lg py-1 pl-2 bg-red-200" value="0" readonly>
            </label>
            <div class="pl-2.5 text-red-600 hidden" id="err-distance">error</div>

            <div class="flex justify-end gap-3 mt-4">
                <button type="button" class="btn btn-error text-white"
                    onclick="document.getElementById('my_modal_5').close()">Annuler</button>
                <button class="btn btn-primary text-white">Ajouter</button>
            </div>
        </form>

    </div>
</dialog>



<script type="module" src="./dist/cargo-impl.js"></script>
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
<script type="module" src="./dist/map.js"></script>