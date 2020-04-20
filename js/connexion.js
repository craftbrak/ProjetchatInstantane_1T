document.addEventListener('DOMContentLoaded', initPage);

function initPage() {
    let formulaire = document.getElementById("formulaireConnexion");
    formulaire.addEventListener("submit", soumettreForm);
}


function soumettreForm(event) {
    event.preventDefault();
    let informations = this;
    envoyerEmail(informations.idEmail.value, informations.motPasse.value);
}


function envoyerEmail(emailVerif, mdpVerif) {
    let connexion = new XMLHttpRequest();
    connexion.open('get', 'connexion?email=' + emailVerif, true);
    connexion.onload =
        function testMdp() {
            let mdp = JSON.parse(connexion.response);
            console.log(mdp);
            
            
        };
    connexion.send();
}

