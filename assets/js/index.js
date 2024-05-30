// Function to switch between tabs
function openTabs(evt, tabsName, classNameOne, classNameTwo) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName(classNameOne);
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName(classNameTwo);
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabsName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Object to keep track of input field IDs for expenses, income, and savings
const remainID = {
    "depense": [],
    "recette": [],
    "epargne": []
};

// Function to create input fields dynamically
function sendInput(name, selfId, idParents, suffixes, remainArea) {
    remainID[remainArea].push(selfId);
    const parents = document.getElementById(idParents);
    parents.innerHTML += `<span>${name} : <input type="number" name="${selfId}" id="${selfId}" placeholder="Enter amount"></span>${suffixes}`;
}

// Adding input fields for Fixed Expenses
sendInput("<hr>Loyer", "InputRent", "fixed-expenses", "<br>", "depense");
sendInput("Charges", "InputCharges", "fixed-expenses", "<hr>", "depense");
sendInput("Crédits", "InputCredits", "fixed-expenses", "<hr>", "depense");
sendInput("Eau", "InputWater", "fixed-expenses", "<br>", "depense");
sendInput("Gaz", "InputGas", "fixed-expenses", "<br>", "depense");
sendInput("Électricité", "InputElectricity", "fixed-expenses", "<hr>", "depense");
sendInput("Téléphone", "InputPhone", "fixed-expenses", "<br>", "depense");
sendInput("Internet", "InputInternet", "fixed-expenses", "<hr>", "depense");
sendInput("Assurance Habitation", "InputHomeInsurance", "fixed-expenses", "<br>", "depense");
sendInput("Assurance Véhicules", "InputVehicleInsurance", "fixed-expenses", "<hr>", "depense");
sendInput("Mutuelle Santé", "InputHealthInsurance", "fixed-expenses", "<hr>", "depense");
sendInput("Frais de Garde", "InputChildcare", "fixed-expenses", "<hr>", "depense");
sendInput("Impôts sur le Revenu", "InputIncomeTax", "fixed-expenses", "<br>", "depense");
sendInput("Impôts Locaux", "InputLocalTax", "fixed-expenses", "<hr>", "depense");

// Adding input fields for Current Expenses
sendInput("<hr>Courses", "InputGroceries", "current-expenses", "<hr>", "depense");
sendInput("Essence", "InputFuel", "current-expenses", "<br>", "depense");
sendInput("Transport en Commun", "InputPublicTransport", "current-expenses", "<hr>", "depense");

// Adding input fields for Occasional Expenses
sendInput("<hr>Sorties", "InputOutings", "occasional-expenses", "<hr>", "depense");

// Adding input fields for Income
sendInput("<hr>Salaire", "InputSalary", "salary-income", "<hr>", "recette");
sendInput("<hr>Aides", "InputAid", "aids-income", "<hr>", "recette");
sendInput("<hr>Rentes", "InputRents", "rents-income", "<hr>", "recette");
sendInput("<hr>Autres", "InputOthers", "other-income", "<hr>", "recette");

// Adding input fields for Savings
sendInput("<hr>Champs Libre", "InputFreeField", "free-savings", "<hr>", "epargne");

// Variables to store total amounts
let totalDepense = 0, totalRecettes = 0, totalEpargne = 0;

// Length of each category
let depenseLenght = remainID['depense'].length;
let recetteLenght = remainID['recette'].length;
let epargneLenght = remainID['epargne'].length;

// Elements for updating results
const buttonUpdateDepense = document.getElementById('button-update-depense');
const buttonUpdateRecette = document.getElementById('button-update-recette');
const buttonUpdateEpargne = document.getElementById('button-update-epargne');
const resetButton = document.getElementById('reset-button');

const areaTotalDepense = document.getElementById('totalDepense');
const areaTotalRecette = document.getElementById('totalRecettes');
const areaTotalEpargne = document.getElementById('totalEpargne');
const areaTotal = document.getElementById('total');
const alertMessage = document.getElementById('alert-message');

// Function to update expense total
buttonUpdateDepense.addEventListener('click', function () {
    totalDepense = 0;
    for (let i = 0; i < depenseLenght; i++) {
        const actuallyInput = parseFloat(document.getElementById(remainID['depense'][i]).value || 0);
        totalDepense += actuallyInput;
    }
    areaTotalDepense.textContent = totalDepense + '€';
    updateTotal();
});

// Function to update income total
buttonUpdateRecette.addEventListener('click', function () {
    totalRecettes = 0;
    for (let i = 0; i < recetteLenght; i++) {
        const actuallyInput = parseFloat(document.getElementById(remainID['recette'][i]).value || 0);
        totalRecettes += actuallyInput;
    }
    areaTotalRecette.textContent = totalRecettes + '€';
    updateTotal();
});

// Function to update savings total
buttonUpdateEpargne.addEventListener('click', function () {
    totalEpargne = 0;
    for (let i = 0; i < epargneLenght; i++) {
        const actuallyInput = parseFloat(document.getElementById(remainID['epargne'][i]).value || 0);
        totalEpargne += actuallyInput;
    }
    areaTotalEpargne.textContent = totalEpargne + '€';
    updateTotal();
});

// Function to reset all fields and totals
resetButton.addEventListener('click', function () {
    totalDepense = 0;
    totalRecettes = 0;
    totalEpargne = 0;
    areaTotalDepense.textContent = '0€';
    areaTotalRecette.textContent = '0€';
    areaTotalEpargne.textContent = '0€';
    areaTotal.textContent = '0€';
    alertMessage.innerHTML = '';

    // Reset all input fields
    remainID['depense'].forEach(id => document.getElementById(id).value = '');
    remainID['recette'].forEach(id => document.getElementById(id).value = '');
    remainID['epargne'].forEach(id => document.getElementById(id).value = '');
});

// Function to update total budget and display appropriate message
function updateTotal() {
    const total = totalRecettes - totalDepense + totalEpargne;
    areaTotal.textContent = total + '€';
    alertMessage.innerHTML = '';

    // Display alert message based on total
    if (total < 0) {
        alertMessage.innerHTML = '<div class="alert alert-danger fade-in">Budget Négatif</div>';
    } else if (total === 0) {
        alertMessage.innerHTML = '<div class="alert alert-warning fade-in">Budget Neutre</div>';
    } else {
        alertMessage.innerHTML = '<div class="alert alert-success fade-in">Budget Positif. Vous pouvez économiser ou dépenser plus!</div>';
    }
}
