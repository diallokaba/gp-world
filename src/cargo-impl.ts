import { Air, Cargo, Maritime, Road } from "./model/cargo.js";
import { Receiver, Sender, User } from "./model/user.js";

const byWeight: any = document.querySelector("#byWeight");
const byProduct: any = document.querySelector("#byProduct");
const quantity: any = document.querySelector("#quantity");
const cargoType: any = document.querySelector("#cargo-type");
const leavingDate: any = document.querySelector("#leavingDate");
const arrivedDate: any = document.querySelector("#arrivedDate");
const departurePoint: any = document.querySelector("#departurePoint");
const arrivalPoint: any = document.querySelector("#arrivalPoint");
const distance: any = document.querySelector("#distance");
const form = document.querySelector("#add-cargo") as HTMLFormElement;
const radioChoice: any = document.getElementById("radio-choice");
const tbodyCargo = document.getElementById('tbody-cargo') as HTMLElement;
const btnCloseProduct = document.querySelector('.btn-close-product') as HTMLElement;
const btnCancelProduct = document.getElementById('btn-cancel-product') as HTMLElement;
const formProduct = document.getElementById("add-product") as HTMLFormElement;
const materialElement:HTMLDivElement = document.querySelector("#material") as HTMLDivElement;
const toxicity = document.querySelector("#chimical-toxicity") as HTMLElement;
const errMsgProductType = document.querySelector("#err-product-type") as HTMLElement;
const divProductWeight: HTMLElement = (document.getElementById('product-weight') as HTMLElement);
const errEmptyNumber: HTMLElement = (document.getElementById('err-empty-number') as HTMLElement);
let productWeightInputField: HTMLInputElement;
const productType: HTMLSelectElement = (document.getElementById('product-type') as HTMLSelectElement);
const newProductType = productType.cloneNode(true) as HTMLSelectElement;
let productMaterialType: HTMLSelectElement;
const senderInfoDiv = document.getElementById("sender-info") as HTMLDivElement;
const receiverInfoDiv = document.getElementById("receiver-info") as HTMLDivElement;
const reload = document.getElementById("reload-page");

byWeight.addEventListener('click', () =>{
    if(byWeight.checked === true){
        radioChoice.classList.add('hidden');
        quantity.innerHTML = '';
        quantity.innerHTML = 
        `<label class="border border-gray-300 rounded-xl flex items-center p-2.5 mt-5">
            <span class="w-36">Poids Max:</span>
            <input id="weightMax" name="maxWeight" type="number" class="grow border border-gray-300 rounded-lg py-1 px-2 outline-none" placeholder="Entrer le poids maximum en KG que peut contenir cette cargaison" />
        </label>
        <div class="pl-2.5 text-red-600 hidden" id="weight-max-err">error</div>
        `
    }
});

