// Au chargement de la page, lance initPage()
document.addEventListener('DOMContentLoaded', initPage);

/**
 * Quand le formulaire est soumis, il envoie ses données à la fonction soumettreForm()
 * @author Baptiste Bemelmans
 */
function initPage() {
    let formulaire = document.getElementById("formulaireCreation");
    formulaire.addEventListener("submit", soumettreForm);
}

/**
 * Renvoie les données du formulaire à la fonction creerCompte()
 * @param {*} event - Informations du formulaire
 * @author Baptiste Bemelmans 
 */
function soumettreForm(event) {
    event.preventDefault();
    let nouveauCompte = this;
    creerCompte(nouveauCompte.email.value, nouveauCompte.nom.value, nouveauCompte.prenom.value, nouveauCompte.pseudo.value, nouveauCompte.newMotPasse.value, nouveauCompte.newMotPasseVerif.value);
}

/**
 * Test les deux mots de passe. Crée le compte, récupère l'id avec l'id du général correspondant et redirige au général
 * @param {string} email - Email du nouvel utilisateur
 * @param {string} nom - Nom du nouvel utilisateur
 * @param {string} prenom - Prenom du nouvel utilisateur
 * @param {string} pseudo - Pseudo du nouvel utilisateur
 * @param {string} mdp - Mot de passe du nouvel utilisateur
 * @param {string} mdpVerif - Test de vérification du mot de passe
 * @author Baptiste Bemelmans
 */
function creerCompte(email, nom, prenom, pseudo, mdp, mdpVerif) {
    if (mdp != mdpVerif) {
        document.getElementById("erreurCrea").innerText = "Les deux mots de passe ne correspondent pas.";
    } else {
        let idConv;
        let creation = new XMLHttpRequest();
        creation.open('get', './creation?newEmail=' + email + '&newNom=' + nom + '&newPrenom=' + prenom + '&newPseudo=' + pseudo + '&newMdpUser=' + mdp, true); 
        creation.onload =
            function() {
                let getId = new XMLHttpRequest();
                getId.open('get', './redirectCreation?emailRecherche=' + email, true); 
                getId.onload =
                    function() {
                        let idCompte = JSON.parse(getId.response)[0].idUser;
                        let addGeneral = new XMLHttpRequest();
                        addGeneral.open('get', './addUserToConv?id=' + idCompte + '&nom=Général', true);
                        addGeneral.onload =
                            function() {
                                let redirect = new XMLHttpRequest();
                                redirect.open('get', './userToGeneral?id=' + idCompte, true);
                                redirect.onload =
                                    function() {
                                        idConv = redirect.response;
                                        window.location = "./play.html?id=" + idConv;
                                    };
                                redirect.send();
                            };
                        addGeneral.send();
                    };
                getId.send();
            };
        creation.send();
    }
}


