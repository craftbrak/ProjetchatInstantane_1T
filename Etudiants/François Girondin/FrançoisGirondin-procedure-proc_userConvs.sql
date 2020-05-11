/*crée par François Girondin*/
CREATE PROCEDURE "dba"."proc_userConvs"( IN userId BIGINT )
RESULT ( id BIGINT, nom TEXT, couleur CHAR(6) )
BEGIN
	SELECT convUserId, convName, convColor FROM tb_convUsers JOIN tb_convs ON tb_convs.idConv = tb_convUsers.convId WHERE Iduser = userId
END;
