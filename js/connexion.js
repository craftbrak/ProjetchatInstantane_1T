//HTML Chargé - Lance initPage()
document.addEventListener('DOMContentLoaded', initPage);

//Reprends le form et lance soumettreForm() quand on clique sur le bouton -> submit
function initPage() {
    let formulaire = document.getElementById("formulaireConnexion");
    formulaire.addEventListener("submit", soumettreForm);
}

//Bloque le initPage(), reprends les infos du form et lance envoyerEmail() avec ces infos
function soumettreForm(event) {
    event.preventDefault();
    let informations = this;
    envoyerEmail(informations.idEmail.value, informations.motPasse.value);
}

//Crée un XHR (connexion), envoie une requête get au serveur pour vérifier si l'email existe et si il existe, le serveur renvoie le bon mdp qui est comparé à celui du form - Si c'est correct il renvoie sur la page play avec l'id correspondant
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
                $.get(`./userToGeneral?id=${JSON.parse(connexion.response)[0].idUser}`,(id) => {window.location = `./play.html?id=${id}`});
            }
            else{
                document.getElementById("erreur").innerText = "Email ou mot de passe éronné! Réessayez.";
            }
        };
    connexion.send();
}

//Baptiste