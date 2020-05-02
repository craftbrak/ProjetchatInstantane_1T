//Auteur : François Girondin
document.addEventListener('DOMContentLoaded', initConvs);

function initConvs() {
    if (conv.convUserId != null) {
        let getConvs = new XMLHttpRequest;
        getConvs.open('get', `userConvs?userId=${conv.convUserId}`, true);
        getConvs.onload = () => {
            let liste = '';
            JSON.parse(getConvs.responseText).forEach(conv => {
                liste += '<div class=\"convListe\" id=\"' + conv.nom + '\">' + conv.nom + '</div>';
            });
            document.getElementById('listeConvs').innerHTML = liste;
            JSON.parse(getConvs.responseText).forEach(conv => {
                document.getElementById(conv.nom).addEventListener('click',function () {window.location = "http://craftbrakddns.myddns.me:536/play.html?id=" + conv.id});
            });
        }
        getConvs.send();
    }
}