const couleurs = ['gris', 'rose', 'jaune', 'orange', 'rouge', 'vert', 'bleu', 'violet'];
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let session = {
    convUserId: urlParams.get('id'),
    userId: null,
    pseudo: null,
    participant: null,
}
let usersToAdd = [];
let usersToRemove = [];
$(document).ready(initNew);

function initNew() {
    document.getElementById('color').selectedIndex = 0;
    setColor();
    if (session.convUserId == null) {
        alert("vous êtes deconnecté veuiller vous connectez pour accéder au chat");
        window.location = "http://craftbrakddns.myddns.me:536/index.html"
    } else {
        $.post(`obtenirUseId`, { convUserId: session.convUserId }, (res) => {
            session.userId = res[0].UserId;
            if (session.userId != null) {
                $('#modif').href = `./modificationProfil.html?id=${session.userId}`;
                $.get(`getPseudo?id=${session.userId}`, (p) => {
                    $('#iden').append(`Vous êtes connecté en tant que ${p}.`);
                    session.pseudo = p
                    document.getElementById('owner').innerText = `${p} (vous)`;
                    $.get(`getAllUsers?id=${session.userId}`, créerListe);
                    $(document).on('listeCree', initModif);
                    $('#form').submit(formConv)
                });
            } else {
                alert("vous êtes deconnecté veuiller vous connectez pour accéder au chat");
                window.location = "http://craftbrakddns.myddns.me:536/index.html"
            }


        });
    }


}

function initModif() {
    $.post('ObtenirInfoConv', { convUserIdVar: session.convUserId }, (res) => {
        $('#convName').val(res[0].convName);
        $('#color').val(res[0].convColor);
        setColor();

        session.participant = res;
        creeListeParticipant(res);
    })
}

function creeListeParticipant(users) {

    users.forEach(user => {
        $(`#listeUsers .user.${user.idUser}`).trigger('childClicked')
        let index = -1;
        usersToAdd.forEach(userp => {
            if (userp.id == user.idUser) {
                index = usersToAdd.indexOf(userp);
            }
        });
        if (index != -1) {
            usersToAdd.splice(index, 1);
        }

    })
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
    $('#listeUsers .user').on('childClicked', addUser);
    $('#listeUsers .user div').click(triggerAddUser);
    $('#listeUsersToAdd div.user').click(removeUser);
    $('#listeUsersToAdd div.user').hide();
    $(document).trigger('listeCree');
}

function triggerAddUser(event) {
    let classes = event.target.classList;

    classes.forEach(classe => {
        if (classe != 'click' && classe != 'user' && classe != 'pseudo' && classe != 'commonChats') {
            $(`#listeUsers.${classe}`).trigger('childClicked');
        }
    });
}

function addUser(event) {
    let classes = event.target.classList;
    let id;
    classes.forEach(classe => {
        if (classe != 'click' && classe != 'user') {
            id = Number(classe);
        }
    });
    usersToAdd.push({ id: id });
    $('#listeUsersToAdd .' + id).show();
    $('#listeUsers .' + id).hide();
}

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
    } else {
        session.participant.forEach(PartUser => {
            if (PartUser.idUser == id) {
                usersToRemove.push(PartUser);
            }
        })

    }
    $('#listeUsers .' + id).show();
    $('#listeUsersToAdd .' + id).hide();
}

function formConv(event) {
    if (testNomUnique()) {
        event.preventDefault();
        $.post('Updateconv', { nouveauNom: event.target.convName.value, convColorVar: event.target.color.value, convUserId: session.convUserId }, (res) => {
            $.when(usersToAdd.forEach(usertoadd => {
                $.post('addUsersToConv', { id: usertoadd.id, nom: res }, () => {

                })
            }), usersToRemove.forEach(userToRemove => {
                $.post('removeUserFromConv', { id: userToRemove.idUser, nom: res }, () => {

                })
            })).done(() => {
                window.location = `./play.html?id=${session.convUserId}`
            })
        })
    } else {
        document.getElementById('erreur').innerText = 'Votre conversation doit comporter au moins deux participants !';
    }
}

function testParticipants() {
    return Boolean(usersToAdd.length > 0);
}

function testNomUnique() {
    let unique = true;
    $.get(`getNoms`, (noms) => { noms.forEach(nom => { if (nom == document.getElementById('form').convName.value) { unique = false } }) });
    return unique;
}