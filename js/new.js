const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let userId = urlParams.get('id');

$(document).ready(initAlias);

function formNewConv(formulaire) {

    return false;
}

function setColor() {
    document.getElementById('color').removeClass();
    document.getElementById('color').addClass($('#color').value);
}

function initAlias() {
    $.get(`getPseudo?id=${userId}`,(pseudo)=>{document.getElementById('iden').innerText = `Vous êtes connecté en tant que ${pseudo}.`;});
}