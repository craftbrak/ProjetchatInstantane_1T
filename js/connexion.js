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
    connexion.open('get', 'connexion?emailVerif=' + emailVerif, true);
    connexion.onload =
        function testMdp() {
            let mdp;
            if(JSON.parse(connexion.response)[0] != undefined){
                mdp = JSON.parse(connexion.response)[0].mdp; 
            }
            else{
                document.getElementById("erreur").innerText = "Email ou mot de passe éronné! Réessayez.";
            }
            if (mdp == mdpVerif) {   
                let id = JSON.parse(connexion.response)[0].idUser;
                window.location = "http://craftbrakddns.myddns.me:536/play.html?id=" + id; 
            }
            else{
                document.getElementById("erreur").innerText = "Email ou mot de passe éronné! Réessayez.";
            }
        };
    connexion.send();
}

//Baptiste