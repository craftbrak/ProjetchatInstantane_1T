/*crée par Baptiste Bemelmans*/
CREATE PROCEDURE "dba"."proc_connexion" (in emailVerif varchar(55))
result (mdp varchar(255), idUser integer)
begin
    call sa_set_http_header('Content-type', 'text/html');

/*Envoi du mot de passe et id*/
    select ident.mdpUser, ident.idUser
        from dba.tb_Identifiants as ident
        where ident.email = emailVerif;
end

/*Baptiste;*/
