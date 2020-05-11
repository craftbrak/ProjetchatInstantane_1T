/*crée par François girondin*/

CREATE PROCEDURE "dba"."proc_getAllUsers"( IN id BIGINT )
RESULT (id BIGINT, name VARCHAR, commonChats BIGINT )
BEGIN
	SELECT tb_Identifiants.idUser, pseudo, count(DISTINCT tb_convUsers.convId) as commonChats FROM tb_convUsers LEFT JOIN tb_Identifiants ON tb_convUsers.Iduser = tb_Identifiants.idUser JOIN (SELECT tb_convUsers.convId from tb_convUsers WHERE Iduser = id) as convs on convs.convId = tb_convUsers.convId WHERE tb_Identifiants.idUser != id GROUP BY tb_Identifiants.idUser, pseudo ORDER BY commonChats DESC, pseudo
END;
