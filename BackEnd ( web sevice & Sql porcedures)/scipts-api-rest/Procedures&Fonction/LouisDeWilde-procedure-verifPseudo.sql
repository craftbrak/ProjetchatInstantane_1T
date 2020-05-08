/*crée par Louis De Wilde */

CREATE PROCEDURE "dba"."verifPseudo"( in pseudoVar VARCHAR(55) )

BEGIN
	SELECT dba.tb_Identifiants.pseudo from tb_Identifiants WHERE pseudo = pseudoVar
END;
