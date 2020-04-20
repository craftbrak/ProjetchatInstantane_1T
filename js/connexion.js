document.addEventListener('DOMContentLoaded', initPage);

function initPage() {
    let formulaire = document.getElementById("formulaireConnexion");
    formulaire.addEventListener("submit", soumettreForm);
}


function soumettreForm(event) {
    event.preventDefault();
    let informations = this;
    envoyerEmail(informations.idEmail.value);
}


function envoyerForm(email, mdp) {
    let connexion = new XMLHttpRequest();
    connexion.open('get', 'envoiMdp?email=' + email, true);
    connexion.onload =
        function testMdp() {
            let mdp = JSON.parse(connexion.response);
            console.log(mdp);
            
            document.getElementById("boxResponse").innerHTML = "";
        };
    connexion.send();
}

//craftbrakddns.myddns.me:26380/identifiant
//idUser