// Au chargement de la page, lance initPage()
document.addEventListener('DOMContentLoaded', initPage);

/**
 * Quand le formulaire est soumis, il envoie ses données à la fonction soumettreForm()
 * @author Baptiste Bemelmans
 */
function initPage() {
    let formulaire = document.getElementById("formulaireConnexion");
    formulaire.addEventListener("submit", soumettreForm);
}

/**
 * Renvoie les données du formulaire à la fonction envoyerEmail()
 * @param {*} event - Informations du formulaire
 * @author Baptiste Bemelmans
 */
function soumettreForm(event) {
    event.preventDefault();
    let informations = this;
    envoyerEmail(informations.idEmail.value, informations.motPasse.value);
}

/**
 * Si l'email existe, compare les mots de passe et redirige vers le général après avoir récupérer l'id et l'id du général
 * @param {string} emailVerif - Email de l'utilisateur
 * @param {string} mdpVerif - Mot de passe de l'utilisateur
 * @author Baptiste Bemelmans
 */
//Crée un XHR (connexion), envoie une requête get au serveur pour vérifier si l'email existe et si il existe, le serveur renvoie le bon mdp qui est comparé à celui du form - Si c'est correct il renvoie sur la page play avec l'id correspondant
function envoyerEmail(emailVerif, mdpVerif) {
    let connexion = new XMLHttpRequest();
    connexion.open('get', './connexion?emailVerif=' + emailVerif, true);
    connexion.onload =
        function testMdp() {
            let mdp;
            if (JSON.parse(connexion.response)[0] != undefined) {
                mdp = JSON.parse(connexion.response)[0].mdp;
            } else {
                document.getElementById("erreur").innerText = "Email ou mot de passe éronné! Réessayez.";
            }
            if (mdp == mdpVerif) {
                $.get(`./userToGeneral?id=${JSON.parse(connexion.response)[0].idUser}`, (id) => { window.location = `./play.html?id=${id}` });  
            } else {
                document.getElementById("erreur").innerText = "Email ou mot de passe éronné! Réessayez.";
            }
        };
    connexion.send();
}

/**
* JS:
* function() {
*   let redirect = new XMLHttpRequest();
*   redirect.open('get', './userToGeneral?id=' + JSON.parse(connexion.response)[0].idUser, true);
*   redirect.onload =
*       function() {
*           idConv = redirect.response;
*           window.location = "./play.html?id=" + idConv;
*       };
*   redirect.send();
*};
*/