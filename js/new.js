const couleurs = ['gris','rose','jaune','orange','rouge','vert','bleu','violet'];
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let userId = urlParams.get('id');
let usersToAdd = [];

$(document).ready(initNew);

function initNew() {
    document.getElementById('color').selectedIndex = 0;
    setColor();
    $.get(`getPseudo?id=${userId}`,(pseudo)=>{
        document.getElementById('iden').innerText = `Vous êtes connecté en tant que ${pseudo}.`;
        document.getElementById('owner').innerText = `${pseudo} (vous)`;
    });
    $.get(`getAllUsers?id=${userId}`,créerListe);
}
function setColor() {
    couleurs.forEach(couleur => {
        document.getElementById('color').classList.remove(couleur)
    });
    document.getElementById('color').classList.add(document.getElementById('color').value);
}
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
function triggerAddUser(event) {
    let classes = event.target.classList;
    classes.forEach(classe => {
        if(classe!='click'&&classe!='user'&&classe!='pseudo'&&classe!='commonChats'){
            $(`#listeUsers.${classe}`).trigger('childClicked');
        }
    });
}
function addUser(event) {
    let classes = event.target.classList;
    let id;
    classes.forEach(classe => {
        if(classe!='click'&&classe!='user'){
            id = Number(classe);
        }
    });
    usersToAdd.push({id : id});
    $('#listeUsersToAdd .'+id).show();
    $('#listeUsers .'+id).hide();
}
function removeUser(event) {
    let classes = event.target.classList;
    let id;
    classes.forEach(classe => {
        if(classe!='click'&&classe!='user'){
            id = Number(classe);
        }
    });
    let index = -1;
    usersToAdd.forEach(user => {
        if(user.id==id){
            index = usersToAdd.indexOf(user);
        }
    });
    if(index != -1){
        usersToAdd.splice(index,1);
    }
    $('#listeUsers .'+id).show();
    $('#listeUsersToAdd .'+id).hide();
}
function formNewConv(form) {
    if (testParticipants()){
        document.getElementById('errorName').innerText = '';
        $('#convName').removeClass('error');
        if(testNomUnique()){
            $.post(`newConv?name=${form.convName.value}&color=${form.color.value}&admin=${userId}`,()=>{
                usersToAdd.forEach(user => {
                    $.post(`addUsersToConv?id=${user.id}&name=${form.convName.value}`);
                });
                $.get(`userToGeneral?id=${userId}`,(id)=>{window.location = `./play.html?id=${id}`});
            });
        }
        else {
            document.getElementById('erreur').innerText = 'Ce nom est déjà pris !';
        }
    }
    else {
        document.getElementById('erreur').innerText = 'Votre conversation doit comporter au moins deux participants !';
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