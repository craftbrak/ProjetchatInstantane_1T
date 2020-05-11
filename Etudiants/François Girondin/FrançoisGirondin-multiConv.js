//Auteur : François Girondin

//Événement créé lors de l'éxécution d'Init dans le script "chat.js"
$(document).on('initOver', initMulticonvs);
//Éxécute la fonction initLinks lorsque la liste des conversations a été créée, qui a alors déclenché l'événement listeCréée.
$(document).on('listeCréée', initLinks);

function initMulticonvs() {
    creerListeConvs();
    actualiserNomPage();
}

/**
 * Effectue une requête à la base de donnée, qui renvoie toutes les conversations dans lesquelles se trouve l'utilisateur.
 * Génère dynamiquement la liste de ces conversations.
 * Une fois la liste générée, trigger l'événement listeCréée afin d'éxécuter la fonction initLinks.
 */
function creerListeConvs() {
    $.get(`./userConvs?userId=${session.userId}`, (convs) => {
        convs.forEach(conv => {
            $('#listeConvs').append(`<div class="convListe convListeBox ${conv.couleur}" id="${conv.id}" href="./play.html?id=${conv.id}">${conv.nom}</div>`);
        });
        $(document).trigger('listeCréée');
    });
}

/**
 * Envoie une requête au serveur afin d'obtenir le nom de la conversation actuelle, et remplace le titre du document par celui-ci.
 */
function actualiserNomPage() {
    $.get(`./getConvName?id=${session.convUserId}`, (titre) => { document.title = titre });
}

/**
 * Créée les événements survenant lors du clic sur les éléments suivants du site :
 * -Le bouton "Modifier profil".
 * -Le bouton "Déconnexion" et les boutons de conversations.
 * -Le bouton "Nouvelle conversation".
 */
function initLinks() {
    $('#modif').click(modif);
    $('#déco, .convListe').click(goToLink);
    $('#ajouterConv').click(creerConv);
}

/**
 * Cette fonction, éxécutée lors du clic sur le bouton "Modifier profil", redirige l'utilisateur vers la page correspondante. 
 */
function modif() {
    window.location = `./modificationProfil.html?id=${session.userId}`;
}

/**
 * Cette fonction, éxécutée lors du clic sur le bouton "Déconnexion" ou sur une conversation, redirige l'utilisateur vers la page correspondante.
 */
function goToLink(event) {
    window.location = event.target.getAttribute('href');
}

/**
 * Cette fonction, éxécutée lors du clic sur le bouton "Nouvelle conversation", redirige l'utilisateur vers la page correspondante.
 */
function creerConv() {
    window.location = `./new.html?userId=${session.userId}`;
}