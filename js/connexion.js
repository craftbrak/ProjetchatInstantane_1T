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
            let mdp = JSON.parse(connexion.response);
            verif = false;
            if (mdp == mdpVerif) {
                console.log("bg");
                verif = true;
            }
            else {
                document.getElementById("erreur").innerText = "Email ou mot de passe éronné! Réessayez.";
            }
        };
    connexion.send();
}

