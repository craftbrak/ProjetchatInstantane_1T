document.addEventListener('DOMContentLoaded', initPage());

function initPage(){
    document.getElementById("formMessage").addEventListener("submit",TraiterFormMessage(this));
}

function TraiterFormMessage(formMessage) {
    let message= formMessage;
    let envoiMsg= new XMLHttpRequest;
    envoiMsg.open("GET","newMsg?message="+message+"&idUsrVar="+Setion.idUser+"&idGameVar="+Game.id,true);
    envoiMsg.onload()=updateChat();
    envoiMsg.send();
}

function updateChat() {
    let chatUpdate= new XMLHttpRequest
    chatUpdate.open("GET","updateChat?idGameVar="+Game.id,true);
    chatUpdate.onload()=function (){
        let chat =JSON.parse(chatUpdate.responseText);
        let zoneChat=document.getElementById("divChat");
        
    }
}