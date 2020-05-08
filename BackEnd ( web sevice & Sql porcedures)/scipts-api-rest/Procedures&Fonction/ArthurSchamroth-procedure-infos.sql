/* crée par Arthur Schamroth*/

CREATE PROCEDURE "arthur"."infos"(in idChoisi integer)
result (idUser integer, nom varchar(50), prenom varchar(50), mdpUser varchar(50), mail varchar(50), pseudo varchar(50))
begin
select dba.tb_Identifiants.idUser, dba.tb_Identifiants.nom, dba.tb_Identifiants.prenom, dba.tb_Identifiants.mdpUser, dba.tb_Identifiants.email, dba.tb_Identifiants.pseudo
from dba.tb_Identifiants
where idUser = idChoisi;
end;
