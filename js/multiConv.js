//Auteur : François Girondin
document.addEventListener('DOMContentLoaded', initConvs);
$(document).on('InitOver', initConvs);
$(document).on('InitOver', initLinks);

function initConvs() {
    créerListeConvs();
    actualiserNomPage();
}

function initLinks() {
    $('.link').click(goToLink);
}

function créerListeConvs() {
    let getConvs = new XMLHttpRequest;
    getConvs.open('get', `userConvs?userId=${session.userId}`, true);
    getConvs.onload = () => {
        let liste = '';
        JSON.parse(getConvs.responseText).forEach(conv => {
            liste += '<div class=\"convListe convListeBox ' + conv.couleur + '\" id=\"' + conv.id + '\" href=\"http://craftbrakddns.myddns.me:536/play.html?id=' + conv.id + '\">' + conv.nom + '</div>';
        });
        liste += '<div id=\"ajouterConv\" class=\"convListeBox\">Nouvelle conversation</div>';
        document.getElementById('listeConvs').innerHTML = liste;
        $('.convListe').click(goToConv);
        $('#ajouterConv').click(creerConv);
    }
    getConvs.send();
}

function goToConv(event) {
    let lien = event.target.getAttribute('href') + session.userId;
    window.location = lien;
}

function goToLink(event) {
    let lien = event.target.getAttribute('href');
    window.location = lien;
}

function actualiserNomPage() {
    let getName = new XMLHttpRequest;
    getName.open('get', `getName?id=${session.convUserId}`, true);
    getName.onload = () => {
        document.title = getName.responseText;
    }
    getName.send();
}

function creerConv() {
    window.location = 'http://craftbrakddns.myddns.me:536/new.html';
}