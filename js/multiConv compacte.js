$(document).on('initOver',()=>{
    $.get(`userConvs?userId=${session.userId}`,(v)=>{
        v.forEach(c=>{
            $('#listeConvs').append(`<div class="convListe convListeBox ${c.couleur}" id="${c.id}" href="./play.html?id=${c.id}">${c.nom}</div>`);
        });
    });
    $.get(`getName?id=${session.convUserId}`,(t)=>{document.title=t});
    $('#modif').click((e)=>{window.location=e.target.getAttribute('href')+session.userId});
    $('#déco, .convListe').click((e)=>{window.location=e.target.getAttribute('href')});
    $('#ajouterConv').click(window.location=`./new.html?userId=${session.userId}`)
})