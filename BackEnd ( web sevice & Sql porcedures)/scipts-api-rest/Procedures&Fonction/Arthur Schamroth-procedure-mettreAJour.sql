/* crée par Arthur Schamroth*/


CREATE PROCEDURE "arthur"."mettreAJour"(in idUtilisateur integer, in nvNom varchar(50), in nvPrenom varchar(50),
in nvMdp varchar(50), in nvMail varchar(50), in nvPseudo varchar(50))
BEGIN
update dba.tb_Identifiants
set dba.tb_Identifiants.nom = nvNom, dba.tb_Identifiants.prenom = nvPrenom, dba.tb_Identifiants.mdpUser = nvMdp,
dba.tb_Identifiants.email = nvMail, dba.tb_Identifiants.pseudo = nvPseudo
from dba.tb_Identifiants
where dba.tb_identifiants.idUser = idUtilisateur;
END;
