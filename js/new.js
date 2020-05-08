const couleurs = ['gris', 'rose', 'jaune', 'orange', 'rouge', 'vert', 'bleu', 'violet'];
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let userId = urlParams.get('userId');
let usersToAdd = [];

$(document).ready(initNew);
$(document).on('nomUnique',sumbitForm);
$(document).on('nomPasUnique',nomPasUnique);

/**
 * @author François Girondin
 */
function initNew() {
    document.getElementById('color').selectedIndex = 0;
    setColor();
    $.get(`getPseudo?id=${userId}`, (pseudo) => {
        document.getElementById('iden').innerText = `Vous êtes connecté en tant que ${pseudo}.`;
        document.getElementById('owner').innerText = `${pseudo} (vous)`;
        $('#modif').click(() => { window.location = "./modificationProfil.html?id=" + userId });
        $('#déco').click(() => { window.location = 'index.html' })
    });
    $.get(`getAllUsers?id=${userId}`, créerListe);
}

/**
 * @author François Girondin
 */
function setColor() {
    couleurs.forEach(couleur => {
        document.getElementById('color').classList.remove(couleur)
    });
    document.getElementById('color').classList.add(document.getElementById('color').value);
}

/**
 * @author François Girondin
 */
function créerListe(users) {
    let liste = '';
    let listeToAdd = '';
    users.forEach(user => {
        liste += `<div class="user click ${user.id}"><div class="pseudo click ${user.id}">${user.name}</div><div class="commonChats click ${user.id}">${user.commonChats}</div></div>`;
        listeToAdd += `<div class="user click ${user.id}">${user.name}</div>`;
    });
    document.getElementById('listeUsers').innerHTML = liste;
    document.getElementById('listeUsersToAdd').innerHTML = listeToAdd;
    $('#listeUsers .user').click(addUser);
    $('#listeUsers .user').on('childClicked',addUser);
    $('#listeUsers .user div').click(triggerAddUser);
    $('#listeUsersToAdd div.user').click(removeUser);
    $('#listeUsersToAdd div.user').hide();
}

/**
 * @author François Girondin
 */
function triggerAddUser(event) {
    let classes = event.target.classList;
    classes.forEach(classe => {
        if (classe != 'click' && classe != 'user' && classe != 'pseudo' && classe != 'commonChats') {
            $(`#listeUsers.${classe}`).trigger('childClicked');
        }
    });
}

/**
 * @author François Girondin
 */
function addUser(event) {
    let classes = event.target.classList;
    let id;
    classes.forEach(classe => {
        if (classe != 'click' && classe != 'user') {
            id = Number(classe);
        }
    });
    $(`#listeUsersToAdd  .${id}`).show();
    $(`#listeUsers .${id}`).hide();
}

/**
 * @author François Girondin
 */
function removeUser(event) {
    let classes = event.target.classList;
    let id;
    classes.forEach(classe => {
        if (classe != 'click' && classe != 'user') {
            id = Number(classe);
        }
    });
    let index = -1;
    usersToAdd.forEach(user => {
        if (user.id == id) {
            index = usersToAdd.indexOf(user);
        }
    });
    if (index != -1) {
        usersToAdd.splice(index, 1);
    }
    $(`#listeUsers  .${id}`).show();
    $(`#listeUsersToAdd  .${id}`).hide();
}

/**
 * @author François Girondin
 */
function formNewConv(form) {
    if (testParticipants()) {
        document.getElementById('erreur').innerText = '';
        $('#convName').removeClass('error');
        testNomUnique();
    }
    else {
        document.getElementById('erreur').innerText = 'Votre conversation doit comporter au moins deux participants !';
        $('#convName').addClass('error');
    }
    return false;
}

/**
 * @author François Girondin
 */
function testParticipants() {
    return Boolean(usersToAdd.length > 0);
}

/**
 * @author François Girondin
 */
function testNomUnique() {
    $.get(`getNoms`, (noms) => {
        let unique = true;
        noms.forEach(nom => {
            if (nom == document.getElementById('form').convName.value) { unique = false }
        });
        if(unique){
            $(document).trigger('nomUnique');
        }
        else{
            $(document).trigger('nomPasUnique');
        }
    });
}

function sumbitForm() {
    $.post(`./newConv`, {name: form.convName.value, color: form.color.value, admin: userId }, (res) => {
        usersToAdd.forEach(user => {
            $.post(`./addUsersToConv`,{id:user.id, nom:form.convName.value}, (ress) => {
            });
        });
        $.get(`./userToGeneral?id=${userId}`, (id) => {window.location = `./play.html?id=${id}`});
    });
}

function nomPasUnique() {
    document.getElementById('erreur').innerText = 'Ce nom est déjà pris !';
}