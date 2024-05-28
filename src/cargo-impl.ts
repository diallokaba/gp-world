import { Cargo } from "./model/cargo";

const byWeight: any = document.querySelector("#byWeight");
const byProduct: any = document.querySelector("#byProduct");
const quantity: any = document.querySelector("#quantity");
const cargoType: any = document.querySelector("#cargo-type");
const leavingDate: any = document.querySelector("#leavingDate");
const arrivedDate: any = document.querySelector("#arrivedDate");
const departurePoint: any = document.querySelector("#departurePoint");
const arrivalPoint: any = document.querySelector("#arrivalPoint");
const distance: any = document.querySelector("#distance");
const form = document.querySelector("#add-cargo");
const radioChoice: any = document.getElementById("radio-choice");

byWeight?.addEventListener('click', () =>{
    if(byWeight.checked === true){
        radioChoice.classList.add('hidden');
        quantity.innerHTML = '';
        quantity.innerHTML = 
        `<label class="border border-gray-300 rounded-xl flex items-center p-2.5 mt-5">
            <span class="w-36">Poids Max:</span>
            <input id="weightMax" name="weightMax" type="number" class="grow border border-gray-300 rounded-lg py-1 px-2 outline-none" placeholder="Entrer le poids maximum en KG que peut contenir cette cargaison" />
        </label>
        <div class="pl-2.5 text-red-600 hidden" id="weight-max-err">error</div>
        `
    }
});

byProduct?.addEventListener('click', () =>{
    if(byProduct.checked === true){
        radioChoice.classList.add('hidden');
        quantity.innerHTML = '';
        quantity.innerHTML = 
        `<label class="border border-gray-300 rounded-xl flex items-center p-2.5 mt-5">
            <span class="w-36">Produit Max:</span>
            <input id="productMax" name="productMax" type="number" class="grow border border-gray-300 rounded-lg py-1 px-2 outline-none" placeholder="Entrer le nombre de produit maximum que pourra contenir cette cargaison" />
        </label>
        <div class="pl-2.5 text-red-600 hidden" id="nbr-product-err">error</div>
        `
    }
});


form?.addEventListener('submit', (e) =>{
    e.preventDefault();

    let isValid: boolean = true;

    const weightMax: any = document.querySelector("#weightMax");
    const productMax: any = document.querySelector("#productMax");

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

    if(isValid){
        const formData = new FormData();
        formData.append('action', 'addCargaison');
        let newId: number = 1;
        if(cargaisons.length > 0){
            const lastCargo = cargaisons[cargaisons.length - 1];
            newId = Number(lastCargo.id) +1;
        }
        formData.append("id", newId.toString());
        formData.append("reference", 'CR' + padStart(newId.toString(), 3, '0'));
        if(byWeight.checked){
            formData.append('maxWeight', weightMax.value.toString());
        }else{
            formData.append('maxWeight', 'null');
        }

        if(byProduct.checked){
            formData.append('maxNbrProduct', productMax.value.toString());
        }else{
            formData.append('maxNbrProduct', 'null');
        }

        formData.append('totalAmount',  (0).toString());
        formData.append('distance',  distance.value.toString());
        formData.append('departurePoint', departurePoint.value.trim().toString());
        formData.append('arrivalPoint', arrivalPoint.value.trim().toString());
        formData.append('distance',  distance.value.toString());
        formData.append('leavingDate',  leavingDate.value.toString());
        formData.append('arrivedDate',  arrivedDate.value.toString());
        formData.append('type', cargoType.value.toString());
        formData.append('globalState', 'OPEN');
        formData.append('progressionState', 'PENDING');

        if(cargoType.value.trim() === "AIR"){
            formData.append('image', 'https://www.inc-conso.fr/sites/default/files/avion-800_1.png');
        }else if(cargoType.value.trim() === "MARITIME"){
            formData.append('image', 'https://www.trade-easy.fr/wp-content/uploads/2022/06/Cout-fret-maritime-TRADE.EASY_.png');
        }else{
            formData.append('image', 'https://miro.medium.com/v2/resize:fit:772/1*73RG4jdNMfewnPLP73KVPw.png');
        }

        console.log(formData);

        fetch('api.php', {
            method: 'POST',
            body: formData
          })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                const jsonData = JSON.parse(data);
              if (jsonData.status === "success") {
                alert(jsonData.message);
                //displayCargo();
                window.location.reload();
                // const modal = document.getElementById('modal');
                // if (modal) modal.classList.add('hidden');
              } else {
                alert('Erreur lors de l\'ajout de la cargaison');
              }
            })
            .catch(error => console.error('Erreur:', error));
    }
});

let cargaisons: Cargo[] = [];

function displayCargo(): void {
    fetch('cargaisons.json')
      .then(response => response.json())
      .then(data => {
        
        cargaisons = data.cargaisons;
        const cargaisonList = document.getElementById('tbody-cargo');
        if (!cargaisonList) return;
        cargaisonList.innerHTML = '';
        cargaisons.forEach(cargaison => {
            console.log(cargaison);
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

  displayCargo();

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

