//Auteur : François Girondin
$(document).on('InitOver', initConvs);
$(document).on('InitOver', initLinks);

function initConvs() {
    créerListeConvs();
    actualiserNomPage();
}

function initLinks() {
    $('#modif').click(modif);
    $('#déco').click(goToLink);
}

function créerListeConvs() {
    $.get(`userConvs?userId=${session.userId}`,(convs) => {
        let liste = '';
        convs.forEach(conv => {
            liste += `<div class="convListe convListeBox ${conv.couleur}" id="${conv.id}" href="./play.html?id=${conv.id}">${conv.nom}</div>`;
        });
        document.getElementById('listeConvs').innerHTML = liste + '<div id=\"ajouterConv\" class=\"convListeBox\">Nouvelle conversation</div>';
        $('.convListe').click(goToLink);
        $('#ajouterConv').click(creerConv);
    });
}

function goToLink(event) {
    window.location = event.target.getAttribute('href');
}

function modif(event) {
    window.location = event.target.getAttribute('href') + session.userId;
}

function actualiserNomPage() {
    $.get(`getName?id=${session.convUserId}`,(titre)=>{document.title = titre});
}

function creerConv() {
    window.location = `./new.html?id=${session.userId}`;
}