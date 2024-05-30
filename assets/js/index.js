

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


const remainID = {
    "depense": [],
    "recette": [],
    "epargne": []
}

function sendInput(name, selfId, idParents, suffixes, remainArea) {
    remainID[remainArea].push(selfId);
    const parents = document.getElementById(idParents);
    parents.innerHTML += `<span>${name} : <input type="number" name="${selfId}" id="${selfId}" placeholder="juste écrire le nombre"></span>${suffixes}`
}
// Envoie des Input dans la section Fixes de Dépenses
sendInput("<hr>Loyer", "InputLoyer", "fixes", "<br>", "depense")
sendInput("Charges", "InputCharges", "fixes", "<hr>", "depense")
sendInput("Credits", "InputCredits", "fixes", "<hr>", "depense")
sendInput("Eau", "InputEau", "fixes", "<br>", "depense")
sendInput("Gaz", "InputGaz", "fixes", "<br>", "depense")
sendInput("Éléctricité", "InputÉléctricité", "fixes", "<hr>", "depense")
sendInput("Téléphone", "InputTéléphone", "fixes", "<br>", "depense")
sendInput("Internet", "InputInternet", "fixes", "<hr>", "depense")
sendInput("Habitation", "InputAssuranceHabitation", "fixes", "<br>", "depense")
sendInput("Véhicules", "InputAssuranceVéhicules", "fixes", "<hr>", "depense")
sendInput("Mutuelle Santé", "InputMutuelleSante", "fixes", "<hr>", "depense")
sendInput("Frais Garde", "InputFraisGarde", "fixes", "<hr>", "depense")
sendInput("Impôts Revenu", "inputImpotsRevenue", "fixes", "<br>", "depense")
sendInput("Impôts Locaux", "inputImpotsLocaux", "fixes", "<hr>", "depense")
// Envoie des Input dans la section Courantes de Dépenses
sendInput("<hr>Courses", "InputCourses", "courantes", "<hr>", "depense")
sendInput("Essence", "InputEssence", "courantes", "<br>", "depense")
sendInput("Transport", "InputTransport", "courantes", "<hr>", "depense")
// Envoie des Input dans la section Occasionnelles de Dépenses
sendInput("<hr>Sortie", "InputSortie", "occasionnelles", "<hr>", "depense")



sendInput(`<hr>Salaire`, `InputSalaire`, `salaire`, `<hr>`, `recette`)
sendInput(`<hr>Aide`, `InputAide`, `aides`, `<hr>`, `recette`)
sendInput(`<hr>Rente`, `InputRente`, `rentes`, `<hr>`, `recette`)
sendInput(`<hr>Autre`, `InputAutre`, `autres`, `<hr>`, `recette`)

sendInput(`<hr>Champs Libre`, `InputLibre`, `libre`, `<hr>`, `epargne`)


let totalDepense = 0, totalRecettes = 0, totalEpargne = 0;


let depenseLenght = remainID['depense'].length;
let recetteLenght = remainID['recette'].length;
let epargneLenght = remainID['epargne'].length;


const buttonUpdateDepense = document.getElementById('button-update-depense');
const buttonUpdateRecette = document.getElementById('button-update-recette');
const buttonUpdateEpargne = document.getElementById('button-update-epargne');

const areaTotalDepense = document.getElementById('totalDepense');
const areaTotalRecette = document.getElementById('totalRecettes');
const areaTotalEpargne = document.getElementById('totalEpargne');
const areaTotal = document.getElementById('total');


const infoResultArea = document.getElementById('infoResultas');

buttonUpdateDepense.addEventListener('click', function () {
    totalDepense = 0;
    for (let i = 0; i < depenseLenght; i++) {
        const actuallyInput = parseFloat(document.getElementById(remainID['depense'][i]).value || 0);
        totalDepense += actuallyInput;
    }
    areaTotalDepense.textContent = totalDepense + '€';
    areaTotal.textContent = totalDepense + totalRecettes + totalEpargne + '€';
});

buttonUpdateRecette.addEventListener('click', function () {
    totalRecettes = 0;
    for (let i = 0; i < recetteLenght; i++) {
        const actuallyInput = parseFloat(document.getElementById(remainID['recette'][i]).value || 0);
        totalRecettes += actuallyInput;
    }
    areaTotalRecette.textContent = totalRecettes + '€';
    areaTotal.textContent = totalDepense + totalRecettes + totalEpargne + '€';
});

buttonUpdateEpargne.addEventListener('click', function () {
    totalEpargne = 0;
    for (let i = 0; i < epargneLenght; i++) {
        const actuallyInput = parseFloat(document.getElementById(remainID['epargne'][i]).value || 0);
        totalEpargne += actuallyInput;
    }
    areaTotalEpargne.textContent = totalEpargne + '€';
    areaTotal.textContent = totalDepense + totalRecettes + totalEpargne + '€';
});