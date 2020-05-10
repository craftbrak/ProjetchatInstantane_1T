//array de couleurs qui correspondent aux classes css et aux choix disponibles pour les couleurs de conversations.
const couleurs = ['gris', 'rose', 'jaune', 'orange', 'rouge', 'vert', 'bleu', 'violet'];
//permet de récupérer l'id utilisateur dans l'url et stock cette valeur dans une variable.
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let userId = urlParams.get('userId');
//création de l'array usersToAdd, qui contiendra les ids des utilisateurs à ajouter dans la conversation.
let usersToAdd = [];

$(document).ready(initNew);
//En fonction du retour de la fonction testNomUnique, l'événement nomUnique ou nomPasUnique est déclenché, éxécutant la fonction correspondante.
$(document).on('nomUnique', sumbitForm);
$(document).on('nomPasUnique', nomPasUnique);

/**
 * @author François Girondin
 * Préparation du document :
 * -Remise à 0 de l'index de la liste 'color' (pour les navigateurs comme Firefox qui conservent les choix après un refresh)
 * -Effectue une requête à la base de données poru récupérer le pseudo de l'utilisateur afin de remplir correctement le header "Vous êtes connecté
 * en tant que [...]" ainsi que la div de la liste d'utilisateurs à ajouter à la conversation, qui, elle, est immuable.
 * -Initilisation des addEventListeners pour transformer les divs "Modifier profil" et "Déconnexion" en liens.
 * -Requête à la base de données de la liste d'utilisateurs et du nombre de conversations qu'ils ont en commun avec l'utilisateur actuel, le résultat
 * de la requête est passé en paramètre à la fonction créerListe qui est éxécutée.
 */
function initNew() {
    document.getElementById('color').selectedIndex = 0;
    setColor();
    $.get(`getPseudo?id=${userId}`, (pseudo) => {
        document.getElementById('iden').innerText = `Vous êtes connecté en tant que ${pseudo}.`;
        document.getElementById('owner').innerText = `${pseudo} (vous)`;
    });
    $('#modif').click(() => { window.location = "./modificationProfil.html?id=" + userId });
    $('#déco').click(() => { window.location = 'index.html' });
    $.get(`getAllUsers?id=${userId}`,créerListe);
}

/**
 * @author François Girondin
 * Fonction éxécutée par initNew et au changement de valeurs de la liste déroulante "color", elle supprime toutes les classes de couleur de
 * la liste puis lui rajoute la classe correspondant au choix actuel.
 */
function setColor() {
    couleurs.forEach(couleur => {
        document.getElementById('color').classList.remove(couleur)
    });
    document.getElementById('color').classList.add(document.getElementById('color').value);
}

/**
 * @author François Girondin
 * @param {Array} users Un array de tous les utilisateurs (sauf l'utilisateur actuel) et le nombre de conversations qu'ils possèdent en commun avec celui-ci.
 * Créée deux variables permettant de construire les listes d'utilisateurs, puis leur valeur est injectée dans le html.
 * Création des événements survenant lors du clics sur les éléments de ces listes.
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
    $('#listeUsers .user').on('childClicked', addUser);
    $('#listeUsers .user div').click(triggerAddUser);
    $('#listeUsersToAdd div.user').click(removeUser);
    $('#listeUsersToAdd div.user').hide();
}

/**
 * @author François Girondin
 * @param {event} clic L'événement du clic sur un enfant d'un élément de classe "user" de la liste #listeUsers.
 * Parcourt la liste des classes de l'élément cliqué pour trouver celle contenant la valeur de l'id de l'utilisateur représenté par cette div.
 * Lorsque celle-ci est trouvée, on cherche le parent correspondant, enfant de la balise #listeUsers, et lui trigger l'événement childClicked.
 */
function triggerAddUser(event) {
    let classes = event.target.classList;
    classes.forEach(classe => {
        if (classe != 'click' && classe != 'user' && classe != 'pseudo' && classe != 'commonChats') {
            $(`#listeUsers .${classe}`).trigger('childClicked');
        }
    });
}

/**
 * @author François Girondin
 * @param {event} clic Lorsqu'une div enfant de #listeUsers est cliquée, ou qu'un enfant de cette div elle-même est cliqué.
 * On parcourt la liste des classes de cette div pour trouver celle stockant la valeur de l'utilisateur qu'elle représente.
 * Une fois trouvé, on ajoute dans le tableau usersToAdd un objet correspondant, puis on cache cette div et affiche celle correspondante
 * dans la liste #lsiteUsersToAdd pour donner l'illusion de l'avoir déplacée.
 */
function addUser(event) {
    let classes = event.target.classList;
    let id;
    classes.forEach(classe => {
        if (classe != 'click' && classe != 'user') {
            id = Number(classe);
        }
    });
    usersToAdd.push({ id: id });
    $(`#listeUsersToAdd  .${id}`).show();
    $(`#listeUsers .${id}`).hide();
}

/**
 * @author François Girondin
 * @param {event} clic Lorsqu'on clique sur un utilisateur de la liste "#listeUsersToAdd"
 * On parcourt la liste des classes de cette div pour trouver celle stockant la valeur de l'utilisateur qu'elle représente.
 * Une fois trouvé, on stocke cet id dans la variable "id". On supprime l'objet contenant cet id dans le tableau usersToAdd, puis on cache la div cliquée
 * pour remontrer la div correspondant dans la liste #listeUsers
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
 * Test si le nombre de participants est suffisant, et si oui, si le nom de cette conversation est déjà pris.
 * Si le nombre de participants n'est pas suffisant, un message d'erreur est affiché.
 */
function testForm() {
    if (testParticipants()) {
        document.getElementById('erreur').innerText = '';
        $('#convName').removeClass('error');
        testNomUnique();
    } else {
        document.getElementById('erreur').innerText = 'Votre conversation doit comporter au moins deux participants !';
    }
    return false;
}

/**
 * @author François Girondin
 * @return {Boolean} Vérifie que le nombre de participants est suffisant ?
 */
function testParticipants() {
    return Boolean(usersToAdd.length > 0);
}

/**
 * @author François Girondin
 * Vérifie que le nom de conversation n'est pas déjà pris. Si oui, trigger l'événement nomPasUnique. S'il est libre, trigger l'événement nomUnique.
 */
function testNomUnique() {
    $.get(`getAllConvNames`, (convs) => {
        let unique = true;
        convs.forEach(conv => {
            if (conv.nom == document.getElementById('form').convName.value) { unique = false }
        });
        if (unique) {
            $(document).trigger('nomUnique');
        } else {
            $(document).trigger('nomPasUnique');
        }
    });
}

/**
 * Éxécutée si le formulaire est valide, renvoie à la base de donnée la nouvelle conversation ainsi que son admin. Une fois cela fait,
 * on ajoute un à un tous les utilisateurs dans cette conversation. Enfin, on redirige l'utilisateur vers le général.
 */
function sumbitForm() {
    $.post(`./newConv`, { name: document.form.convName.value, color: document.form.color.value, admin: userId }, (res) => {
        usersToAdd.forEach(user => {
            $.post(`./addUserToConv`, { id: user.id, nom: document.form.convName.value }, (ress) => {});
        });
        $.get(`./userToGeneral?id=${userId}`, (id) => { window.location = `./play.html?id=${id}` });
    });
}

/**
 * Rajoute la classe error au champ "Nom de la conversation", qui devient alors rouge, et génère le message d'erreur "Ce nom est déjà pris !"
 */
function nomPasUnique() {
    $('#convName').addClass('error');
    document.getElementById('erreur').innerText = 'Ce nom est déjà pris !';
}