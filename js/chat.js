/*le temps du developement des autre partie du code */


// on recuper l'id de lutilisateur passé en paramettre 
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let session = {
    convUserId: urlParams.get('id'),
    lastMsgId: 0,
    userId: null
}

document.addEventListener('DOMContentLoaded', initPage);

function initPage() {
    if (session.convUserId == null) {
        document.write("Vous êtes déconnecté. Veuillez vous connecter à un compte pour pouvoir participer au chat. <a href='./connexion.html'>Connexion</a>");
    } else {
        let obtinerUserId = new XMLHttpRequest;
        obtinerUserId.open('get', `obtenirUseId?convUserId=${session.convUserId}`, true);
        obtinerUserId.onload = () => {
            session.userId = JSON.parse(obtinerUserId.responseText)[0].UserId;
            if (session.userId != null) {
                $('#modif').href = `./modificationProfil.html?id=${session.userId}`;
                $.get(`getPseudo?id=${session.userId}`, (res) => { $('#déco').innerHTML = `Vous etes connecter en temps que ${res}  Deconnection` })
                updateChat();
                setInterval(updateChat, 1000);
                $(document).trigger('InitOver');
                $('#msg').focus()
            } else {
                document.write("Vous êtes déconnecté. Veuillez vous connecter à un compte pour pouvoir participer au chat. <a href='./connexion.html'>Connexion</a>");
            }


        }
        obtinerUserId.send();
    }
}

function TraiterFormMessage(formMessage) {
    let message = formMessage.message.value;
    let envoiMsg = new XMLHttpRequest;
    envoiMsg.open("GET", "newMsg?msgContentVar=" + message + "&convUserIdVar=" + session.convUserId + "", true);
    envoiMsg.onload = function() {
        updateChat();
        document.getElementById("formMessage").message.value = null;
    };
    envoiMsg.send();
    return false;

}

function updateChat() {
    let chatUpdate = new XMLHttpRequest
    chatUpdate.open("GET", `updateChat?idConvUserVar= ${session.convUserId}&lastId=${session.lastMsgId}`, true);
    chatUpdate.onload = function() {
            let chat = JSON.parse(chatUpdate.responseText);
            // chat.date = chat.date.toLocaleDateString(locales, {});
            let zoneChat = document.getElementById("divChat");
            let chatFinal = "";
            for (const element of chat) {
                element.heure = element.heure.slice(11, -4);
                chatFinal += `<div class="d-flex justify-content-start mb-4${element.idUSer==session.userId?" msgSortant":" msgEntrant"}"id="${element.id}" >
                            <div class="chatPseudo">
                                <p class="userMsg ${element.idUSer==session.userId?" msgSortant":" msgEntrant"}">${element.pseudo}</p>
                            </div>
                            <div class="msgContainer ${element.idUSer==session.userId?" msgSortant":" msgEntrant"}" id="${element.id}Msg">
                                <p class="pMsg">${element.msgContent}</p>
                            </div>
                            <span class="msgTime ${element.idUSer==session.userId?" msgSortant":" msgEntrant"}">${element.heure}</span>
                            ${element.idUSer==session.userId?`<div class="OptionMsgDiv ${element.idUSer==session.userId?"msgSortant" : "msgEntrant"}"><span class="deleteMsgSpan" ><img data-msgId="${element.id}" class="deleteMsg"src="./img/delete.png"></span><span class="modifyMsgSpan" ><img data-msgId="${element.id}" class="modifyMsg" src="./img/modifyIcon.png"></span></div>`:""}</div>`
            session.lastMsgId = element.id;
        }

        
        if (chatFinal != "") {
            zoneChat.innerHTML += chatFinal;
            var element = document.getElementById("divChat");
            element.scrollTop = element.scrollHeight;
            console.log("scrollTop0" , element.scrollTop);
            console.log("scrollHeight",element.scrollHeight);
            $('.deleteMsgSpan').click(deleteMsg);
            $('.modifyMsgSpan').click(modifyMsg);
        }
        
    }
    chatUpdate.send()

}

function modifyMsg(event) {
   console.log("modify", event);
}

function deleteMsg() {
 
     let msgId=event.target.getAttribute('data-msgId');
  $.get(`deleteMsg?MsgId=${msgId}`,()=>{
    $("#"+msgId).remove();
 
  })
}



// fixe dynamiquement la taile de l'input du message avec JQuerry 
$('document').ready(function() { //quand le DOM est pret 
    $('#msg').each(function() { //pour tt les element qui correspondent a ce selecteur 

        $(this).width($(this).parent().width() - $('#MsgFormSub').width() - 50); //fixe la tail de l'element par raporet a la largeur de son parent -la largeur du bouton -50px 
    });
});