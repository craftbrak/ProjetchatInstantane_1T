//Auteur : François Girondin

$(document).ready(initMulticonvs);

function initMulticonvs() {
    créerListeConvs();
    actualiserNomPage();
    initLinks();
}

/**
 * Effectue une requête à la base de donnée, qui renvoie toutes les conversations dans lesquelles se trouve l'utilisateur.
 * Génère dynamiquement la liste de ces conversations.
 * Génère le bouton "Nouvelle conversation".
 */
function créerListeConvs() {
    $.get(`userConvs?userId=${session.userId}`,(convs) => {
        convs.forEach(conv => {
            $('#listeConvs').append(`<div class="convListe convListeBox ${conv.couleur}" id="${conv.id}" href="./play.html?id=${conv.id}">${conv.nom}</div>`);
        });
        $('#listeConvs').append('<div id="ajouterConv" class="convListeBox">Nouvelle conversation</div>');
    });
}

/**
 * Envoie une requête au serveur afin d'obtenir le nom de la conversation actuelle, et remplace le titre du document par celui-ci.
 */
function actualiserNomPage() {
    $.get(`getName?id=${session.convUserId}`,(titre)=>{document.title = titre});
}

/**
 * Créée les événements survenant lors du clic sur les éléments cliquables du site :
 * -Le lien de modification de profil.
 * -Le bouton déconnexion et les boutons de conversations.
 * -Le bouton "Nouvelle conversation".
 */
function initLinks() {
    $('#modif').click(modif);
    $('#déco, .convListe').click(goToLink);
    $('#ajouterConv').click(creerConv);
}

function modif(event) {
    window.location = event.target.getAttribute('href') + session.userId;
}

function goToLink(event) {
    window.location = event.target.getAttribute('href');
}

function creerConv() {
    window.location = `./new.html?userId=${session.userId}`;
}