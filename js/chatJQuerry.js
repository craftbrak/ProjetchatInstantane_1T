/*le temps du developement des autre partie du code */
let Setion = {
    idUser: 782
}
let Game = {
    id: 1
}
$(document).ready(() => {
    $('#formMessage').submit(event, traiterFormMessage);
    $('#divChat').on('nouveauMsg', updateChat);
    updateChat();
    setInterval(updateChat, 1000);
});

function traiterFormMessage(event) {
    event.preventDefault();
    msg = $('#msg').val();
    $.get(`newMsg?msgContentVar=${msg}&idUserVar=${Setion.idUser}&idGameVar=${Game.id}`, () => {
        $('#divChat').trigger('nouveauMsg');
        $('#msg').val(null);
    })
}

function updateChat() {
    $.get(`updateChat?idGameVar=${Game.id}`, (reponce) => {
        console.log("updeted");
        let chat = reponce;
        let lastmsg = findLastMsgid()
        let nlastmsg = findLastMsg(chat, lastmsg);
        if (Number(chat[(chat.length - 1)].id) > Number(lastmsg)) {
            for (let i = nlastmsg; i < chat.length; i++) {
                chat[i].heure = chat[i].heure.slice(11, -4);
                $('#divMessage').append(`<p class="chatMessage" id="${chat[i].id}"><span class='chatPseudo' >${chat[i].pseudo}</span><span class='chatMessagContent'>${chat[i].msgContent}</span><span class='chatTimeCode'>${chat[i].heure}</span></p>`)
            }
        }
    })
}

function findLastMsgid() {
    chat = document.querySelectorAll('.chatMessage')
    let lastMsg = 0
    for (const element of chat) {
        if (Number(element.id) > lastMsg) {
            lastMsg = Number(element.id);
        }
    }
    return Number(lastMsg);
}

function findLastMsg(chat, lastMsgFound) {
    let msgIndex = 0
    for (const element in chat) {
        if (chat[element].id == lastMsgFound) {
            msgIndex = element;
        }
    }
    return msgIndex;
}