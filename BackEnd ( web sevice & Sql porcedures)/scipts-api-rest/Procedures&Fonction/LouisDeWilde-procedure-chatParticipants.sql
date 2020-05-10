    /*crée par Louis De Wilde*/

    CREATE PROCEDURE "dba"."chatParticipant"(in convUserIdVar INTEGER )
RESULT( participant VARCHAR(55),isAdmin BIT ,convName Varchar(55)   ) 
BEGIN
	SELECT dba.tb_Identifiants.pseudo ,isAdmin ,dba.tb_convs.convName from tb_Identifiants NATURAL join tb_convUsers  join tb_convs on tb_convs.idConv= tb_convUsers.convId WHERE convId =convUserIdtoConvId(convUserIdVar);

END;
