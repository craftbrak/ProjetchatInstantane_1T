$(document).on('InitOver',()=>{
    $.get(`userConvs?userId=${session.userId}`,(s)=>{
        let l='';
        s.forEach(c=>{
            l+=`<div class="convListe convListeBox ${c.couleur}" id="${c.id}" href="./play.html?id=${c.id}">${c.nom}</div>`
        });
        $('#listeConvs').innerHTML=l+'<div id="ajouterConv" class="convListeBox">Nouvelle conversation</div>';
        $('.convListe').click((e)=>{window.location=e.target.getAttribute('href')});
        $('#ajouterConv').click(()=>{window.location = './new.html'})
    });
    $.get(`getName?id=${session.convUserId}`,(t)=>{document.title=t});
    $('.link').click((e)=>{window.location=e.target.getAttribute('href')})
})