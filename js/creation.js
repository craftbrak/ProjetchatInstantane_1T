document.addEventListener('DOMContentLoaded', initPage);

function initPage() {
    let formulaire = document.getElementById("formulaireCreation");
    formulaire.addEventListener("submit", soumettreForm);
}

function soumettreForm(event) {
    event.preventDefault();
    let nouveauCompte = this;
    creerCompte(nouveauCompte.email.value, nouveauCompte.nom.value, nouveauCompte.prenom.value, nouveauCompte.pseudo.value, nouveauCompte.newMotPasse.value, nouveauCompte.newMotPasseVerif.value);
}

function creerCompte(email, nom, prenom, pseudo, mdp, mdpVerif) {
    if (mdp != mdpVerif) {
        document.getElementById("erreurCrea").innerText = "Les deux mots de passe ne correspondent pas.";
    } else {
        let idConv;
        let creation = new XMLHttpRequest();
        creation.open('get', 'creation?newEmail=' + email + '&newNom=' + nom + '&newPrenom=' + prenom + '&newPseudo=' + pseudo + '&newMdpUser=' + mdp, true); //crée le user
        creation.onload =
            function (){
                let getId = new XMLHttpRequest();
                getId.open('get', 'redirectCreation?emailRecherche=' + email, true); //reçoit l'id
                getId.onload = 
                    function (){
                        let idCompte = JSON.parse(getId.response)[0].idUser;
                        let addGeneral = new XMLHttpRequest();
                        addGeneral.open('get', 'addUsersToConv?id=' + idCompte + '&name=Général', true);
                        addGeneral.onload =
                            function (){
                                let redirect = new XMLHttpRequest();
                                redirect.open('get', 'userToGeneral?id=' + idCompte, true); //récupère le convId
                                redirect.onload = 
                                    function (){
                                        idConv = redirect.response;
                                        window.location = "http://craftbrakddns.myddns.me:536/play.html?id=" + idConv;
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

//baptiste
