$(document).ready(() => {
    $('#newEmail').change((e) => {
        $.post('verifEmail', { emailVar: e.target.value }, (res) => {
            if (res != "") {
                //changer le css de l'element
                $('#erreurCrea').html("Email deja utiliser");
                $('#newEmail').css({
                    "background-color": "red",
                    "borderColor": "red"
                });
                $('#boutonCrea').prop('disabled', true);
            } else {
                $('#boutonCrea').prop('disabled', false);
                $('#erreurCrea').html("");
                $('#newEmail').css({
                    "background-color": "lightgray",
                    "borderColor": "lightgray"
                });
            }
        })
    });
    $('#newPseudo').change((e) => {
        $.post('verifPseudo', { pseudoVar: e.target.value }, (res) => {
            if (res != "") {

                $('#erreurCrea').html("Pseudo deja utiliser");
                //changer le css de l'element

                $('#newPseudo').css({
                    "background-color": "red",
                    "borderColor": "red"
                });
                $('#boutonCrea').prop('disabled', true);
            } else {
                $('#boutonCrea').prop('disabled', false);
                $('#erreurCrea').html("");
                $('#newPseudo').css({
                    "background-color": "lightgray",
                    "borderColor": "lightgray"
                });
            }
        })
    });
})