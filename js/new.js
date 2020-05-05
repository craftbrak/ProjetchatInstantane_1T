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
        liste += `<div class="user"><div class="pseudo" id=${user.id}>${user.name}</div><div class="commonChats">${user.commonChats}</div></div>`;
    });
    document.getElementById('listeUsers').innerHTML = liste;
    $('.user').click(addUser);
}

function addUser(event) {
    let id = event.target.getAttribute('id');
    usersToAdd.push(id);
    $.get(`getPseudo?id=${id}`,(pseudo)=>{document.getElementById('users').HTML += `<div class="pseudo" id=${id}>${pseudo}</div>`;});
    let users = document.getElementsByClassName('.user');
    for(let i = 0;i<users.length;++i){
        users[i].removeChild(document.getElementById(id))
    }
}