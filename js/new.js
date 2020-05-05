const couleurs = ['gris','rose','jaune','orange','rouge','vert','bleu','violet'];
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let userId = urlParams.get('id');
let usersToAdd = [];

$(document).ready(initNew);

function formNewConv(formulaire) {

    return false;
}

function setColor() {
    couleurs.forEach(couleur => {
        document.getElementById('color').classList.remove(couleur)
    });
    document.getElementById('color').classList.add(document.getElementById('color').value);
}

function initNew() {
    document.getElementById('color').selectedIndex = 0;
    setColor();
    $.get(`getPseudo?id=${userId}`,(pseudo)=>{
        document.getElementById('iden').innerText = `Vous êtes connecté en tant que ${pseudo}.`;
        document.getElementById('owner').innerText = `${pseudo} (vous)`;
    });
    $.get(`getAllUsers?id=${userId}`,créerListe);
}

function deleteUser(id) {

}

function créerListe(users) {
    let liste = '';
    users.forEach(user => {
        liste += `<div class="user" id=${user.id}><div class="pseudo">${user.name}</div><div class="commonChats">${user.commonChats}</div></div>`;
    });
    document.getElementById('listeUsers').innerHTML = liste;
    $('#listeUsers .user').click(addUser);
    $('#listeUsers .user').on('childClicked',addUser);
    $('#listeUsers .user div').click(triggerAddUser);
}

function addUser(event) {
    let id = event.target.id;
    console.log(id);
    usersToAdd.push(id);
    $.get(`getPseudo?id=${id}`,(pseudo)=>{document.getElementById('users').innerHTML += `<div class="pseudo" id=${id}>${pseudo}</div>`;});
    $('#'+id).remove();
}

function triggerAddUser(event) {
    $('#'+event.target.parentElement.id).trigger('childClicked');
}