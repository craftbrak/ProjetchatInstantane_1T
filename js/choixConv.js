//Auteur : François Girondin
document.addEventListener('DOMContentLoaded', initConvs);
$(document).on('InitOver', initConvs);

function initConvs() {
    if (session.userId != null) {
        let getConvs = new XMLHttpRequest;
        getConvs.open('get', `userConvs?userId=${session.userId}`, true);
        getConvs.onload = () => {
            let liste = '';
            JSON.parse(getConvs.responseText).forEach(conv => {
                liste += '<div class=\"convListe\" id=\"' + conv.id + '\" href=\"http://craftbrakddns.myddns.me:536/play.html?id=' + conv.id + '\">' + conv.nom + '</div>';
            });
            document.getElementById('listeConvs').innerHTML = liste;
            $('.convListe').click(goToConv);
        }
        getConvs.send();
    }
}

function goToConv(event) {
    let lien = event.target.getAttribute('href');
    window.location = lien;
    let getConvName = new XMLHttpRequest;
    document.title = event.target.innerHTML;
        getConvName.open('get', `convName?userId=${session.userId}`, true);
        getConvName.onload = () => {
            JSON.parse(getConvName.responseText).forEach(conv => {
                liste += '<div class=\"convListe\" id=\"' + conv.id + '\" href=\"http://craftbrakddns.myddns.me:536/play.html?id=' + conv.id + '\">' + conv.nom + '</div>';
            });
        }
        getConvName.send();
}