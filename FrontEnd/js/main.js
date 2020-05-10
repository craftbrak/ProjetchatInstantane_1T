/**
 * Ajoute l'evenement et son traitement au logo de la page 
 * @author François Girondin
 */
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
    /**
     * affiche une erreur quand l'utilisateur est deconecter
     * @author François Girondin
     */
function alerteDeconnecte() {
    alert("Vous êtes deconnecté. Veuillez vous connecter pour accéder au chat.");
    window.location = "./index.html"
}