byProduct.addEventListener('click', () =>{
    if(byProduct.checked === true){
        radioChoice.classList.add('hidden');
        quantity.innerHTML = '';
        quantity.innerHTML = 
        `<label class="border border-gray-300 rounded-xl flex items-center p-2.5 mt-5">
            <span class="w-36">Produit Max:</span>
            <input id="productMax" name="maxNbrProduct" type="number" class="grow border border-gray-300 rounded-lg py-1 px-2 outline-none" placeholder="Entrer le nombre de produit maximum que pourra contenir cette cargaison" />
        </label>
        <div class="pl-2.5 text-red-600 hidden" id="nbr-product-err">error</div>
        `
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


form.addEventListener('submit', (e) =>{
    e.preventDefault();


    const weightMax: any = document.querySelector("#weightMax");
    const productMax: any = document.querySelector("#productMax");

    let isValid: boolean = dataIsValid(weightMax, productMax);

    if(isValid){
        const formData = new FormData(form);
        formData.append('action', 'addCargaison');
        let newId: number = 1;
        if(cargaisons.length > 0){
            const lastCargo: Cargo = cargaisons[cargaisons.length - 1];
            newId = Number(lastCargo.id) +1;
        }
        formData.append("id", newId.toString());
        let reference: string = '';
        if(newId < 10){
            reference = 'CR' + padStart(newId.toString(), 5, '0');   
        }else if(newId > 9 && newId < 100){
           reference = 'CR' + padStart(newId.toString(), 4, '0');
        }else if(newId > 99 && newId < 1000){
            reference = 'CR' + padStart(newId.toString(), 3, '0');
        }

        formData.append("reference", reference);
        
        if(byWeight.checked){
            console.log(weightMax.value.toString());
            formData.append('maxWeight', weightMax.value.toString());
        }else{
            formData.append('maxWeight', 'null');
        }

        if(byProduct.checked){
            formData.append('maxNbrProduct', productMax.value.toString());
        }else{
            formData.append('maxNbrProduct', 'null');
        }
        const type: string = cargoType.value.trim();
        let imageUrl: string = '';

        if(type === "AIR"){
            imageUrl = 'https://www.inc-conso.fr/sites/default/files/avion-800_1.png';
        }else if(type === "MARITIME"){
            imageUrl = 'https://www.trade-easy.fr/wp-content/uploads/2022/06/Cout-fret-maritime-TRADE.EASY_.png';
        }else{
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
                //console.log(data);
                const jsonData = JSON.parse(data);
              if (jsonData.status === "success") {
                let cargo: Cargo;
                if(type === "Air"){
                    cargo = new Air(newId, reference, parseFloat(formData.get("maxWeight")?.toString() || "null"), parseFloat(formData.get("maxNbrProduct")?.toString() || "null"), 0, type, String(formData.get('leavingDate')), String(formData.get('arrivedDate')), parseFloat(formData.get('distance')?.toString() || "0"), String(formData.get('departurePoint')), String(formData.get('arrivalPoint')), String(formData.get('globalState')), String(formData.get('progressionState')), imageUrl);
                }else if(type === "MARITIME"){
                    cargo = new Maritime(newId, reference, parseFloat(formData.get("maxWeight")?.toString() || "null"), parseInt(formData.get("maxNbrProduct")?.toString() || "null"), 0, type, String(formData.get('leavingDate')), String(formData.get('arrivedDate')), parseFloat(formData.get('distance')?.toString() || "0"), String(formData.get('departurePoint')), String(formData.get('arrivalPoint')), String(formData.get('globalState')), String(formData.get('progressionState')), imageUrl);
                }else {
                    cargo = new Road(newId, reference, parseFloat(formData.get("maxWeight")?.toString() || "null"), parseInt(formData.get("maxNbrProduct")?.toString() || "null"), 0, type, String(formData.get('leavingDate')), String(formData.get('arrivedDate')), parseFloat(formData.get('distance')?.toString() || "0"), String(formData.get('departurePoint')), String(formData.get('arrivalPoint')), String(formData.get('globalState')), String(formData.get('progressionState')), imageUrl);
                }
                cargaisons.push(cargo);
                displayThisCagoOnTheTable(cargo);
                const myModal = (document.getElementById('my_modal_4') as HTMLDialogElement);
                myModal.close();
                Swal.fire({
                    title: "Succès",
                    text: jsonData.message,
                    icon: "success",
                    timer: 4000,
                    showConfirmButton: false,
                    timerProgressBar: true,
                });
                //alert(jsonData.message);
                //const cargo: Cargo = Object.assign(Cargo, formData.entries);
              } else {
                alert('Erreur lors de l\'ajout de la cargaison');
              }
            })
            .catch(error => console.error('Erreur:', error));
    }
});

function dataIsValid(weightMax: any, productMax: any): boolean{
    let isValid: boolean = true;
    if(!byWeight.checked && !byProduct.checked){
        radioChoice.classList.remove('hidden');
        radioChoice.classList.add('visible');
        radioChoice.innerText = 'Veuillez choisir le mode de remplissage de cette cargaison';
        isValid = false;
    }
    if(byWeight.checked){
        const errWeight:any = document.getElementById('weight-max-err');
        if(weightMax.value.trim() === ''){
            errWeight?.classList.remove('hidden');
            errWeight?.classList.add('visible');
            errWeight.innerText = 'Le poids maximum est obligatoire';
            isValid = false;
        }else{
            if(weightMax.value <=0){
                errWeight?.classList.remove('hidden');
                errWeight?.classList.add('visible');
                errWeight.innerText = 'Le poids maximum doit être un nombre supérieur à 0';
                isValid = false;
            }else{
                errWeight?.classList.add('hidden');
            }
        }
    }
    if(byProduct.checked){
        const errNbrProduct:any = document.getElementById('nbr-product-err');
        if(productMax.value.trim() === ''){
            errNbrProduct?.classList.remove('hidden');
            errNbrProduct?.classList.add('visible');
            errNbrProduct.innerText = 'Le nombre de produit maximum est obligatoire';
            isValid = false;
        }else{
            if(productMax.value <=0){
                errNbrProduct?.classList.remove('hidden');
                errNbrProduct?.classList.add('visible');
                errNbrProduct.innerText = 'Le nombre de produit maximum doit être un nombre supérieur à 0';
                isValid = false;
            }else{
                errNbrProduct?.classList.add('hidden');
            }
        }
    }
    const errLeavingDate: any = document.getElementById('err-leaving-date');
    let leavingDateLessThanTodayDate: boolean = false;
    if(leavingDate.value.trim() === ''){
        errLeavingDate?.classList.remove('hidden');
        errLeavingDate?.classList.add('visible');
        errLeavingDate.innerText = 'La date de départ est obligatoire';
        isValid = false;
    }else{
        let todayDate = new Date();
        let formatLeavingDate = new Date(leavingDate.value.trim());
        todayDate.setHours(0,0,0,0);
        formatLeavingDate.setHours(0,0,0,0);
        if(formatLeavingDate < todayDate){
            errLeavingDate?.classList.remove('hidden');
            errLeavingDate?.classList.add('visible');
            errLeavingDate.innerText = 'La date de départ ne doit pas être inférieur à la date jour';
            leavingDateLessThanTodayDate = true;
            isValid = false;
        }else{
            errLeavingDate?.classList.add('hidden');
        }
    }

    const errArrivedDate: any = document.getElementById('err-arrived-date');
    if(arrivedDate.value.trim() === ''){
        errArrivedDate?.classList.remove('hidden');
        errArrivedDate?.classList.add('visible');
        errArrivedDate.innerText = 'La date d\'arrivée est obligatoire';
        isValid = false;
    }else{
        errArrivedDate?.classList.add('hidden');
    }

    const errDeparturePoint = document.getElementById('err-departure-point') as HTMLInputElement;
    if(departurePoint.value.trim() === ''){
        errDeparturePoint?.classList.remove('hidden');
        errDeparturePoint?.classList.add('visible');
        errDeparturePoint.innerText = 'Le lieu de départ est obligatoire';
        isValid = false;
    }else{
        errDeparturePoint?.classList.add('hidden');
    }

    const errArrivalPoint: any = document.getElementById('err-arrival-point');
    if(arrivalPoint.value.trim() === ''){
        errArrivalPoint?.classList.remove('hidden');
        errArrivalPoint?.classList.add('visible');
        errArrivalPoint.innerText = 'La lieu d\'arrivée est obligatoire';
        isValid = false;
    }else{
        errArrivalPoint?.classList.add('hidden');
    }

    const errDistance: any = document.getElementById('err-distance');
    if(distance.value.trim() === ''){
        errDistance?.classList.remove('hidden');
        errDistance?.classList.add('visible');
        errDistance.innerText = 'La distance est obligatoire';
        isValid = false;
    }else{
        errDistance?.classList.add('hidden');
    }

    if(arrivedDate.value.trim() != '' && leavingDate.value.trim() != '' && !leavingDateLessThanTodayDate){
        let lDate = new Date(leavingDate.value.trim());
        let aDate = new Date(arrivedDate.value.trim());

        lDate.setHours(0,0,0,0);
        aDate.setHours(0,0,0,0);

        if(aDate < lDate){
            errArrivedDate?.classList.remove('hidden');
            errArrivedDate?.classList.add('visible');
            errArrivedDate.innerText = 'La date d\'arrivée doit être supérieur à la date de départ';
            isValid = false;
        }else{
            errArrivedDate?.classList.add('hidden');
        }
    }

    const errCargoType: any = document.getElementById('err-cargo-type');
    if(cargoType.value == 0){
        errCargoType?.classList.remove('hidden');
        errCargoType?.classList.add('visible');
        errCargoType.innerText = 'Veuillez sélectionner le type de cargaison';
        isValid = false;
    }else{
        errCargoType?.classList.add('hidden');
    }
    return isValid;
}

function displayThisCagoOnTheTable(cargaison: Cargo){
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

let cargaisons: Cargo[] = [];

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

function padStart(str: string, targetLength: number, padString: string) {
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

let currentPage: number = 1;
const itemsPerPage: number = 7;
let totalPages: number = 1;


function pagination(page: number = currentPage){
    fetch('api.php?action=getCargaison', {
        method: 'GET'
    }).then(r => r.text()).then(data => {
        const jsonData = JSON.parse(data);
        cargaisons = jsonData.data.cargaisons;
        const cargoCodeSearch = (document.getElementById("cargo-code-search") as HTMLInputElement).value.trim().toLocaleLowerCase();
        const departurePointSearch = (document.getElementById("departure-point-search") as HTMLInputElement).value.trim().toLocaleLowerCase();
        const arrivalPointSearch = (document.getElementById("arrival-point-search") as HTMLInputElement).value.trim().toLocaleLowerCase();
        const leavingDateSearch = (document.getElementById("leaving-date-search") as HTMLInputElement).value;
        const arrivedDateSearch = (document.getElementById("arrived-date-search") as HTMLInputElement).value;
        const cargoTypeSearch = (document.getElementById("cargo-type-search") as HTMLInputElement).value;
        const filteredCargos = cargaisons.filter(c =>
            (cargoCodeSearch === "" || c.reference.toLowerCase().includes(cargoCodeSearch)) &&
            (leavingDateSearch === "" || c.leavingDate.includes(leavingDateSearch)) &&
            (arrivedDateSearch === "" || c.arrivedDate.includes(arrivedDateSearch)) &&
            (departurePointSearch === "" || c.departurePoint.toLowerCase().includes(departurePointSearch)) &&
            (arrivalPointSearch === "" || c.arrivalPoint.toLowerCase().includes(arrivalPointSearch)) &&
            (cargoTypeSearch === "" || c.type.includes(cargoTypeSearch)) 
        );

        totalPages = Math.ceil(filteredCargos.length / itemsPerPage);
        currentPage = page;

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedCargaisons = filteredCargos.slice(start, end);

        tbodyCargo.innerHTML = '';

        paginatedCargaisons.forEach(cargaison => {
            if(cargaison){
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
                <td>${cargaison.type === 'ROAD' ? 'Routière' : cargaison.type === 'AIR' ? 'Aérienne' : 'Maritime'}</td>
                <td>${cargaison.globalState === 'OPEN' ? '<span class="rounded-lg bg-green-300 p-2">Ouvert</span>' : '<span class="rounded-lg bg-danger p-2">Fermer</span>'}</td>
                <td>${cargaison.progressionState === 'PENDING' ? '<span class="rounded-lg bg-gray-300 p-2">En attente</span>' : cargaison.progressionState === 'IN_ROAD' ? '<span class="rounded-lg bg-yellow-300 p-2">En route</span>' : '<span class="rounded-lg bg-green-300 p-2">Arriver</span>'}</td>
                <td><button type="button" title="Ajouter produit" class="add-product-btn" data-id="${cargaison.id}">Ajouter produit</button></td>
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
                console.log( (event.target as HTMLButtonElement).getAttribute('data-id'));
                const cargoId = (event.target as HTMLButtonElement).getAttribute('data-id');
                
                const cargaison: Cargo = cargaisons.find(c => Number(c.id) === Number(cargoId))!;
                let weight = String(cargaison?.maxWeight) != 'null' ? cargaison?.maxWeight : cargaison?.maxNbrProduct;
                console.log(cargaison);
                if(cargaison?.globalState !== 'OPEN' || cargaison?.progressionState !== 'PENDING'){
                    showAlertErrorMessage('Impossible d\'ajouter un produit à cette cargaison', 'Pour ajouter un produit, la cargaison doit être en état "Ouvert" et "En attente"');
                }else if(Number(weight) === 0){
                    showAlertErrorMessage('Impossible d\'ajouter un produit à cette cargaison', 'Le poids maximum de la cargaison ou le nombre de colis maximum de la cargaison est de 0');
                }else{
                    if (cargaison) {
                        (document.getElementById('my_modal_5') as HTMLDialogElement).showModal();
                        const cargoName: HTMLSpanElement = (document.getElementById('cargo-name')as HTMLSpanElement);
                        cargoName.innerText = '';
                        if(cargaison.type === 'ROAD'){
                            cargoName.innerText = 'Routière';
                        }else if(cargaison.type === 'MARITIME'){
                            cargoName.innerText = 'Maritime';
                        }else {
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
       const prevButton = document.getElementById("prev-page") as HTMLButtonElement;
       const nextButton = document.getElementById("next-page") as HTMLButtonElement;
       if (prevButton) {
         prevButton.disabled = currentPage === 1;
       }
       if (nextButton) {
         nextButton.disabled = currentPage === totalPages;
       }

    });
}

document.getElementById("prev-page")?.addEventListener("click", () => {
    if (currentPage > 1) {
        pagination(currentPage - 1);
    }
  });
  
  document.getElementById("next-page")?.addEventListener("click", () => {
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

function showAlertErrorMessage(title: string, message: string){
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

reload?.addEventListener("click", () =>{
    console.log("Je suis à l'intérieur");
    (document.getElementById("cargo-code-search") as HTMLInputElement).value = "";
    (document.getElementById("departure-point-search") as HTMLInputElement).value = "";
    (document.getElementById("arrival-point-search") as HTMLInputElement).value = "";
    (document.getElementById("leaving-date-search") as HTMLInputElement).value = "";
    (document.getElementById("arrived-date-search") as HTMLInputElement).value = "";
    (document.getElementById("cargo-type-search") as HTMLInputElement).value = "";
    pagination(1);
});

function sendSMS(phoneNumber: string, message: string){
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "App fad946e39e7d544b4d3799811de32d74-a4b4d6e5-a73c-432c-9791-44388ac3cc81");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    const raw = JSON.stringify({
        "messages": [
            {
                "destinations": [{"to":`221${phoneNumber}`}],
                "from": "GP-WORLD",
                "text": message
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

function addProductToCargo(c: Cargo) {
    let isValid: boolean = true;
    let userSender: User | undefined;
    let userReceiver: User | undefined;
    let totalPrice: number = 0;
    let productWeight: number = 0;
    let phoneInputSender: string = '';
    let phoneInputReceiver: string = '';

    const chimicalOption = newProductType.options[1];
    if(c.type === 'ROAD' || c.type === 'AIR'){
        chimicalOption.disabled = true;
    }else{
        chimicalOption.disabled = false;
    }

    materialElement.innerHTML = '';
    toxicity.innerHTML = "";
    divProductWeight.innerHTML = '';
    if(String(c.maxWeight) != 'null'){
        divProductWeight.innerHTML = `
            <label class="border border-gray-300 rounded-xl flex items-center p-2.5 mt-5">
                <span style="width: 170px">Poids du colis:</span>
                <input type="text" name="weight" id="weight" class="w-full outline-none border border-gray-300 rounded-lg py-1 pl-1">
            </label>
            <div class="pl-2.5 text-red-600 hidden" id="err-product-weight"></div>
        `;
    }else{
        productWeight = 1;
    }

    productType.parentNode?.replaceChild(newProductType, productType);
    let typeOfProduct: string = '';
    newProductType.addEventListener('change', (e: any) =>{
        typeOfProduct = e.target.value;
        toxicity.innerHTML = "";
        if(typeOfProduct === 'CHIMICAL'){
            toxicity.innerHTML = `
                <label class="border border-gray-300 rounded-xl flex items-center p-2.5 mt-5">
                    <span class="w-64">Dégré de toxicité:</span>
                    <input type="text" name="toxicity" id="toxicity" class="w-full outline-none border border-gray-300 rounded-lg py-1 pl-1">
                </label>
                <div class="pl-2.5 text-red-600 hidden" id="err-leaving-date">error</div>
            `
        }

        
        materialElement.innerHTML = '';
        if(typeOfProduct === 'MATERIAL'){
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
            productMaterialType = (document.getElementById('product-material-type') as HTMLSelectElement);
        }

        if(c.type === 'MARITIME' && typeOfProduct === 'MATERIAL'){
            (document.getElementById('fragile')as HTMLOptionElement).disabled = true;
        }

        document.getElementById("search-sender")?.addEventListener("input", (event: any) => {
            phoneInputSender = event.target.value.trim();
            senderInfoDiv.innerHTML = ''; // Clear previous content
            if (phoneInputSender) {
                userSender = users.find(u => u.telephone === phoneInputSender);
                if (userSender !== undefined && userSender.type === "sender") {
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
                } else {
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

        const samePhoneNumberErrorMessage: HTMLDivElement = (document.querySelector("#err-same-number") as HTMLDivElement);
        document.getElementById("search-receiver")?.addEventListener("input", (event: any) => {
            phoneInputReceiver = event.target.value.trim();
            
            if(phoneInputSender === phoneInputReceiver){
                samePhoneNumberErrorMessage.classList.remove("hidden");
                isValid = false;
            }else{
                samePhoneNumberErrorMessage.classList.add("hidden");
                isValid = true;
            }
            receiverInfoDiv.innerHTML = ''; // Clear previous content
            
            if (phoneInputReceiver) {
                userReceiver = users.find(u => u.telephone === phoneInputReceiver);
                
                if (userReceiver !== undefined && userReceiver.type === "receiver") {
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
                } else {
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

    if(String(c.maxWeight) != 'null'){
        productWeightInputField = (document.getElementById('weight')as HTMLInputElement);
        productWeightInputField.addEventListener('input', (e: any) =>{
            productWeight = Number(e.target.value);
            totalPrice = calculatePriceOfProduct(c.type, typeOfProduct, productWeight, c.distance);
            if(totalPrice < 10000){
                totalPrice = 10000;
            }
            (document.querySelector("#total-price-product")as HTMLInputElement).value = String(totalPrice);
        });
    }

    totalPrice = calculatePriceOfProduct(c.type, typeOfProduct, productWeight, c.distance);
    if(totalPrice < 10000){
        totalPrice = 10000;
    }
    (document.querySelector("#total-price-product")as HTMLInputElement).value = String(totalPrice);
    

    formProduct.addEventListener("submit", (e) =>{
        e.preventDefault();

        isValid = isValidFieldProduct();

        //Les infors du client
        let sender = null;
        if(phoneInputSender){
            const senderFirstname = (document.getElementById("sender-firstname") as HTMLInputElement).value.trim();
            const senderLastname = (document.getElementById("sender-lastname") as HTMLInputElement).value.trim();
            const senderEmail = (document.getElementById("sender-email") as HTMLInputElement).value.trim();
            const senderAddress = (document.getElementById("sender-address") as HTMLInputElement).value.trim();
            const senderPhone = (document.getElementById("sender-phone") as HTMLInputElement).value.trim();
            isValid = validateFieldSenderAndReceiver(senderFirstname, senderLastname, senderEmail, senderAddress, senderPhone, "sender");
            if(isValid){
                sender = new Sender(3, senderFirstname, senderLastname, senderEmail, senderAddress, senderPhone, "sender");
            }
        }
        

        //Les infos du recepteur
        let receiver = null;
        if(phoneInputReceiver){
            const receiverFirstname = (document.getElementById("receiver-firstname") as HTMLInputElement).value.trim();
            const receiverLastname = (document.getElementById("receiver-lastname") as HTMLInputElement).value.trim();
            const receiverEmail = (document.getElementById("receiver-email") as HTMLInputElement).value.trim();
            const receiverAddress = (document.getElementById("receiver-address") as HTMLInputElement).value.trim();
            const receiverPhone = (document.getElementById("receiver-phone") as HTMLInputElement).value.trim();
            isValid = validateFieldSenderAndReceiver(receiverFirstname, receiverLastname, receiverEmail, receiverAddress, receiverPhone, "receiver");
            if(isValid){
                receiver = new Receiver(4, receiverFirstname, receiverLastname, receiverEmail, receiverAddress, receiverPhone, "receiver");
            }
        }

        if(phoneInputSender === '' || phoneInputReceiver === ''){
            errEmptyNumber.classList.remove('hidden');
            isValid = false;
        }else{
            errEmptyNumber.classList.add('hidden');
        }
        
        if(isValid){
            if(!userSender){
                saveUserSender(sender);
            }

            if(!userReceiver){
                saveUserReceiver(receiver);
            }

            let totalAmountCargo: number = Number(c.totalAmount) + totalPrice;
            let updatedQuantity: number = 0;
            if(String(c.maxWeight) != 'null'){
                const weight = (document.getElementById('weight')as HTMLInputElement).value.trim();
                updatedQuantity = Number(c.maxWeight) - Number(weight);
            }else{
                updatedQuantity = Number(c.maxNbrProduct) - 1;
            }

            const formData = new FormData(formProduct);
            formData.append("id", (1).toString());
            formData.append("code", "PR00000001");
            formData.append("cargoId", (c.id).toString());
            formData.append("sender", JSON.stringify(sender));
            formData.append("receiver", JSON.stringify(receiver));
            formData.append("totalPrice", totalPrice.toString());
            formData.append("totalAmount", totalAmountCargo.toString());
            formData.append("updatedQuantity", updatedQuantity.toString());
            if(typeOfProduct !== 'CHIMICAL'){
                formData.append("toxicity", 'null')
            }

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
                            console.log(phoneInputReceiver);
                            sendSMS(phoneInputReceiver, `Le produit ${formData.get('code')}, est enregistre a votre destination`);
                            const myModal = (document.getElementById('my_modal_5') as HTMLDialogElement);
                            myModal.close();
                            Swal.fire({
                                title: "Succès",
                                text: "Produit ajouté avec succès à la cargaison",
                                icon: "success",
                                timer: 4000,
                                showConfirmButton: false,
                                timerProgressBar: true,
                            });
                            clearProductForm();
                            pagination();
                        } else {
                            alert('Erreur lors de l\'ajout du produit dans la cargaison');
                        }  
                    } catch (error) {
                        console.error('JSON parsing error:', error);
                        alert('Erreur de réponse du serveur. Veuillez réessayer plus tard.');
                    }
                }).catch(error => console.error('Erreur:', error));
        }
        
    });
}

function isValidFieldProduct(): boolean{
    let isValid: boolean = true;
    if(productMaterialType !== undefined){
        const errMsgProductMaterialType = (document.getElementById('err-product-material-type')as HTMLDivElement);
        if(productMaterialType.value === '0'){
            errMsgProductMaterialType.classList.remove('hidden');
            isValid = false;
        }else{
            errMsgProductMaterialType.classList.add('hidden');
        }
    }
    if(newProductType.value === '0'){
        isValid = false;
        errMsgProductType.classList.remove('hidden');
    }else{
        errMsgProductType.classList.add('hidden');
    }
    if(divProductWeight.innerHTML !== ''){
        const errMsgProductWeight = (document.getElementById('err-product-weight') as HTMLDivElement);
        errMsgProductWeight.innerHTML = '';
        if(productWeightInputField.value.trim() === ''){
            errMsgProductWeight.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>&nbsp;Ce champ est obligatoire';
            errMsgProductWeight.classList.remove('hidden');
            isValid = false;
        }else if(Number(productWeightInputField.value.trim()) <= 0){
            errMsgProductWeight.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>&nbsp;Le poids minimum d\'un colis est de 1KG';
            errMsgProductWeight.classList.remove('hidden');
            isValid = false;
        }else{
            errMsgProductWeight.classList.add('hidden');
        }
    }
    return isValid;
}

function validateFieldSenderAndReceiver(firstname: string, lastname: string, email: string, address: string, phoneNumber: string, userType: string): boolean{
    let isValid: boolean = true;
    if(userType === 'sender'){
        const errMsgSenderFirstname = document.getElementById('err-sender-firstname');
        const errMsgSenderLastname = document.getElementById('err-sender-lastname');
        const errMsgSenderEmail = document.getElementById('err-sender-email');
        const errMsgSenderAddress = document.getElementById('err-sender-address');
        const errMsgSenderTelephone = document.getElementById('err-sender-phone');
        if(firstname === ""){
            errMsgSenderFirstname?.classList.remove('hidden');
            isValid = false;
        }else{
            errMsgSenderFirstname?.classList.add('hidden');
        }
        
        if(lastname === ""){
            errMsgSenderLastname?.classList.remove('hidden');
            isValid = false;
        }else{
            errMsgSenderLastname?.classList.add('hidden');
        }
        
        if(email === ""){
            errMsgSenderEmail?.classList.remove('hidden');
            isValid = false;
        }else{
            errMsgSenderEmail?.classList.add('hidden');
        }

        if(address === ""){
            errMsgSenderAddress?.classList.remove('hidden');
            isValid = false;
        }else{
            errMsgSenderAddress?.classList.add('hidden');
        }
        
        if(phoneNumber === ""){
            errMsgSenderTelephone?.classList.remove('hidden');
            isValid = false;
        }else{
            errMsgSenderTelephone?.classList.add('hidden');
        }
    }

    if(userType === 'receiver'){
        const errMsgReceiverFirstname = document.getElementById('err-receiver-firstname');
        const errMsgReceiverLastname = document.getElementById('err-receiver-lastname');
        const errMsgReceiverEmail = document.getElementById('err-receiver-email');
        const errMsgReceiverAddress = document.getElementById('err-receiver-address');
        const errMsgReceiverTelephone = document.getElementById('err-receiver-phone');
        if(firstname === ""){
            errMsgReceiverFirstname?.classList.remove('hidden');
            isValid = false;
        }else{
            errMsgReceiverFirstname?.classList.add('hidden');
        }
        
        if(lastname === ""){
            errMsgReceiverLastname?.classList.remove('hidden');
            isValid = false;
        }else{
            errMsgReceiverLastname?.classList.add('hidden');
        }
        
        if(email === ""){
            errMsgReceiverEmail?.classList.remove('hidden');
            isValid = false;
        }else{
            errMsgReceiverEmail?.classList.add('hidden');
        }

        if(address === ""){
            errMsgReceiverAddress?.classList.remove('hidden');
            isValid = false;
        }else{
            errMsgReceiverAddress?.classList.add('hidden');
        }
        
        if(phoneNumber === ""){
            errMsgReceiverTelephone?.classList.remove('hidden');
            isValid = false;
        }else{
            errMsgReceiverTelephone?.classList.add('hidden');
        }
    }

    return isValid;
}

btnCloseProduct.addEventListener('click', () => {
    clearProductForm();
});

btnCancelProduct.addEventListener('click', () =>{
    clearProductForm();
    (document.getElementById('my_modal_5') as HTMLDialogElement).close();
});

function clearProductForm(){
    formProduct.reset();
    errMsgProductType.classList.add('hidden');
    senderInfoDiv.innerHTML = '';
    receiverInfoDiv.innerHTML = '';
}


function calculatePriceOfProduct(cargaisonType: string, productType: string, genericQuantity: number, cargoDistance: number): number{
    if(cargaisonType === 'ROAD' && productType === 'ALIMENTARY'){
        return 100 * genericQuantity * cargoDistance;
    }else if(cargaisonType === 'ROAD' && productType === 'MATERIAL'){
        return 100 * genericQuantity * cargoDistance;
    }else if(cargaisonType === 'MARITIME' && productType === 'ALIMENTARY'){
        return 90 * genericQuantity * cargoDistance;
    }else if(cargaisonType === 'MARITIME' && productType === 'CHIMICAL'){
        return 500 * genericQuantity * cargoDistance;
    }else if(cargaisonType === 'MARITIME' && productType === 'MATERIAL'){
        return 400 * genericQuantity * cargoDistance;
    }else if(cargaisonType === 'AIR' && productType === 'ALIMENTARY'){
        return 300 * genericQuantity * cargoDistance;
    }else if(cargaisonType === 'AIR' && productType === 'MATERIAL'){
        return 1000 * genericQuantity;
    }
    return 0;
}

function saveUserSender(sender: Sender | null){
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
        if(jsonData.status === "success") console.log("J'ajoute le sender"); //alert(jsonData.message);
        else alert('Erreur lors de l\'ajout de l\'expéditeur');
    }).catch(error => console.error('Erreur:', error));

}

function saveUserReceiver(receiver: Receiver | null){
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
        if(jsonData.status === "success") console.log("J'ajoute le receiver") //alert(jsonData.message);
        else alert('Erreur lors de l\'ajout du destinataire');
    }).catch(error => console.error('Erreur:', error));
}

// document.getElementById("product-close-top")?.addEventListener("click", () =>{
//     (document.getElementById('product-material-type') as HTMLSelectElement).value = "0";
// })

let users: User[] = [];
function getAllUsers(){
    fetch('users.json')
    .then(response => response.json())
    .then(data => {
        users = data.users;
    });
}

getAllUsers();

function displayCargo(): void {
    fetch('cargaisons.json')
      .then(response => response.json())
      .then(data => {
        
        cargaisons = data.cargaisons;
        const cargaisonList = document.getElementById('tbody-cargo');
        if (!cargaisonList) return;
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
            <td>${String (cargaison.maxWeight) != 'null' ? cargaison.maxWeight + ' (KG)' : cargaison.maxNbrProduct}</td>
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

