//Auteur : François Girondin
document.addEventListener('DOMContentLoaded', initConvs);

function initConvs() {
    if (session.userId != null) {
        let getConvs = new XMLHttpRequest;
        getConvs.open('get', `userConvs?userId=${session.userId}`, true);
        getConvs.onload = () => {
            let liste = '';
            JSON.parse(getConvs.responseText).forEach(conv => {
                liste += '<div class=\"convListe\" id=\"' + conv.nom + '\" href=\"http://craftbrakddns.myddns.me:536/play.html?id="' + conv.id + '\">' + conv.nom + '</div>';
            });
            document.getElementById('listeConvs').innerHTML = liste;
            JSON.parse(getConvs.responseText).forEach(conv => {
                document.getElementById(conv.nom).addEventListener('click',goToConv);
            });
        }
        getConvs.send();
    }
}

function goToConv(event) {
    let lien = event.target;
    window.location = lien;
}