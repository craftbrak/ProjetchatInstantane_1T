const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let idUser = 0;
idUser = urlParams.get('id');

function initialiserFormulaire() {
    let xhr = new XMLHttpRequest();
    xhr.open("get", "http://craftbrakddns.myddns.me:536/modification?idChoisi=" + idUser + "", true);
    xhr.onload = remplirFormulaire;
    xhr.send();
}

function remplirFormulaire() {
    let reponse = JSON.parse(this.responseText);
    console.log(reponse);
    console.log(reponse[0].idUser);


    document.getElementById("formulaire").innerHTML += "<input id='name' name='name' type='text' placeholder='Nom'" + 'class="fadeIn second"' +
        "value='" + reponse[0].nom + "'>";

    document.getElementById("formulaire").innerHTML += "<input id='surname' name='surname' type='text'placeholder='prenom' " + 'class="fadeIn second"' +
        "value='" + reponse[0].prenom + "'>";

    document.getElementById("formulaire").innerHTML += "<input id='mdpUser' name='mdpUser' type='password'placeholder='mot de passe' " + 'class="fadeIn second"' +
        "value='" + reponse[0].mdpUser + "'>";


    document.getElementById("formulaire").innerHTML += "<input id='nvMdp' name='nvMdp' type='password' placeholder='verification mot de passe'" + 'class="fadeIn third"' +

        "value='" + reponse[0].mdpUser + "'>";

    document.getElementById("formulaire").innerHTML += "<input id='mail' name='mail' type='text' placeholder='email'" + 'class="fadeIn third"' +
        "value='" + reponse[0].mail + "'>";

    document.getElementById("formulaire").innerHTML += "<input id='pseudo' name='pseudo' type='text' placeholder='pseudo'" + 'class="fadeIn third"' +
        "value='" + reponse[0].pseudo + "'>";
    document.getElementById("formulaire").innerHTML += `<input type="submit" name="enregistrer" id="enregistrer" value="Enregistrer" class="fadeIn fourth">`;

}

function enregistrerModifs() {
    let nvNom = document.getElementById("name").value;
    let nvPrenom = document.getElementById("surname").value;
    let nvMdp = document.getElementById("mdpUser").value;
    let nvMdpConfirme = document.getElementById("nvMdp").value;
    let nvMail = document.getElementById("mail").value;
    let nvPseudo = document.getElementById("pseudo").value;
    let xhr = new XMLHttpRequest();
    xhr.open("get", "http://craftbrakddns.myddns.me:536/mettreAJour?idUtilisateur=" + idUser + "&nvNom=" + nvNom + "&nvPrenom=" + nvPrenom + "&nvMdp=" + nvMdp + "&nvMail=" + nvMail + "&nvPseudo=" + nvPseudo);
    if (test(nvMdp, nvMdpConfirme)) {
        document.getElementById("erreur").innerHTML = "";
        alert("Modifcations Enregistrées avec succès !");
        console.log("ca passe");
        $.get(`./userToGeneral?id=${idUser}`, (id) => { window.location = `./play.html?id=${id}` });
        xhr.send();
        return false;
    } else {
        document.getElementById("erreur").innerHTML = "Mot de passe erroné, veuillez entrer deux fois le même nouveau mot de passe !";
        return false;
    }
}

function test(a, b) {
    if (a === b) {
        return true;
    } else {
        return false;
    }
}

//Arthur