/*le temps du developement des autre partie du code */
let Setion = {
    idUser: 782
}
let Game = {
    id: 1
}





document.addEventListener('DOMContentLoaded', initPage);

function initPage() {
    //document.getElementById("formMessage").addEventListener("submit",TraiterFormMessage(this));
    updateChat()
}

function TraiterFormMessage(formMessage) {
    let message = formMessage.message.value;
    let envoiMsg = new XMLHttpRequest;
    envoiMsg.open("GET", "newMsg?msgContent=" + message + "&idUsrVar=" + Setion.idUser + "&idGameVar=" + Game.id + "", true);
    envoiMsg.onload = function() {
        console.log("msg envoyer");
    };
    envoiMsg.send();
    return false;

}

function updateChat() {
    let chatUpdate = new XMLHttpRequest
    chatUpdate.open("GET", "updateChat?idGameVar=" + Game.id, true);
    chatUpdate.onload = function() {
        let chat = JSON.parse(chatUpdate.responseText);
        chat.date = 10;
        console.log(chat);
        let zoneChat = document.getElementById("divChat");
        let chatFinal = "";
        for (const element of chat) {
            chatFinal += "<p class='chatMessage' id='" + element.msgId + "><span class='chatPseudo' >" + element.pseudo + "</span>" + "<span class='chatMessagContent'>" + element.msgContent + "</span>" + "<span class='chatTimeCode'>" + element.heure + "</span></p>"
        }
        zoneChat.innerHTML = chatFinal;
    }
    chatUpdate.send()

}