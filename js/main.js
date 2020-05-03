document.addEventListener('DOMContentLoaded', initHeader);

function initHeader() {
    $('.link').forEach(div => {
        div.click(goToLink);
    });
}

function goToLink(event) {
    let lien = event.target.getAttribute('href');
    window.location = lien;
}