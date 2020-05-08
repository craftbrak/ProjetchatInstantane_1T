$(document).ready(() => {
    $('#logo').click(() => {
        window.location = "./index.html"
    })
    /*const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let userId = urlParams.get('id');
    $('#modif').href = `./modificationProfil.html?id=${userId}`;
    $.get(`getPseudo?id=${userId}`, (p) => { $('#iden').append(`Vous êtes connecté en tant que ${p}.`); });*/
})
function alerteDeconnecte() {
    alert("Vous êtes deconnecté. Veuillez vous connecter pour accéder au chat.");
    window.location = "./index.html"
}