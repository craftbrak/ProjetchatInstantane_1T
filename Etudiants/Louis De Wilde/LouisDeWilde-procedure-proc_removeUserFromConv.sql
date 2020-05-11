/*crée par Louis De Wilde*/

CREATE PROCEDURE "dba"."proc_removeUserFromConv"( in id INTEGER ,in nom text )

BEGIN
	DELETE  from tb_convUsers where dba.tb_convUsers.Iduser =id AND dba.tb_convUsers.convId = convNameToConvId(nom)
END;
