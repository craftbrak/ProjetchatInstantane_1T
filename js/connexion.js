document.addEventListener('DOMContentLoaded', initPage);

function initPage() {
    let formulaire = document.getElementById("formulaireConnexion");
    formulaire.addEventListener("submit", soumettreForm);
}


function soumettreForm(event) {
    console.log(event);
    event.preventDefault();
    let informations = this;
    envoyerEmail(informations.idEmail.value, informations.motPasse.value);
}


function envoyerEmail(emailVerif, mdpVerif) {
    let connexion = new XMLHttpRequest();
    connexion.open('get', 'connexion?emailVerif=' + emailVerif, true);
    connexion.onload =
        function testMdp() {
            let mdp = JSON.parse(connexion.response)[0].mdp;
            if (mdp == mdpVerif) {
                //crée objet et décale sur un autre site
            }
            else {
                document.getElementById("erreur").innerText = "Email ou mot de passe éronné! Réessayez.";
            }
        };
    connexion.send();
}

