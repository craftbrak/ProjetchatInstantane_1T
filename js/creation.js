document.addEventListener('DOMContentLoaded', initpage);

function initPage() {
    let formulaire = document.getElementById("formulaireConnexion");
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
    }
    else {
        let newId = Math.round(Math.random()*10000)
        let xmlId = new XMLHttpRequest();
        let idTest;
        xmlId.open("get", "verifId?id=" + newId);
        xmlId.onload =
            idTest = JSON.parse(xmlId.response)[0].email;
        xmlId.send;

        while(idTest != undefined){
            newId = Math.round(Math.random()*10000);
            xmlId.open("get", "verifId?id=" + newId);
            xmlId.onload =
                idTest = JSON.parse(xmlId.response)[0].email;
            xmlId.send;
        }

        let creation = new XMLHttpRequest();
        creation.open("get", "creation?newId=" + newId + "&newEmail=" + email + "&newNom=" + nom + "&newPrenom=" + prenom + "&newPseudo=" + pseudo + "&newMdpUser=" + mdp);
        creation.onload =
            window.location = "http://craftbrakddns.myddns.me:536/play.html?id=" + newId; 
        creation.send;
    }
}

