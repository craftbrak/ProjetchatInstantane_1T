/*le temps du developement des autre partie du code */


// on recuper l'id de lutilisateur passé en paramettre 
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let session = {
    convUserId: urlParams.get('id'),
    lastMsgId: 0,
    userId: null,
    pseudo: null
}

$(document).ready(initPage);

function initPage() {
    if (session.convUserId == null) {
        alert("vous êtes deconnecté veuiller vous connectez pour accéder au chat");
        window.location = "http://craftbrakddns.myddns.me:536/index.html"
    } else {
        $.post(`obtenirUserId`, { convUserId: session.convUserId }, (res) => {
            session.userId = res[0].UserId;
            if (session.userId != null) {
                $.get(`getPseudo?id=${session.userId}`, (p) => {
                    $('#iden').append(`Vous êtes connecté en tant que ${p}.`);
                    session.pseudo = p
                });
                $('#formMessage').submit(TraiterFormMessage)
                updateChat();
                setInterval(updateChat, 1000);
                $('.listeParticipantsFooter').hide();
                $(document).trigger('initOver');
                listeParticipants();
                $('#msg').focus()
            } else {
                alert("vous êtes deconnecté. Veuillez vous connecter pour accéder au chat.");
                window.location = "http://craftbrakddns.myddns.me:536/index.html"
            }
        });
    }
}

function TraiterFormMessage(e) {
    e.preventDefault()
    $.post("newMsg", { msgContentVar: e.target.message.value, convUserIdVar: session.convUserId }, () => {
        updateChat();
        document.getElementById("formMessage").message.value = null;
    });
    return false;
}

function listeParticipants() {
    $.post('chatParticipant', { convUserIdVar: session.convUserId }, (res) => {
        $('#chatName').append(res[0].convName);
        res.sort((a,b)=>{
            if(a.participant>b.participant){
                return 1
            }
            else if(b.participant>a.participant){
                return -1
            }
            else{
                return 0
            }
        });
        let liste = "";
        res.forEach(element => {
            liste += `<div class="userContainer ${element.participant === session.pseudo? "me":"notMe"} ${element.isAdmin == true ? "admin":""}">${element.participant}</div>`
        });
        $('.listeParticipantsBody').append(liste);
        if ($('.userContainer').hasClass('admin')) {
            if ($('.admin').html() === session.pseudo) {
                $('.listeParticipantsFooter').show().click(() => { window.location = `./modifConv.html?id=${session.convUserId}` })
            }
        }
    })
}

function updateChat() {
    $.post(`updateChat`, { idConvUserVar: session.convUserId, lastId: session.lastMsgId }, (chat) => {
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
                            <!--${element.idUSer==session.userId?`<div class="OptionMsgDiv ${element.idUSer==session.userId?"msgSortant" : "msgEntrant"}"><span class="deleteMsgSpan" ><img data-msgId="${element.id}" class="deleteMsg"src="./img/delete.png"></span><span class="modifyMsgSpan" ><img data-msgId="${element.id}" class="modifyMsg" src="./img/modifyIcon.png"></span></div>`:""}--></div>`
            session.lastMsgId = element.id;
        } 
        if (chatFinal != "") {
            $('#divChat').append(chatFinal) ;
            var element = document.getElementById("divChat");
            element.scrollTop = element.scrollHeight;
            /* bouton d'administation du chat

            $('.deleteMsgSpan').click(deleteMsg);
            $('.modifyMsgSpan').click(modifyMsg);
            */
        }
     } );
}

/* fonction de traitement des bouton d'administation

function modifyMsg(event) {
   console.log("modify", event);
}

function deleteMsg() {
 
     let msgId=event.target.getAttribute('data-msgId');
  $.get(`deleteMsg?MsgId=${msgId}`,()=>{
    $("#"+msgId).remove();
 
  })
}
*/

// fixe dynamiquement la taile de l'input du message avec JQuerry 
$('document').ready(function() { //quand le DOM est pret 
    $('#msg').each(function() { //pour tt les element qui correspondent a ce selecteur 

        $(this).width($(this).parent().width() - $('#MsgFormSub').width() - 50); //fixe la tail de l'element par raporet a la largeur de son parent -la largeur du bouton -50px 
    });
});