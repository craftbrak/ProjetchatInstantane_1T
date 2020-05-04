$(document).ready(() => {
    $('#formulaireCreation').submit(traiterForm);
})

function traiterForm(e) {
    e.preventDefault()
    if (e.target.newMotPasse.value === e.target.newMotPasseVerif.value) {
        $.post('creation', {
            newEmail: e.target.email.value,
            nemNom: e.target.nom.value,
            newPrenom: e.target.prenom.value,
            newPseudo: e.target.pseudo.value,
            newMdpUser: e.target.newMotPasse.value,
        }, (res) => {
            console.log(res)
            alert("Votre profile a bien ete enregistrer")
        })
    } else {
        alert("Les mots de passe ne correspondent pas");
    }


}