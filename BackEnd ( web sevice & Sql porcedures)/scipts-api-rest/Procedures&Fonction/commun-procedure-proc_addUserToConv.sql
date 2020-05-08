/*crée par François Girondin*/

CREATE PROCEDURE "dba"."proc_addUserToConv"( IN id BIGINT, IN nom TEXT )
BEGIN
	INSERT INTO dba.tb_convUsers ( Iduser, convId ) VALUES (id, convNameToConvId(nom) );
END;
