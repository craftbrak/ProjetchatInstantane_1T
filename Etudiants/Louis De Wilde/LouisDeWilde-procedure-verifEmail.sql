/*crée par Louis De Wilde*/

CREATE PROCEDURE "dba"."verifEmail"( in emailVar VARCHAR(55) )

BEGIN
	SELECT dba.tb_Identifiants.email from tb_Identifiants WHERE email = emailVar
END;
