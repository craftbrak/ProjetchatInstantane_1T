//Auteur : François Girondin
document.addEventListener('DOMContentLoaded', initConvs);

function initConvs() {
    if (conv.convUserId != null) {
        let getConvs = new XMLHttpRequest;
        getConvs.open('get', `userConvs?userId=${conv.convUserId}`, true);
        getConvs.onload = () => {

        }
        getConvs.send();
    }
}