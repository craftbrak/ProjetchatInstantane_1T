const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let idUser = 0;
idUser = urlParams.get('id');


/**
 * @author Arthur schamroth
 *Appel au service Modification lié à la procédure infos qui :
 * - retourne l'id de l'utilisateur,
 * - retourne le nom de l'utilisateur,
 * - retourne le prenom de l'utilisateur,
 * - retourne le mot de passe de l'utilisateur,
 * - retourne l'adresse mail de l'utilisateur,
 * - retourne le pseudo de l'utilisateur.
 */
function initialiserFormulaire() {
    let xhr = new XMLHttpRequest();
    xhr.open("get", "./modification?idChoisi=" + idUser + "", true);
    xhr.onload = remplirFormulaire;
    xhr.send();
}

/**
 * @author Arthur schamroth
 * Remplit le formulaire avec les données chargées précédemment.
 */
function remplirFormulaire() {
    let reponse = JSON.parse(this.responseText)[0];

    let form = document.getElementById('formulaire');

    form.name.value = reponse.nom;
    form.surname.value  = reponse.prenom;
    form.mdpUser.value  =  reponse.mdpUser;
    form.nvMdp.value =  reponse.mdpUser;
    form.mail.value  = reponse.mail;
    form.pseudo.value  =  reponse.pseudo;
}

function enregistrerModifs() {
    let nvNom = document.getElementById("name").value;
    let nvPrenom = document.getElementById("surname").value;
    let nvMdp = document.getElementById("mdpUser").value;
    let nvMdpConfirme = document.getElementById("nvMdp").value;
    let nvMail = document.getElementById("mail").value;
    let nvPseudo = document.getElementById("pseudo").value;
    let xhr = new XMLHttpRequest();
    xhr.open("get", "./mettreAJour?idUtilisateur=" + idUser + "&nvNom=" + nvNom + "&nvPrenom=" + nvPrenom + "&nvMdp=" + nvMdp + "&nvMail=" + nvMail + "&nvPseudo=" + nvPseudo);
    if (test(nvMdp, nvMdpConfirme)) {
        document.getElementById("erreur").innerHTML = "";
        alert("Modifcations Enregistrées avec succès !");
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