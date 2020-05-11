/*crée par Louis De Wilde*/

CREATE PROCEDURE "dba"."proc_ObtenirInfoConv"( in convUseridVar integer)
/* RESULT( nom_colonne type_colonne, ... ) */
BEGIN
	SELECT "dba"."tb_convs"."convColor",tb_Identifiants.idUser ,
"dba"."tb_convs"."convName",
"dba"."tb_convUsers"."isAdmin",
"dba"."tb_Identifiants"."pseudo",
"dba"."tb_convs"."idConv"
FROM ( "dba"."tb_convs" JOIN "dba"."tb_convUsers" ON "dba"."tb_convs"."idConv" = "dba"."tb_convUsers"."convId" ) JOIN "dba"."tb_Identifiants" ON "dba"."tb_convUsers"."Iduser" = "dba"."tb_Identifiants"."idUser"
WHERE convId=convUserIdToConvId(convUserIdVar)
ORDER BY "dba"."tb_Identifiants"."idUser" ASC
END;
