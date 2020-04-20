function initialiserFormulaire (){
    let xhr = new XMLHttpRequest();
    xhr.open("get", "http://craftbrakddns.myddns.me:536/modification?idChoisi=780", true);
    xhr.onload = remplirFormulaire;
    xhr.send();
}

function remplirFormulaire(){
    let reponse = JSON.parse(this.responseText);
    console.log(reponse);
    document.getElementById("formulaire").innerHTML += "<input type='text'>"
}