/*le temps du developement des autre partie du code */


// on recuper l'id de lutilisateur passé en paramettre 
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let conv = {
    convUserId: urlParams.get('id'),
    lastMsgId: 0,
    userId: null
}

document.addEventListener('DOMContentLoaded', initPage);

function initPage() {
    if (conv.convUserId == null) {
        document.write("veuiller vous connecter avant de participer au chat <a href='./connexion.html'>connection</a>")
    } else {
        let obtinerUserId = new XMLHttpRequest;
        obtinerUserId.open('get', `obtenirUseId?convUserId=${conv.convUserId}`, true);
        obtinerUserId.onload = () => {
            conv.userId = JSON.parse(obtinerUserId.responseText)[0].UserId;
            document.querySelector("#LienModif").href = `./modificationProfile.html?id=${conv.userId}`;
        }
        obtinerUserId.send();

    }
    updateChat();
    setInterval(updateChat, 1000);

}

function TraiterFormMessage(formMessage) {
    let message = formMessage.message.value;
    let envoiMsg = new XMLHttpRequest;
    envoiMsg.open("GET", "newMsg?msgContentVar=" + message + "&convUserIdVar=" + conv.convUserId + "", true);
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
    chatUpdate.open("GET", `updateChat?idConvUserVar= ${conv.convUserId}&lastId=${conv.lastMsgId}`, true);
    //console.log("oupdate send");
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
            chatFinal += `<div class="d-flex justify-content-start mb-4${element.idUSer==conv.userId?" msgSortant":" msgEntrent"}"><div class="chatPseudo"><p class="user_msg ${element.idUSer==conv.userId?" msgSortant":" msgEntrent"}">${element.pseudo}</p></div><div class="msg_cotainer ${element.idUSer==conv.userId?" msgSortant":" msgEntrent"}" id="${element.id}"><p class="pMsg">${element.msgContent}</p></div><span class="msg_time ${element.idUSer==conv.userId?" msgSortant":" msgEntrent"}">${element.heure}</span><div class="OptionMsgDiv ${element.idUSer==conv.userId?" msgSortant":" msgEntrent"}"><span class="deleteMsgSpan" msgId="${element.id}"><img class="deleteMsg"src="./img/delete.png"></span><span class="modifyMsgSpan" msgId="${element.id}"><img class="modifyMsg" src="./img/modifyIcon.png"></span></div></div>`
            conv.lastMsgId = element.id;
        }

        zoneChat.innerHTML += chatFinal;
        if (chatFinal != "") {
            var element = document.getElementById("divChat");
            element.scrollTop = element.scrollHeight;
        }
        $('.deleteMsgSpan').click(deleteMsg);
        $('.modifyMsgSpan').click(modifyMsg);
    }
    chatUpdate.send()

}

function modifyMsg() {
    console.log('modify');
}

function deleteMsg() {
    console.log('delete');
}














// fixe dynamiquement la taile de l'input du message avec JQuerry 
$('document').ready(function() { //quand le DOM est pret 
    $('#msg').each(function() { //pour tt les element qui correspondent a ce selecteur 

        $(this).width($(this).parent().width() - $('#MsgfomSub').width() - 50); //fixe la tail de l'element par raporet a la largeur de son parent -la largeur du bouton -50px 
    });
});