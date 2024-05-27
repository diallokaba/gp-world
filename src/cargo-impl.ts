import { Cargo } from "./model/cargo";

const byWeight: any = document.querySelector("#byWeight");
const byProduct: any = document.querySelector("#byProduct");
const quantity: any = document.querySelector("#quantity");
const cargoType: any = document.querySelector("#cargo-type");
const leavingDate: any = document.querySelector("#leavingDate");
const arrivedDate: any = document.querySelector("#arrivedDate");
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
    if(leavingDate.value.trim() === ''){
        errLeavingDate?.classList.remove('hidden');
        errLeavingDate?.classList.add('visible');
        errLeavingDate.innerText = 'La date de départ est obligatoire';
        isValid = false;
    }else{
        errLeavingDate?.classList.add('hidden');
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
        formData.append('reference', 'CR001');
        if(byWeight.checked){
            formData.append('maxWeight', weightMax.value.toString());
        }else{
            formData.append('maxNbrProduct', productMax.value.toString());
        }
        formData.append('totalAmount',  (0).toString());
        //formData.append('totalAmount',  distance.value.toString());
        // formData.append('lieu_depart', lieu_depart);
        // formData.append('lieu_arrivee', lieu_arrivee);
        // formData.append('distance_km', distance_km.toString());
        formData.append('type', cargoType.value.toString());
        formData.append('globalState', 'OPEN');
        formData.append('progressionState', 'PENDING');

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
                displayCargo();
                // const modal = document.getElementById('modal');
                // if (modal) modal.classList.add('hidden');
              } else {
                alert('Erreur lors de l\'ajout de la cargaison');
              }
            })
            .catch(error => console.error('Erreur:', error));
    }
})

function displayCargo(): void {
    fetch('cargaisons.json')
      .then(response => response.json())
      .then(data => {
        
        const cargaisons: Cargo[] = data.cargaisons;
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
                                src="https://www.inc-conso.fr/sites/default/files/avion-800_1.png"
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
            <td >${cargaison.maxWeight ? cargaison.maxWeight + 'KG' : cargaison.maxNbrProduct}</td>
            <td >${cargaison.totalAmount}</td>
            <td>${cargaison.distance + 'KM'}</td>
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

