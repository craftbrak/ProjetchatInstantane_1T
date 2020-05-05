const couleurs = ['gris','rose','jaune','orange','rouge','vert','bleu','violet'];
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let userId = urlParams.get('id');

$(document).ready(initNew);

function formNewConv(formulaire) {

    return false;
}

function setColor() {
    couleurs.forEach(couleur => {
        document.getElementById('color').classList.remove(couleur)
    });
    document.getElementById('color').classList.add(document.getElementById('color').value);
}

function initNew() {
    $.get(`getPseudo?id=${userId}`,(pseudo)=>{document.getElementById('iden').innerText = `Vous êtes connecté en tant que ${pseudo}.`;});
}