/*crée par Fraçois Girondin*/

CREATE PROCEDURE "dba"."proc_newConv"( in nom text , in couleur CHAR(6), in idAdmin BIGINT )
BEGIN
	INSERT INTO dba.tb_convs ( convName, convColor) VALUES ( nom, couleur );
    INSERT INTO dba.tb_convUsers ( convId, Iduser, isAdmin ) VALUES ( convNameToConvId( nom ), idAdmin, 1 );
END;
