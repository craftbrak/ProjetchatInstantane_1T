/*crée par Louis De Wilde*/

CREATE PROCEDURE "dba"."proc_modifConv"( in nouveauNom text ,in convColorVar char (6),in convUserId INTEGER )
 RESULT( newConvName text )
BEGIN
	UPDATE dba.tb_convs set tb_convs.convName = nouveauNom , tb_convs.convColor=convColorVar where idConv = convUserIdToConvId(convUserId);
    select  dba.tb_convs.convName from  tb_convs where idConv = convUserIdToConvId(convUserId);
END;
