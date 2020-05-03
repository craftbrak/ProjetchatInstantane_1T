//Auteur : François Girondin
document.addEventListener('DOMContentLoaded', initConvs);
$(document).on('InitOver', initConvs);

function initConvs() {
    créerListeConvs();
    actualiserNomPage();
}

function créerListeConvs() {
    let getConvs = new XMLHttpRequest;
    getConvs.open('get', `userConvs?userId=${session.userId}`, true);
    getConvs.onload = () => {
        let liste = '';
        JSON.parse(getConvs.responseText).forEach(conv => {
            liste += '<div class=\"convListe\" id=\"' + conv.id + '\" href=\"http://craftbrakddns.myddns.me:536/play.html?id=' + conv.id + '\">' + conv.nom + '</div>';
        });
        liste += '<div id=\"ajouterConv\">Nouvelle conversation</div>';
        document.getElementById('listeConvs').innerHTML = liste;
        $('.convListe').click(goToConv);
        $('#ajouterConv').click(creerConv);
    }
    getConvs.send();
}

function goToConv(event) {
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