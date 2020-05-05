const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let userId = urlParams.get('id');

$(document).ready(initAlias);

function formNewConv(formulaire) {

    return false;
}

function setColor() {
    $('#color').removeClass();
    $('#color').addClass($('#color').value);
}

function initAlias() {
    $.get(`getPseudo?id=${userId}`,(pseudo)=>{$('#iden').innerText = `Vous êtes connecté en tant que ${pseudo}.`;});
}