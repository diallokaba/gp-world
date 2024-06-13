const form = document.getElementById("form-suivi-colis");
const textColis = document.getElementById("err-search-colis-date");
const code = document.querySelector("#code");
const resultDiv = document.getElementById("result");
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const valSearch = code.value.trim();
    let isValid = true;
    if (valSearch === '') {
        textColis.classList.remove('hidden');
        isValid = false;
        resultDiv.innerHTML = '';
    }
    else {
        textColis.classList.add('hidden');
    }
    if (isValid) {
        const product = searchProduct(valSearch);
        if (product) {
            displayProductInfo(product);
            code.value = '';
        }
        else {
            displayErrorMessage(valSearch);
            code.value = '';
        }
    }
});
function displayErrorMessage(code) {
    resultDiv.innerHTML = '';
    resultDiv.innerHTML = `
        <div style="width: 30%" class="bg-white p-3 shadow-md shadow-blue-200">
            <div class="text-red-600 text-center">
                <i class="fa-solid fa-triangle-exclamation"></i>&nbsp;Le produit avec le code "<strong>${code}</strong>" n'existe pas.
            </div>
        </div>
    `;
}
function searchProduct(code) {
    for (const cargo of cargos) {
        if (cargo.products) {
            for (const product of cargo.products) {
                if (product.code === code) {
                    return product;
                }
            }
        }
    }
    return undefined;
}
function displayProductInfo(product) {
    resultDiv.innerHTML = '';
    resultDiv.innerHTML = `
        <div style="width: 30%" class="bg-white p-3 shadow-md shadow-blue-200">
            <div class="flex justify-between mb-3">
                <p>Code Produit</p>
                <strong>${product.code}</strong>
            </div>
            <div class="flex justify-between items-center mb-3">
                <p>Etat</p>
                <p class="p-2 rounded-lg ${getStateColor(product.state)}">${getStateName(product.state)}</p>
            </div>
            <div class="flex justify-between mb-3">
                <p>Type de produit</p>
                <p>${product.type === 'ALIMENTARY' ? 'ALIMENTAIRE' : product.type === 'MATERIAL' ? 'MATERIEL' : 'CHIMIQUE'}</p>
            </div>
            <div class="flex justify-between">
                <p>Prix total</p>
                <strong>${product.totalPrice}</strong>
            </div>
        </div>
    `;
}
function getStateColor(state) {
    switch (state) {
        case 'PENDING':
            return 'bg-gray-300';
        case 'IN_PROGRESS':
            return 'bg-yellow-300';
        case 'ARRIVED':
            return 'bg-blue-300';
        case 'RETRIEVED':
            return 'bg-green-300';
        case 'LOST':
            return 'bg-danger text-white';
        case 'ARCHIVED':
            return 'bg-gray-800 text-white';
        default:
            return '';
    }
}
function getStateName(state) {
    switch (state) {
        case 'PENDING':
            return 'En attente';
        case 'IN_PROGRESS':
            return 'Encours';
        case 'ARRIVED':
            return 'Arrivé';
        case 'RETRIEVED':
            return 'Récupéré';
        case 'LOST':
            return 'Perdu';
        case 'ARCHIVED':
            return 'Archivé';
        default:
            return '';
    }
}
let cargos;
function getAllCargo() {
    fetch('api.php?action=getCargaison', {
        method: 'GET',
    }).then(response => response.text())
        .then(data => {
        const jsonData = JSON.parse(data);
        cargos = jsonData.data.cargaisons;
    });
}
getAllCargo();
export {};
