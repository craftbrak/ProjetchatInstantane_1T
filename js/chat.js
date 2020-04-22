/*le temps du developement des autre partie du code */
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get('id')
console.log(product);
let idUser = product;

let Game = {
    id: 1
}
document.addEventListener('DOMContentLoaded', initPage);

function initPage() {
    //document.getElementById("formMessage").addEventListener("submit",TraiterFormMessage(this));
    updateChat();
    setInterval(updateChat, 1000);
}

function TraiterFormMessage(formMessage) {
    let message = formMessage.message.value;
    let envoiMsg = new XMLHttpRequest;
    envoiMsg.open("GET", "newMsg?msgContentVar=" + message + "&idUserVar=" + idUser + "&idGameVar=" + Game.id + "", true);
    envoiMsg.onload = function() {
        //console.log("msg envoyer");
        updateChat();
        document.getElementById("formMessage").message.value = null;
    };
    envoiMsg.send();
    return false;

}

function updateChat() {
    let chatUpdate = new XMLHttpRequest
    chatUpdate.open("GET", "updateChat?idGameVar=" + Game.id, true);
    console.log("oupdate send");
    chatUpdate.onload = function() {
        let chat = JSON.parse(chatUpdate.responseText);
        // chat.date = chat.date.toLocaleDateString(locales, {});
        //console.log(chat);
        let zoneChat = document.getElementById("divChat");
        let chatFinal = "";
        for (const element of chat) {
            //console.log(element.heure);
            element.heure = element.heure.slice(11, -4);
            //console.log(element.heure);
            chatFinal += `<div class="d-flex justify-content-start mb-4"><div class="img_cont_msg"><p class="user_img_msg">${element.pseudo}</p></div></div><div class="msg_cotainer" id="${element.msgId}">${element.msgContent}<span class="msg_time">${element.heure}</span></div>`

        }
        zoneChat.innerHTML = chatFinal;
    }
    chatUpdate.send()

}