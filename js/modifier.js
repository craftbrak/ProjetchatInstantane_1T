function initialiserFormulaire (){
    let xhr = new XMLHttpRequest();
    xhr.open("get", "http://craftbrakddns.myddns.me:536/modification?idChoisi=780", true);
    xhr.onload = remplirFormulaire;
    xhr.send();
}

function remplirFormulaire(){
    let reponse = JSON.parse(this.responseText);
    console.log(reponse);
    console.log(reponse[0].idUser);


    document.getElementById("formulaire").innerHTML += "<label for='idUser'>ID</label> <input name='idUser' type='text' " +
        "value='" + reponse[0].idUser + "'>"

    document.getElementById("formulaire").innerHTML += "<label for='name'>Nom</label> <input name='name' type='text' " +
        "value='" + reponse[0].nom + "'>"

    document.getElementById("formulaire").innerHTML += "<label for='surname'>Prenom</label> <input name='surname' type='text' " +
        "value='" + reponse[0].prenom + "'>"

    document.getElementById("formulaire").innerHTML += "<label for='mdpUser'>Mot de Passe</label> <input name='mdpUser' type='text' " +
        "value='" + reponse[0].mdpUser + "'>"

    document.getElementById("formulaire").innerHTML += "<label for='mail'>Adresse mail</label> <input name='mail' type='text' " +
        "value='" + reponse[0].mail+ "'>"

    document.getElementById("formulaire").innerHTML += "<label for='pseudo'>Pseudo</label> <input name='pseudo' type='text' " +
        "value='" + reponse[0].pseudo + "'>"

}