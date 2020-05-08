/*crée par Baptiste Bemelmans*/


CREATE PROCEDURE "dba"."proc_Creation" (in newEmail varchar(55), in newNom char(55), in newPrenom char(55), in newPseudo char(40), newMdpUser varchar(255))
begin
    call sa_set_http_header('Content-type', 'text/html');
    insert into tb_Identifiants (email, nom, prenom, pseudo, mdpUser)
    values (newEmail, newNom, newPrenom, newPseudo, newMdpUser) ;
end
/*baptiste;*/
