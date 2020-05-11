/*crée par Louis De Wilde */

CREATE PROCEDURE "dba"."insertNewMsg"( in msgContentVar long VARCHAR , in convUserIdVar INTEGER   )
/* RESULT( nom_colonne type_colonne, ... ) */
BEGIN
	INSERT INTO dba.tb_chat ( convUserId, msgContent) VALUES (convUserIdVar , msgContentVar);
END;
