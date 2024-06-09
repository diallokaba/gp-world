var _a, _b;
import { Air, Maritime, Road } from "./model/cargo.js";
import { Receiver, Sender } from "./model/user.js";
const byWeight = document.querySelector("#byWeight");
const byProduct = document.querySelector("#byProduct");
const quantity = document.querySelector("#quantity");
const cargoType = document.querySelector("#cargo-type");
const leavingDate = document.querySelector("#leavingDate");
const arrivedDate = document.querySelector("#arrivedDate");
const departurePoint = document.querySelector("#departurePoint");
const arrivalPoint = document.querySelector("#arrivalPoint");
const distance = document.querySelector("#distance");
const form = document.querySelector("#add-cargo");
const radioChoice = document.getElementById("radio-choice");
const tbodyCargo = document.getElementById('tbody-cargo');
const btnCloseProduct = document.querySelector('.btn-close-product');
const btnCancelProduct = document.getElementById('btn-cancel-product');
const formProduct = document.getElementById("add-product");
const materialElement = document.querySelector("#material");
const toxicity = document.querySelector("#chimical-toxicity");
const errMsgProductType = document.querySelector("#err-product-type");
const divProductWeight = document.getElementById('product-weight');
const errEmptyNumber = document.getElementById('err-empty-number');
let productWeightInputField;
const productType = document.getElementById('product-type');
const newProductType = productType.cloneNode(true);
let productMaterialType;
byWeight === null || byWeight === void 0 ? void 0 : byWeight.addEventListener('click', () => {
    if (byWeight.checked === true) {
        radioChoice.classList.add('hidden');
        quantity.innerHTML = '';
        quantity.innerHTML =
            `<label class="border border-gray-300 rounded-xl flex items-center p-2.5 mt-5">
            <span class="w-36">Poids Max:</span>
            <input id="weightMax" name="maxWeight" type="number" class="grow border border-gray-300 rounded-lg py-1 px-2 outline-none" placeholder="Entrer le poids maximum en KG que peut contenir cette cargaison" />
        </label>
        <div class="pl-2.5 text-red-600 hidden" id="weight-max-err">error</div>
        `;
    }
});
byProduct === null || byProduct === void 0 ? void 0 : byProduct.addEventListener('click', () => {
    if (byProduct.checked === true) {
        radioChoice.classList.add('hidden');
        quantity.innerHTML = '';
        quantity.innerHTML =
            `<label class="border border-gray-300 rounded-xl flex items-center p-2.5 mt-5">
            <span class="w-36">Produit Max:</span>
            <input id="productMax" name="maxNbrProduct" type="number" class="grow border border-gray-300 rounded-lg py-1 px-2 outline-none" placeholder="Entrer le nombre de produit maximum que pourra contenir cette cargaison" />
        </label>
        <div class="pl-2.5 text-red-600 hidden" id="nbr-product-err">error</div>
        `;
    }
});
// Function to initialize the default field
function initializeDefaultField() {
    quantity.innerHTML = '';
    quantity.innerHTML =
        `<label class="border border-gray-300 rounded-xl flex items-center p-2.5 mt-5">
        <span class="w-36">Poids Max:</span>
        <input id="weightMax" name="maxWeight" type="number" class="grow border border-gray-300 rounded-lg py-1 px-2 outline-none" placeholder="Entrer le poids maximum en KG que peut contenir cette cargaison" />
    </label>
    <div class="pl-2.5 text-red-600 hidden" id="weight-max-err">error</div>`;
}
// Initialize the default field on page load
initializeDefaultField();
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const weightMax = document.querySelector("#weightMax");
    const productMax = document.querySelector("#productMax");
    let isValid = dataIsValid(weightMax, productMax);
    if (isValid) {
        const formData = new FormData(form);
        formData.append('action', 'addCargaison');
        let newId = 1;
        if (cargaisons.length > 0) {
            const lastCargo = cargaisons[cargaisons.length - 1];
            newId = Number(lastCargo.id) + 1;
        }
        formData.append("id", newId.toString());
        let reference = '';
        if (newId < 10) {
            reference = 'CR' + padStart(newId.toString(), 5, '0');
        }
        else if (newId > 9 && newId < 100) {
            reference = 'CR' + padStart(newId.toString(), 4, '0');
        }
        else if (newId > 99 && newId < 1000) {
            reference = 'CR' + padStart(newId.toString(), 3, '0');
        }
        formData.append("reference", reference);
        if (byWeight.checked) {
            console.log(weightMax.value.toString());
            formData.append('maxWeight', weightMax.value.toString());
        }
        else {
            formData.append('maxWeight', 'null');
        }
        if (byProduct.checked) {
            formData.append('maxNbrProduct', productMax.value.toString());
        }
        else {
            formData.append('maxNbrProduct', 'null');
        }
        const type = cargoType.value.trim();
        let imageUrl = '';
        if (type === "AIR") {
            imageUrl = 'https://www.inc-conso.fr/sites/default/files/avion-800_1.png';
        }
        else if (type === "MARITIME") {
            imageUrl = 'https://www.trade-easy.fr/wp-content/uploads/2022/06/Cout-fret-maritime-TRADE.EASY_.png';
        }
        else {
            imageUrl = 'https://miro.medium.com/v2/resize:fit:772/1*73RG4jdNMfewnPLP73KVPw.png';
        }
        formData.append('image', imageUrl);
        //console.log(formData.entries);
        fetch('api.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.text())
            .then(data => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            //console.log(data);
            const jsonData = JSON.parse(data);
            if (jsonData.status === "success") {
                let cargo;
                if (type === "Air") {
                    cargo = new Air(newId, reference, parseFloat(((_a = formData.get("maxWeight")) === null || _a === void 0 ? void 0 : _a.toString()) || "null"), parseFloat(((_b = formData.get("maxNbrProduct")) === null || _b === void 0 ? void 0 : _b.toString()) || "null"), 0, type, String(formData.get('leavingDate')), String(formData.get('arrivedDate')), parseFloat(((_c = formData.get('distance')) === null || _c === void 0 ? void 0 : _c.toString()) || "0"), String(formData.get('departurePoint')), String(formData.get('arrivalPoint')), String(formData.get('globalState')), String(formData.get('progressionState')), imageUrl);
                }
                else if (type === "MARITIME") {
                    cargo = new Maritime(newId, reference, parseFloat(((_d = formData.get("maxWeight")) === null || _d === void 0 ? void 0 : _d.toString()) || "null"), parseInt(((_e = formData.get("maxNbrProduct")) === null || _e === void 0 ? void 0 : _e.toString()) || "null"), 0, type, String(formData.get('leavingDate')), String(formData.get('arrivedDate')), parseFloat(((_f = formData.get('distance')) === null || _f === void 0 ? void 0 : _f.toString()) || "0"), String(formData.get('departurePoint')), String(formData.get('arrivalPoint')), String(formData.get('globalState')), String(formData.get('progressionState')), imageUrl);
                }
                else {
                    cargo = new Road(newId, reference, parseFloat(((_g = formData.get("maxWeight")) === null || _g === void 0 ? void 0 : _g.toString()) || "null"), parseInt(((_h = formData.get("maxNbrProduct")) === null || _h === void 0 ? void 0 : _h.toString()) || "null"), 0, type, String(formData.get('leavingDate')), String(formData.get('arrivedDate')), parseFloat(((_j = formData.get('distance')) === null || _j === void 0 ? void 0 : _j.toString()) || "0"), String(formData.get('departurePoint')), String(formData.get('arrivalPoint')), String(formData.get('globalState')), String(formData.get('progressionState')), imageUrl);
                }
                cargaisons.push(cargo);
                displayThisCagoOnTheTable(cargo);
                alert(jsonData.message);
                //const cargo: Cargo = Object.assign(Cargo, formData.entries);
            }
            else {
                alert('Erreur lors de l\'ajout de la cargaison');
            }
        })
            .catch(error => console.error('Erreur:', error));
    }
});
function dataIsValid(weightMax, productMax) {
    let isValid = true;
    if (!byWeight.checked && !byProduct.checked) {
        radioChoice.classList.remove('hidden');
        radioChoice.classList.add('visible');
        radioChoice.innerText = 'Veuillez choisir le mode de remplissage de cette cargaison';
        isValid = false;
    }
    if (byWeight.checked) {
        const errWeight = document.getElementById('weight-max-err');
        if (weightMax.value.trim() === '') {
            errWeight === null || errWeight === void 0 ? void 0 : errWeight.classList.remove('hidden');
            errWeight === null || errWeight === void 0 ? void 0 : errWeight.classList.add('visible');
            errWeight.innerText = 'Le poids maximum est obligatoire';
            isValid = false;
        }
        else {
            if (weightMax.value <= 0) {
                errWeight === null || errWeight === void 0 ? void 0 : errWeight.classList.remove('hidden');
                errWeight === null || errWeight === void 0 ? void 0 : errWeight.classList.add('visible');
                errWeight.innerText = 'Le poids maximum doit être un nombre supérieur à 0';
                isValid = false;
            }
            else {
                errWeight === null || errWeight === void 0 ? void 0 : errWeight.classList.add('hidden');
            }
        }
    }
    if (byProduct.checked) {
        const errNbrProduct = document.getElementById('nbr-product-err');
        if (productMax.value.trim() === '') {
            errNbrProduct === null || errNbrProduct === void 0 ? void 0 : errNbrProduct.classList.remove('hidden');
            errNbrProduct === null || errNbrProduct === void 0 ? void 0 : errNbrProduct.classList.add('visible');
            errNbrProduct.innerText = 'Le nombre de produit maximum est obligatoire';
            isValid = false;
        }
        else {
            if (productMax.value <= 0) {
                errNbrProduct === null || errNbrProduct === void 0 ? void 0 : errNbrProduct.classList.remove('hidden');
                errNbrProduct === null || errNbrProduct === void 0 ? void 0 : errNbrProduct.classList.add('visible');
                errNbrProduct.innerText = 'Le nombre de produit maximum doit être un nombre supérieur à 0';
                isValid = false;
            }
            else {
                errNbrProduct === null || errNbrProduct === void 0 ? void 0 : errNbrProduct.classList.add('hidden');
            }
        }
    }
    const errLeavingDate = document.getElementById('err-leaving-date');
    let leavingDateLessThanTodayDate = false;
    if (leavingDate.value.trim() === '') {
        errLeavingDate === null || errLeavingDate === void 0 ? void 0 : errLeavingDate.classList.remove('hidden');
        errLeavingDate === null || errLeavingDate === void 0 ? void 0 : errLeavingDate.classList.add('visible');
        errLeavingDate.innerText = 'La date de départ est obligatoire';
        isValid = false;
    }
    else {
        let todayDate = new Date();
        let formatLeavingDate = new Date(leavingDate.value.trim());
        todayDate.setHours(0, 0, 0, 0);
        formatLeavingDate.setHours(0, 0, 0, 0);
        if (formatLeavingDate < todayDate) {
            errLeavingDate === null || errLeavingDate === void 0 ? void 0 : errLeavingDate.classList.remove('hidden');
            errLeavingDate === null || errLeavingDate === void 0 ? void 0 : errLeavingDate.classList.add('visible');
            errLeavingDate.innerText = 'La date de départ ne doit pas être inférieur à la date jour';
            leavingDateLessThanTodayDate = true;
            isValid = false;
        }
        else {
            errLeavingDate === null || errLeavingDate === void 0 ? void 0 : errLeavingDate.classList.add('hidden');
        }
    }
    const errArrivedDate = document.getElementById('err-arrived-date');
    if (arrivedDate.value.trim() === '') {
        errArrivedDate === null || errArrivedDate === void 0 ? void 0 : errArrivedDate.classList.remove('hidden');
        errArrivedDate === null || errArrivedDate === void 0 ? void 0 : errArrivedDate.classList.add('visible');
        errArrivedDate.innerText = 'La date d\'arrivée est obligatoire';
        isValid = false;
    }
    else {
        errArrivedDate === null || errArrivedDate === void 0 ? void 0 : errArrivedDate.classList.add('hidden');
    }
    const errDeparturePoint = document.getElementById('err-departure-point');
    if (departurePoint.value.trim() === '') {
        errDeparturePoint === null || errDeparturePoint === void 0 ? void 0 : errDeparturePoint.classList.remove('hidden');
        errDeparturePoint === null || errDeparturePoint === void 0 ? void 0 : errDeparturePoint.classList.add('visible');
        errDeparturePoint.innerText = 'Le lieu de départ est obligatoire';
        isValid = false;
    }
    else {
        errDeparturePoint === null || errDeparturePoint === void 0 ? void 0 : errDeparturePoint.classList.add('hidden');
    }
    const errArrivalPoint = document.getElementById('err-arrival-point');
    if (arrivalPoint.value.trim() === '') {
        errArrivalPoint === null || errArrivalPoint === void 0 ? void 0 : errArrivalPoint.classList.remove('hidden');
        errArrivalPoint === null || errArrivalPoint === void 0 ? void 0 : errArrivalPoint.classList.add('visible');
        errArrivalPoint.innerText = 'La lieu d\'arrivée est obligatoire';
        isValid = false;
    }
    else {
        errArrivalPoint === null || errArrivalPoint === void 0 ? void 0 : errArrivalPoint.classList.add('hidden');
    }
    const errDistance = document.getElementById('err-distance');
    if (distance.value.trim() === '') {
        errDistance === null || errDistance === void 0 ? void 0 : errDistance.classList.remove('hidden');
        errDistance === null || errDistance === void 0 ? void 0 : errDistance.classList.add('visible');
        errDistance.innerText = 'La distance est obligatoire';
        isValid = false;
    }
    else {
        errDistance === null || errDistance === void 0 ? void 0 : errDistance.classList.add('hidden');
    }
    if (arrivedDate.value.trim() != '' && leavingDate.value.trim() != '' && !leavingDateLessThanTodayDate) {
        let lDate = new Date(leavingDate.value.trim());
        let aDate = new Date(arrivedDate.value.trim());
        lDate.setHours(0, 0, 0, 0);
        aDate.setHours(0, 0, 0, 0);
        if (aDate < lDate) {
            errArrivedDate === null || errArrivedDate === void 0 ? void 0 : errArrivedDate.classList.remove('hidden');
            errArrivedDate === null || errArrivedDate === void 0 ? void 0 : errArrivedDate.classList.add('visible');
            errArrivedDate.innerText = 'La date d\'arrivée doit être supérieur à la date de départ';
            isValid = false;
        }
        else {
            errArrivedDate === null || errArrivedDate === void 0 ? void 0 : errArrivedDate.classList.add('hidden');
        }
    }
    const errCargoType = document.getElementById('err-cargo-type');
    if (cargoType.value == 0) {
        errCargoType === null || errCargoType === void 0 ? void 0 : errCargoType.classList.remove('hidden');
        errCargoType === null || errCargoType === void 0 ? void 0 : errCargoType.classList.add('visible');
        errCargoType.innerText = 'Veuillez sélectionner le type de cargaison';
        isValid = false;
    }
    else {
        errCargoType === null || errCargoType === void 0 ? void 0 : errCargoType.classList.add('hidden');
    }
    return isValid;
}
function displayThisCagoOnTheTable(cargaison) {
    const row = document.createElement('tr');
    row.innerHTML = `
            <td>
                <div class="flex items-center gap-3">
                    <div class="avatar">
                        <div class="mask mask-squircle w-12 h-12">
                            <img
                                src="${cargaison.image}"
                                alt="Avatar Tailwind CSS Component"
                            />
                        </div>
                    </div>
                    <div>
                    <div class="font-bold">${cargaison.reference}</div>
                    <div class="border-2 border-white text-xs opacity-50 badge badge-xs badge-error"></div>
                </div>
             </div>
            </td>
            <td>${String(cargaison.maxWeight) != 'null' || !Number.isNaN(cargaison.maxWeight) ? cargaison.maxWeight + ' (KG)' : Number(cargaison.maxNbrProduct)}</td>
            <td>${cargaison.departurePoint}</td>
            <td>${cargaison.arrivalPoint}</td>
            <td>${cargaison.leavingDate}</td>
            <td>${cargaison.arrivedDate}</td>
            <td>${cargaison.distance + ' (KM)'}</td>
            <td>${cargaison.type}</td>
            <td>${cargaison.globalState}</td>
            <td>${cargaison.progressionState}</td>
          `;
    tbodyCargo.appendChild(row);
}
let cargaisons = [];
/*function getAllCargos(){
    fetch('api.php?action=getCargaison', {
        method: 'GET'
      })
        .then(response => response.text())
        .then(data => {
            const jsonData = JSON.parse(data);
            cargaisons = jsonData.data.cargaisons;
        })
        .catch(error => console.error('Erreur:', error));
}*/
//getAllCargos();
function padStart(str, targetLength, padString) {
    str = str.toString();
    padString = padString || ' ';
    if (str.length >= targetLength) {
        return str;
    }
    targetLength = targetLength - str.length;
    while (padString.length < targetLength) {
        padString += padString;
    }
    return padString.slice(0, targetLength) + str;
}
let currentPage = 1;
const itemsPerPage = 7;
let totalPages = 1;
function pagination(page = currentPage) {
    fetch('api.php?action=getCargaison', {
        method: 'GET'
    }).then(r => r.text()).then(data => {
        const jsonData = JSON.parse(data);
        cargaisons = jsonData.data.cargaisons;
        const cargoCodeSearch = document.getElementById("cargo-code-search").value.trim().toLocaleLowerCase();
        const departurePointSearch = document.getElementById("departure-point-search").value.trim().toLocaleLowerCase();
        const arrivalPointSearch = document.getElementById("arrival-point-search").value.trim().toLocaleLowerCase();
        const leavingDateSearch = document.getElementById("leaving-date-search").value;
        const arrivedDateSearch = document.getElementById("arrived-date-search").value;
        const cargoTypeSearch = document.getElementById("cargo-type-search").value;
        const filteredCargos = cargaisons.filter(c => (cargoCodeSearch === "" || c.reference.toLowerCase().includes(cargoCodeSearch)) &&
            (leavingDateSearch === "" || c.leavingDate.includes(leavingDateSearch)) &&
            (arrivedDateSearch === "" || c.arrivedDate.includes(arrivedDateSearch)) &&
            (departurePointSearch === "" || c.departurePoint.toLowerCase().includes(departurePointSearch)) &&
            (arrivalPointSearch === "" || c.arrivalPoint.toLowerCase().includes(arrivalPointSearch)) &&
            (cargoTypeSearch === "" || c.type.includes(cargoTypeSearch)));
        totalPages = Math.ceil(filteredCargos.length / itemsPerPage);
        currentPage = page;
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedCargaisons = filteredCargos.slice(start, end);
        tbodyCargo.innerHTML = '';
        paginatedCargaisons.forEach(cargaison => {
            if (cargaison) {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>
                    <div class="flex items-center gap-3">
                        <div class="avatar">
                            <div class="mask mask-squircle w-12 h-12">
                                <img
                                    src="${cargaison.image}"
                                    alt="Avatar Tailwind CSS Component"
                                />
                            </div>
                        </div>
                        <div>
                        <div class="font-bold">${cargaison.reference}</div>
                        <div class="border-2 border-white text-xs opacity-50 badge badge-xs badge-error"></div>
                    </div>
                </div>
                </td>
                <td>${String(cargaison.maxWeight) != 'null' ? cargaison.maxWeight + ' (KG)' : cargaison.maxNbrProduct}</td>
                <td>${cargaison.departurePoint}</td>
                <td>${cargaison.arrivalPoint}</td>
                <td>${cargaison.leavingDate}</td>
                <td>${cargaison.arrivedDate}</td>
                <td>${cargaison.distance + ' (KM)'}</td>
                <td>${cargaison.type}</td>
                <td>${cargaison.globalState}</td>
                <td>${cargaison.progressionState}</td>
                <td><button type="button" class="add-product-btn" data-id="${cargaison.id}">Ajouter produit</button></td>
                `;
                tbodyCargo.appendChild(row);
            }
        });
        // Mise à jour des événements des boutons "voir"
        /*document.querySelectorAll(".btn-view").forEach((button) => {
         button.addEventListener("click", (event) => {
           const target = event.target as HTMLElement;
           const cargaisonId = target.getAttribute("data-id");
           afficherDetailsCargaison(cargaisonId);
         });
       });*/
        // Ajoutez des écouteurs d'événements aux boutons
        document.querySelectorAll('.add-product-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const cargoId = event.target.getAttribute('data-id');
                const cargaison = cargaisons.find(c => Number(c.id) === Number(cargoId));
                let weight = String(cargaison === null || cargaison === void 0 ? void 0 : cargaison.maxWeight) != 'null' ? cargaison === null || cargaison === void 0 ? void 0 : cargaison.maxWeight : cargaison === null || cargaison === void 0 ? void 0 : cargaison.maxNbrProduct;
                if ((cargaison === null || cargaison === void 0 ? void 0 : cargaison.globalState) !== 'OPEN' || (cargaison === null || cargaison === void 0 ? void 0 : cargaison.progressionState) !== 'PENDING') {
                    showAlertErrorMessage('Impossible d\'ajouter un produit à cette cargaison', 'Pour ajouter un produit, la cargaison doit être en état "Ouvert" et "En attente"');
                }
                else if (Number(weight) === 0) {
                    showAlertErrorMessage('Impossible d\'ajouter un produit à cette cargaison', 'Le poids maximum de la cargaison ou le nombre de colis maximum de la cargaison est de 0');
                }
                else {
                    if (cargaison) {
                        document.getElementById('my_modal_5').showModal();
                        const cargoName = document.getElementById('cargo-name');
                        cargoName.innerText = '';
                        if (cargaison.type === 'ROAD') {
                            cargoName.innerText = 'Routière';
                        }
                        else if (cargaison.type === 'MARITIME') {
                            cargoName.innerText = 'Maritime';
                        }
                        else {
                            cargoName.innerText = 'Aérienne';
                        }
                        addProductToCargo(cargaison);
                    }
                }
            });
        });
        // Mise à jour des informations de pagination
        const pageInfo = document.getElementById("page-info");
        if (pageInfo) {
            pageInfo.textContent = `Page ${currentPage} Sur ${totalPages}`;
        }
        // Activer/désactiver les boutons de pagination
        const prevButton = document.getElementById("prev-page");
        const nextButton = document.getElementById("next-page");
        if (prevButton) {
            prevButton.disabled = currentPage === 1;
        }
        if (nextButton) {
            nextButton.disabled = currentPage === totalPages;
        }
    });
}
(_a = document.getElementById("prev-page")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    if (currentPage > 1) {
        pagination(currentPage - 1);
    }
});
(_b = document.getElementById("next-page")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    if (currentPage < totalPages) {
        pagination(currentPage + 1);
    }
});
// Ajout d'un événement pour la recherche
document.querySelectorAll("#cargo-code-search, #leaving-date-search, #arrived-date-search, #departure-point-search, #arrival-point-search, #cargo-type-search")
    .forEach((element) => {
    element.addEventListener("input", () => {
        pagination(1);
    });
});
pagination();
function showAlertErrorMessage(title, message) {
    Swal.fire({
        title: `${title}`,
        text: `${message}`,
        icon: 'error',
        timer: 4000,
        showConfirmButton: false,
        timerProgressBar: true,
        customClass: {
            popup: 'swal-custom',
            title: 'swal-custom-title',
            content: 'swal-custom-content',
            icon: 'swal-custom-icon',
            timerProgressBar: 'swal-custom-timer-progress-bar'
        }
    });
}
function sendSMS(phoneNumber, message) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "App fad946e39e7d544b4d3799811de32d74-a4b4d6e5-a73c-432c-9791-44388ac3cc81");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    const raw = JSON.stringify({
        "messages": [
            {
                "destinations": [{ "to": "221785222794" }],
                "from": "ServiceSMS",
                "text": "Congratulations on sending your first message.\nGo ahead and check the delivery report in the next step."
            }
        ]
    });
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    fetch("https://43y4p1.api.infobip.com/sms/2/text/advanced", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}
function addProductToCargo(c) {
    var _a;
    let isValid = true;
    let userSender;
    let userReceiver;
    let totalPrice = 0;
    let productWeight = 0;
    let phoneInputSender = '';
    let phoneInputReceiver = '';
    const chimicalOption = newProductType.options[1];
    if (c.type === 'ROAD' || c.type === 'AIR') {
        chimicalOption.disabled = true;
    }
    else {
        chimicalOption.disabled = false;
    }
    materialElement.innerHTML = '';
    toxicity.innerHTML = "";
    divProductWeight.innerHTML = '';
    if (String(c.maxWeight) != 'null') {
        divProductWeight.innerHTML = `
            <label class="border border-gray-300 rounded-xl flex items-center p-2.5 mt-5">
                <span style="width: 170px">Poids du colis:</span>
                <input type="text" name="weight" id="weight" class="w-full outline-none border border-gray-300 rounded-lg py-1 pl-1">
            </label>
            <div class="pl-2.5 text-red-600 hidden" id="err-product-weight"></div>
        `;
    }
    else {
        productWeight = 1;
    }
    (_a = productType.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(newProductType, productType);
    let typeOfProduct = '';
    newProductType.addEventListener('change', (e) => {
        var _a, _b;
        typeOfProduct = e.target.value;
        toxicity.innerHTML = "";
        if (typeOfProduct === 'CHIMICAL') {
            toxicity.innerHTML = `
                <label class="border border-gray-300 rounded-xl flex items-center p-2.5 mt-5">
                    <span class="w-64">Dégré de toxicité:</span>
                    <input type="text" name="toxicity" id="toxicity" class="w-full outline-none border border-gray-300 rounded-lg py-1 pl-1">
                </label>
                <div class="pl-2.5 text-red-600 hidden" id="err-leaving-date">error</div>
            `;
        }
        materialElement.innerHTML = '';
        if (typeOfProduct === 'MATERIAL') {
            materialElement.innerHTML = `
                <label class="border border-gray-300 rounded-xl flex items-center p-2.5 mt-4">
                    <span class="w-36">Type de matériel:</span>
                    <select class="grow py-2 pl-1 outline-none rounded-lg" id="product-material-type" name="material-type">
                        <option value="0">Choisir le matériel de produit</option>
                        <option value="UNBREAKABLE">Incassable</option>
                        <option value="FRAGILE" id="fragile">Fragile</option>
                    </select>
                </label>
                <div class="pl-1 mt-2 text-red-600 hidden" id="err-product-material-type"><i class="fa-solid fa-triangle-exclamation"></i>&nbsp;Ce champ est obligatoire</div>
            `;
            productMaterialType = document.getElementById('product-material-type');
        }
        if (c.type === 'MARITIME' && typeOfProduct === 'MATERIAL') {
            document.getElementById('fragile').disabled = true;
        }
        (_a = document.getElementById("search-sender")) === null || _a === void 0 ? void 0 : _a.addEventListener("input", (event) => {
            phoneInputSender = event.target.value.trim();
            const senderInfoDiv = document.getElementById("sender-info");
            senderInfoDiv.innerHTML = ''; // Clear previous content
            if (phoneInputSender) {
                userSender = users.find(u => u.telephone === phoneInputSender);
                if (userSender && userSender.type === "sender") {
                    // User found and is a sender, display read-only inputs
                    senderInfoDiv.innerHTML = `
                        <div class="flex mt-5">
                            <div class="flex w-full mr-2 items-center">
                                <div>
                                    <label>Prénom:&nbsp;</label>
                                </div>
                                <input class="h-12 pl-2 rounded-full outline-none border border-gray-300 bg-gray-200" type="text" id="sender-firstname" value="${userSender.firstname}" readonly>
                            </div>
                            <div class="flex w-full mr-2 items-center">
                                <div>
                                    <label>Nom:&nbsp</label>
                                </div>
                                <input class="w-full h-12 pl-2 rounded-full outline-none border border-gray-300 bg-gray-200" type="text" id="sender-lastname" value="${userSender.lastname}" readonly>
                            </div>
                            <div class="flex w-full mr-2 items-center">
                                <div>
                                    <label>Email:&nbsp;</label>
                                </div>
                                <input class="w-full h-12 pl-2 rounded-full outline-none border border-gray-300 bg-gray-200" type="email" id="sender-email" value="${userSender.email}" readonly>
                            </div>
                        </div>
                        <div class="flex mt-5">
                            <div class="flex w-full mr-2 items-center">
                                <div>
                                    <label>Address:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                </div>
                                <input class="w-full h-12 pl-2 rounded-full outline-none border border-gray-300 bg-gray-200" type="text" id="sender-address" value="${userSender.address}" readonly>
                            </div>
                            <div class="flex w-full ml-2 items-center">
                                <div>
                                    <label>Téléphone:&nbsp;&nbsp;</label>
                                </div>
                                <input style="width: 355px" class="w-full h-12 pl-2 rounded-full outline-none border border-gray-300 bg-gray-200" type="text" id="sender-phone" value="${userSender.telephone}" readonly>
                            </div>
                        </div>
                    `;
                }
                else {
                    // User not found or not a sender, display writable inputs
                    senderInfoDiv.innerHTML = `
                        <div class="flex mt-5">
                            <div class="flex mr-2">
                                <div class="mt-3">
                                    <label>Prénom:&nbsp;</label>
                                </div>
                                <div>
                                    <input class="h-12 pl-2 rounded-full outline-none border border-gray-300" type="text" id="sender-firstname">
                                    <div class="text-red-600 hidden" id="err-sender-firstname"><i class="fa-solid fa-triangle-exclamation"></i>&nbsp;Ce champ est obligatoire</div>
                                </div>                            
                            </div>
                            
                            <div class="flex mr-2">
                                <div class="mt-3">
                                    <label>Nom:&nbsp</label>
                                </div>
                                <div>
                                    <input class="w-full h-12 pl-2 rounded-full outline-none border border-gray-300" type="text" id="sender-lastname">
                                    <div class="text-red-600 hidden" id="err-sender-lastname"><i class="fa-solid fa-triangle-exclamation"></i>&nbsp;Ce champ est obligatoire</div> 
                                </div>
                            </div>
                            <div class="flex">
                                <div class="mt-3">
                                    <label>Email:&nbsp;</label>
                                </div>
                                 <div>
                                    <input class="w-full h-12 pl-2 rounded-full outline-none border border-gray-300" type="email" id="sender-email">
                                    <div class="text-red-600 hidden" id="err-sender-email"><i class="fa-solid fa-triangle-exclamation"></i>&nbsp;Ce champ est obligatoire</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex mt-3">
                            <div class="flex w-full mr-2 ">
                                <div class="mt-3">
                                    <label>Address:&nbsp;</label>
                                </div>
                                <div>
                                    <input style="width: 355px" class="h-12 pl-2 rounded-full outline-none border border-gray-300" type="text" id="sender-address">
                                    <div class="text-red-600 hidden" id="err-sender-address"><i class="fa-solid fa-triangle-exclamation"></i>&nbsp;Ce champ est obligatoire</div>
                                </div>
                            </div>
                            <div class="flex w-full ml-2">
                                <div class="mt-3">
                                    <label>Téléphone:&nbsp;&nbsp;</label>
                                </div>
                                <div>
                                    <input style="width: 355px" class="h-12 pl-2 rounded-full outline-none border border-gray-300 bg-gray-200" type="text" id="sender-phone" value="${phoneInputSender}" readonly>
                                    <div class="text-red-600 hidden" id="err-sender-phone"><i class="fa-solid fa-triangle-exclamation"></i>&nbsp;Ce champ est obligatoire</div>
                                </div>
                            </div>
                        </div>
                    `;
                }
            }
        });
        const samePhoneNumberErrorMessage = document.querySelector("#err-same-number");
        (_b = document.getElementById("search-receiver")) === null || _b === void 0 ? void 0 : _b.addEventListener("input", (event) => {
            phoneInputReceiver = event.target.value.trim();
            if (phoneInputSender === phoneInputReceiver) {
                samePhoneNumberErrorMessage.classList.remove("hidden");
                isValid = false;
            }
            else {
                samePhoneNumberErrorMessage.classList.add("hidden");
                isValid = true;
            }
            const receiverInfoDiv = document.getElementById("receiver-info");
            receiverInfoDiv.innerHTML = ''; // Clear previous content
            if (phoneInputReceiver) {
                userReceiver = users.find(u => u.telephone === phoneInputReceiver);
                if (userReceiver && userReceiver.type === "receiver") {
                    receiverInfoDiv.innerHTML = `
                        <div class="flex mt-5">
                            <div class="flex w-full mr-2 items-center">
                                <div>
                                    <label>Prénom:&nbsp;</label>
                                </div>
                                <input class="h-12 pl-2 rounded-full outline-none border border-gray-300 bg-gray-200" type="text" id="receiver-firstname" value="${userReceiver.firstname}" readonly>
                            </div>
                            <div class="flex w-full mr-2 items-center">
                                <div>
                                    <label>Nom:&nbsp</label>
                                </div>
                                <input class="w-full h-12 pl-2 rounded-full outline-none border border-gray-300 bg-gray-200" type="text" id="receiver-lastname" value="${userReceiver.lastname}" readonly>
                            </div>
                            <div class="flex w-full mr-2 items-center">
                                <div>
                                    <label>Email:&nbsp;</label>
                                </div>
                                <input class="w-full h-12 pl-2 rounded-full outline-none border border-gray-300 bg-gray-200" type="email" id="receiver-email" value="${userReceiver.email}" readonly>
                            </div>
                        </div>
                        <div class="flex mt-5">
                            <div class="flex w-full mr-2 items-center">
                                <div>
                                    <label>Address:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                </div>
                                <input class="w-full h-12 pl-2 rounded-full outline-none border border-gray-300 bg-gray-200" type="text" id="receiver-address" value="${userReceiver.address}" readonly>
                            </div>
                            <div class="flex w-full ml-2 items-center">
                                <div>
                                    <label>Téléphone:&nbsp;&nbsp;</label>
                                </div>
                                <input style="width: 355px" class="w-full h-12 pl-2 rounded-full outline-none border border-gray-300 bg-gray-200" type="text" id="receiver-phone" value="${userReceiver.telephone}" readonly>
                            </div>
                        </div>
                    `;
                }
                else {
                    // User not found or not a sender, display writable inputs
                    receiverInfoDiv.innerHTML = `
                        <div class="flex mt-5">
                            <div class="flex mr-2">
                                <div class="mt-3">
                                    <label>Prénom:&nbsp;</label>
                                </div>
                                <div>
                                    <input class="h-12 pl-2 rounded-full outline-none border border-gray-300" type="text" id="receiver-firstname">
                                    <div class="text-red-600 hidden" id="err-receiver-firstname"><i class="fa-solid fa-triangle-exclamation"></i>&nbsp;Ce champ est obligatoire</div>
                                </div>                            
                            </div>
                            <div class="flex mr-2">
                                <div class="mt-3">
                                    <label>Nom:&nbsp</label>
                                </div>
                                <div>
                                    <input class="w-full h-12 pl-2 rounded-full outline-none border border-gray-300" type="text" id="receiver-lastname">
                                    <div class="text-red-600 hidden" id="err-receiver-lastname"><i class="fa-solid fa-triangle-exclamation"></i>&nbsp;Ce champ est obligatoire</div> 
                                </div>
                            </div>
                            <div class="flex">
                                <div class="mt-3">
                                    <label>Email:&nbsp;</label>
                                </div>
                                 <div>
                                    <input class="w-full h-12 pl-2 rounded-full outline-none border border-gray-300" type="email" id="receiver-email">
                                    <div class="text-red-600 hidden" id="err-receiver-email"><i class="fa-solid fa-triangle-exclamation"></i>&nbsp;Ce champ est obligatoire</div>
                                </div>
                            </div>
                        </div>
                
                        <div class="flex mt-5">
                            <div class="flex w-full mr-2 ">
                                <div class="mt-3">
                                    <label>Address:&nbsp;</label>
                                </div>
                                <div>
                                    <input style="width: 355px" class="h-12 pl-2 rounded-full outline-none border border-gray-300" type="text" id="receiver-address">
                                    <div class="text-red-600 hidden" id="err-receiver-address"><i class="fa-solid fa-triangle-exclamation"></i>&nbsp;Ce champ est obligatoire</div>
                                </div>
                            </div>
                            <div class="flex w-full ml-2">
                                <div class="mt-3">
                                    <label>Téléphone:&nbsp;&nbsp;</label>
                                </div>
                                <div>
                                    <input style="width: 355px" class="h-12 pl-2 rounded-full outline-none border border-gray-300 bg-gray-200" type="text" id="receiver-phone" value="${phoneInputReceiver}" readonly>
                                    <div class="text-red-600 hidden" id="err-receiver-phone"><i class="fa-solid fa-triangle-exclamation"></i>&nbsp;Ce champ est obligatoire</div>
                                </div>
                            </div>
                        </div>
                    `;
                }
            }
        });
    });
    if (String(c.maxWeight) != 'null') {
        productWeightInputField = document.getElementById('weight');
        productWeightInputField.addEventListener('input', (e) => {
            productWeight = Number(e.target.value);
            totalPrice = calculatePriceOfProduct(c.type, typeOfProduct, productWeight, c.distance);
            if (totalPrice < 10000) {
                totalPrice = 10000;
            }
            document.querySelector("#total-price-product").value = String(totalPrice);
        });
    }
    totalPrice = calculatePriceOfProduct(c.type, typeOfProduct, productWeight, c.distance);
    if (totalPrice < 10000) {
        totalPrice = 10000;
    }
    document.querySelector("#total-price-product").value = String(totalPrice);
    formProduct.addEventListener("submit", (e) => {
        e.preventDefault();
        isValid = isValidFieldProduct();
        //Les infors du client
        let sender = null;
        if (phoneInputSender) {
            const senderFirstname = document.getElementById("sender-firstname").value.trim();
            const senderLastname = document.getElementById("sender-lastname").value.trim();
            const senderEmail = document.getElementById("sender-email").value.trim();
            const senderAddress = document.getElementById("sender-address").value.trim();
            const senderPhone = document.getElementById("sender-phone").value.trim();
            isValid = validateFieldSenderAndReceiver(senderFirstname, senderLastname, senderEmail, senderAddress, senderPhone, "sender");
            if (isValid) {
                sender = new Sender(3, senderFirstname, senderLastname, senderEmail, senderAddress, senderPhone, "sender");
            }
        }
        //Les infos du recepteur
        let receiver = null;
        if (phoneInputReceiver) {
            const receiverFirstname = document.getElementById("receiver-firstname").value.trim();
            const receiverLastname = document.getElementById("receiver-lastname").value.trim();
            const receiverEmail = document.getElementById("receiver-email").value.trim();
            const receiverAddress = document.getElementById("receiver-address").value.trim();
            const receiverPhone = document.getElementById("receiver-phone").value.trim();
            isValid = validateFieldSenderAndReceiver(receiverFirstname, receiverLastname, receiverEmail, receiverAddress, receiverPhone, "receiver");
            if (isValid) {
                receiver = new Receiver(4, receiverFirstname, receiverLastname, receiverEmail, receiverAddress, receiverPhone, "receiver");
            }
        }
        if (phoneInputSender === '' || phoneInputReceiver === '') {
            errEmptyNumber.classList.remove('hidden');
            isValid = false;
        }
        else {
            errEmptyNumber.classList.add('hidden');
            isValid = true;
        }
        if (isValid) {
            if (!userSender) {
                saveUserSender(sender);
            }
            if (!userReceiver) {
                saveUserReceiver(receiver);
            }
            let totalAmountCargo = Number(c.totalAmount) + totalPrice;
            let updatedQuantity = 0;
            if (String(c.maxWeight) != 'null') {
                const weight = document.getElementById('weight').value.trim();
                updatedQuantity = Number(c.maxWeight) - Number(weight);
            }
            else {
                updatedQuantity = Number(c.maxNbrProduct) - 1;
            }
            const formData = new FormData(formProduct);
            formData.append("id", (1).toString());
            formData.append("code", "PR00000001");
            formData.append("cargoId", (c.id).toString());
            //formData.append("sender", JSON.stringify(sender));
            //formData.append("receiver", JSON.stringify(receiver));
            formData.append("totalPrice", totalPrice.toString());
            formData.append("totalAmount", totalAmountCargo.toString());
            formData.append("updatedQuantity", updatedQuantity.toString());
            //formData.append("emailReceiver", receiverEmail);
            fetch('api.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.text())
                .then(data => {
                console.log("Raw server response:", data); // Affiche la réponse brute du serveur
                try {
                    const jsonData = JSON.parse(data);
                    if (jsonData.status === "success") {
                        const myModal = document.getElementById('my_modal_5');
                        myModal.close();
                        //sendSMS(785222794, 'bonjour');
                        Swal.fire({
                            title: "Succès",
                            text: "Produit ajouté avec succès à la cargaison",
                            icon: "success",
                            timer: 4000,
                            showConfirmButton: false,
                            timerProgressBar: true,
                        });
                    }
                    else {
                        alert('Erreur lors de l\'ajout du produit dans la cargaison');
                    }
                }
                catch (error) {
                    console.error('JSON parsing error:', error);
                    alert('Erreur de réponse du serveur. Veuillez réessayer plus tard.');
                }
            }).catch(error => console.error('Erreur:', error));
        }
    });
}
function isValidFieldProduct() {
    let isValid = true;
    if (productMaterialType !== undefined) {
        const errMsgProductMaterialType = document.getElementById('err-product-material-type');
        if (productMaterialType.value === '0') {
            errMsgProductMaterialType.classList.remove('hidden');
            isValid = false;
        }
        else {
            errMsgProductMaterialType.classList.add('hidden');
            isValid = true;
        }
    }
    if (newProductType.value === '0') {
        isValid = false;
        errMsgProductType.classList.remove('hidden');
    }
    else {
        isValid = true;
        errMsgProductType.classList.add('hidden');
    }
    if (divProductWeight.innerHTML !== '') {
        const errMsgProductWeight = document.getElementById('err-product-weight');
        errMsgProductWeight.innerHTML = '';
        if (productWeightInputField.value.trim() === '') {
            errMsgProductWeight.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>&nbsp;Ce champ est obligatoire';
            errMsgProductWeight.classList.remove('hidden');
            isValid = false;
        }
        else if (Number(productWeightInputField.value.trim()) <= 0) {
            errMsgProductWeight.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>&nbsp;Le poids minimum d\'un colis est de 1KG';
            errMsgProductWeight.classList.remove('hidden');
            isValid = false;
        }
        else {
            errMsgProductWeight.classList.add('hidden');
            isValid = true;
        }
    }
    return isValid;
}
function validateFieldSenderAndReceiver(firstname, lastname, email, address, phoneNumber, userType) {
    let isValid = true;
    if (userType === 'sender') {
        const errMsgSenderFirstname = document.getElementById('sender-firstname');
        const errMsgSenderLastname = document.getElementById('sender-lastname');
        const errMsgSenderEmail = document.getElementById('sender-email');
        const errMsgSenderAddress = document.getElementById('sender-address');
        const errMsgSenderTelephone = document.getElementById('sender-phone');
        if (firstname === '') {
            errMsgSenderFirstname === null || errMsgSenderFirstname === void 0 ? void 0 : errMsgSenderFirstname.classList.remove('hidden');
            isValid = false;
        }
        else {
            errMsgSenderFirstname === null || errMsgSenderFirstname === void 0 ? void 0 : errMsgSenderFirstname.classList.add('hidden');
            isValid = true;
        }
        if (lastname === '') {
            errMsgSenderLastname === null || errMsgSenderLastname === void 0 ? void 0 : errMsgSenderLastname.classList.remove('hidden');
            isValid = false;
        }
        else {
            errMsgSenderLastname === null || errMsgSenderLastname === void 0 ? void 0 : errMsgSenderLastname.classList.add('hidden');
            isValid = true;
        }
        if (email === '') {
            errMsgSenderEmail === null || errMsgSenderEmail === void 0 ? void 0 : errMsgSenderEmail.classList.remove('hidden');
            isValid = false;
        }
        else {
            errMsgSenderEmail === null || errMsgSenderEmail === void 0 ? void 0 : errMsgSenderEmail.classList.add('hidden');
            isValid = true;
        }
        if (address === '') {
            errMsgSenderAddress === null || errMsgSenderAddress === void 0 ? void 0 : errMsgSenderAddress.classList.remove('hidden');
            isValid = false;
        }
        else {
            errMsgSenderAddress === null || errMsgSenderAddress === void 0 ? void 0 : errMsgSenderAddress.classList.add('hidden');
            isValid = true;
        }
        if (phoneNumber === '') {
            errMsgSenderTelephone === null || errMsgSenderTelephone === void 0 ? void 0 : errMsgSenderTelephone.classList.remove('hidden');
            isValid = false;
        }
        else {
            errMsgSenderTelephone === null || errMsgSenderTelephone === void 0 ? void 0 : errMsgSenderTelephone.classList.add('hidden');
            isValid = true;
        }
    }
    if (userType === 'receiver') {
        const errMsgReceiverFirstname = document.getElementById('receiver-firstname');
        const errMsgReceiverLastname = document.getElementById('receiver-lastname');
        const errMsgReceiverEmail = document.getElementById('receiver-email');
        const errMsgReceiverAddress = document.getElementById('receiver-address');
        const errMsgReceiverTelephone = document.getElementById('receiver-phone');
        if (firstname === '') {
            errMsgReceiverFirstname === null || errMsgReceiverFirstname === void 0 ? void 0 : errMsgReceiverFirstname.classList.remove('hidden');
            isValid = false;
        }
        else {
            errMsgReceiverFirstname === null || errMsgReceiverFirstname === void 0 ? void 0 : errMsgReceiverFirstname.classList.add('hidden');
            isValid = true;
        }
        if (lastname === '') {
            errMsgReceiverLastname === null || errMsgReceiverLastname === void 0 ? void 0 : errMsgReceiverLastname.classList.remove('hidden');
            isValid = false;
        }
        else {
            errMsgReceiverLastname === null || errMsgReceiverLastname === void 0 ? void 0 : errMsgReceiverLastname.classList.add('hidden');
            isValid = true;
        }
        if (email === '') {
            errMsgReceiverEmail === null || errMsgReceiverEmail === void 0 ? void 0 : errMsgReceiverEmail.classList.remove('hidden');
            isValid = false;
        }
        else {
            errMsgReceiverEmail === null || errMsgReceiverEmail === void 0 ? void 0 : errMsgReceiverEmail.classList.add('hidden');
            isValid = true;
        }
        if (address === '') {
            errMsgReceiverAddress === null || errMsgReceiverAddress === void 0 ? void 0 : errMsgReceiverAddress.classList.remove('hidden');
            isValid = false;
        }
        else {
            errMsgReceiverAddress === null || errMsgReceiverAddress === void 0 ? void 0 : errMsgReceiverAddress.classList.add('hidden');
            isValid = true;
        }
        if (phoneNumber === '') {
            errMsgReceiverTelephone === null || errMsgReceiverTelephone === void 0 ? void 0 : errMsgReceiverTelephone.classList.remove('hidden');
            isValid = false;
        }
        else {
            errMsgReceiverTelephone === null || errMsgReceiverTelephone === void 0 ? void 0 : errMsgReceiverTelephone.classList.add('hidden');
            isValid = true;
        }
    }
    return isValid;
}
btnCloseProduct.addEventListener('click', () => {
    clearProductForm();
});
btnCancelProduct.addEventListener('click', () => {
    clearProductForm();
    document.getElementById('my_modal_5').close();
});
function clearProductForm() {
    formProduct.reset();
    errMsgProductType.classList.add('hidden');
}
function calculatePriceOfProduct(cargaisonType, productType, genericQuantity, cargoDistance) {
    if (cargaisonType === 'ROAD' && productType === 'ALIMENTARY') {
        return 100 * genericQuantity * cargoDistance;
    }
    else if (cargaisonType === 'ROAD' && productType === 'MATERIAL') {
        return 100 * genericQuantity * cargoDistance;
    }
    else if (cargaisonType === 'MARITIME' && productType === 'ALIMENTARY') {
        return 90 * genericQuantity * cargoDistance;
    }
    else if (cargaisonType === 'MARITIME' && productType === 'CHIMICAL') {
        return 500 * genericQuantity * cargoDistance;
    }
    else if (cargaisonType === 'MARITIME' && productType === 'MATERIAL') {
        return 400 * genericQuantity * cargoDistance;
    }
    else if (cargaisonType === 'AIR' && productType === 'ALIMENTARY') {
        return 300 * genericQuantity * cargoDistance;
    }
    else if (cargaisonType === 'AIR' && productType === 'MATERIAL') {
        return 1000 * genericQuantity;
    }
    return 0;
}
function saveUserSender(sender) {
    const formData = new FormData();
    formData.append("action", "addUserSender");
    formData.append("sender", JSON.stringify(sender));
    fetch('api.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.text())
        .then(data => {
        console.log("data sender:", data);
        const jsonData = JSON.parse(data);
        if (jsonData.status === "success")
            console.log("J'ajoute le sender"); //alert(jsonData.message);
        else
            alert('Erreur lors de l\'ajout de l\'expéditeur');
    }).catch(error => console.error('Erreur:', error));
}
function saveUserReceiver(receiver) {
    const formData = new FormData();
    formData.append("action", "addUserReceiver");
    formData.append("receiver", JSON.stringify(receiver));
    fetch('api.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.text())
        .then(data => {
        console.log("data sender:", data);
        const jsonData = JSON.parse(data);
        if (jsonData.status === "success")
            console.log("J'ajoute le receiver"); //alert(jsonData.message);
        else
            alert('Erreur lors de l\'ajout du destinataire');
    }).catch(error => console.error('Erreur:', error));
}
// document.getElementById("product-close-top")?.addEventListener("click", () =>{
//     (document.getElementById('product-material-type') as HTMLSelectElement).value = "0";
// })
let users = [];
function getAllUsers() {
    fetch('users.json')
        .then(response => response.json())
        .then(data => {
        users = data.users;
    });
}
getAllUsers();
function displayCargo() {
    fetch('cargaisons.json')
        .then(response => response.json())
        .then(data => {
        cargaisons = data.cargaisons;
        const cargaisonList = document.getElementById('tbody-cargo');
        if (!cargaisonList)
            return;
        cargaisonList.innerHTML = '';
        cargaisons.forEach(cargaison => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>
                <div class="flex items-center gap-3">
                    <div class="avatar">
                        <div class="mask mask-squircle w-12 h-12">
                            <img
                                src="${cargaison.image}"
                                alt="Avatar Tailwind CSS Component"
                            />
                        </div>
                    </div>
                    <div>
                    <div class="font-bold">${cargaison.reference}</div>
                    <div class="border-2 border-white text-xs opacity-50 badge badge-xs badge-error"></div>
                </div>
             </div>
            </td>
            <td>${String(cargaison.maxWeight) != 'null' ? cargaison.maxWeight + ' (KG)' : cargaison.maxNbrProduct}</td>
            <td>${cargaison.departurePoint}</td>
            <td>${cargaison.arrivalPoint}</td>
            <td>${cargaison.leavingDate}</td>
            <td>${cargaison.arrivedDate}</td>
            <td>${cargaison.distance + ' (KM)'}</td>
            <td>${cargaison.type}</td>
            <td>${cargaison.globalState}</td>
            <td>${cargaison.progressionState}</td>
            <td><button type="button" onclick="my_modal_5.showModal()">Ajouter cargaison</button></td>
          `;
            cargaisonList.appendChild(row);
        });
        // Ajouter des événements aux boutons "voir"
        /*document.querySelectorAll('.btn-view').forEach(button => {
          button.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            const cargaisonId = target.getAttribute('data-id');
            afficherDetailsCargaison(cargaisonId);
          });
        });*/
    })
        .catch(error => console.error('Erreur:', error));
}
