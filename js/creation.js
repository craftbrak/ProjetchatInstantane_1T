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
        let creation = new XMLHttpRequest();
        creation.open('get', 'creation?newId=' + newId + '&newEmail=' + email + '&newNom=' + nom + '&newPrenom=' + prenom + '&newPseudo=' + pseudo + '&newMdpUser=' + mdp, true);
        creation.onload =
            window.location = "http://craftbrakddns.myddns.me:536/creation?newEmail=" + email + "&newNom=" + nom + "&newPrenom=" + prenom + "&newPseudo=" + pseudo + "&newMdpUser=" + mdp;
        window.location = "http://craftbrakddns.myddns.me:536/play.html?id=" + newId;
        creation.send;
    }
}

//baptiste
//Il faut encore vérif si pas 2x même email et pseudo