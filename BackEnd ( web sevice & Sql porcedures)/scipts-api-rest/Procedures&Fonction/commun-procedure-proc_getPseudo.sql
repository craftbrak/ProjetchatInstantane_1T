/*crée par François Girondin*/

CREATE PROCEDURE "dba"."proc_getPseudo"( IN id BIGINT )
RESULT (pseudo CHAR)
BEGIN
	SELECT pseudo from tb_Identifiants WHERE idUser = id
END;
