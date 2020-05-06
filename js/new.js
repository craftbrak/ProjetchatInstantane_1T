const couleurs = ['gris','rose','jaune','orange','rouge','vert','bleu','violet'];
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let userId = urlParams.get('id');
let usersToAdd = [];

$(document).ready(initNew);

function formNewConv(form) {
    if (testParticipants()){
        document.getElementById('errorName').innerText = '';
        $('#convName').removeClass('error');
        if(testNomUnique()){
            let listeParticipants = ``
            $.post(`newConv?name=${form.convName.value}&color=${form.color.value}&admin=${userId}&users=${usersToAdd}`)
        }
        else {
            document.getElementById('erreur').innerText = 'Votre conversation doit comporter au moins deux participants !';
        }
    }
    else {
        document.getElementById('errorName').innerText = 'Ce nom est déjà pris !';
        $('#convName').addClass('error');
    }
    return false;
}

function testParticipants() {
    return Boolean(usersToAdd.length>0);
}

function testNomUnique() {
    let unique = true;
    $.get(`getNoms`,(noms)=>{noms.forEach(nom=>{if(nom==document.getElementById('form').convName.value){unique=false}})});
    return unique;
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
        if(notInList(user.id)){
            liste += `<div class="user click" id=${user.id}><div class="pseudo click">${user.name}</div><div class="commonChats click">${user.commonChats}</div></div>`;
        }
    });
    document.getElementById('listeUsers').innerHTML = liste;
    $('#listeUsers .user').click(addUser);
    $('#listeUsers .user').on('childClicked',addUser);
    $('#listeUsers .user div').click(triggerAddUser);
}

function addUser(event) {
    let id = event.target.id;
    usersToAdd.push({id : id});
    $('#'+id).remove();
    $.get(`getPseudo?id=${id}`,(pseudo)=>{$('#users').append(`<div class="pseudo click" id=${id}>${pseudo}</div>`)});
    $('#'+id).click(removeUser);
}

function triggerAddUser(event) {
    $('#'+event.target.parentElement.id).trigger('childClicked');
}

function removeUser(event) {
    let idCible = event.target.id;
    console.log(idCible);
    let index = -1;
    usersToAdd.forEach(user => {
        if(user.id==idCible){
            index = usersToAdd.indexOf(user);
        }
    });
    if(index != -1){
        usersToAdd.splice(index,1);
    }
    $.get(`getAllUsers?id=${userId}`,créerListe);
}

function notInList(idRecu) {
    let isNotInList = true;
    usersToAdd.forEach(user=>{
        if(user.id==idRecu){
            isNotInList=false;
        }
    });
    return isNotInList;
}