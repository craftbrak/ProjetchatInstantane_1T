/*crée par Baptiste Bemelmans*/

CREATE PROCEDURE "dba"."returnIdCreation" (in emailRecherche varchar(55))
result (idUser bigint)
begin
    select idUser
    from tb_Identifiants
    where email = emailRecherche;
end;
