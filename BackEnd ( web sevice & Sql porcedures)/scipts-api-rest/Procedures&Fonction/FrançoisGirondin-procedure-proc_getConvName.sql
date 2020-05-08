/*Crée par Francois Girondin*/


CREATE PROCEDURE "dba"."proc_getConvName"( IN id BIGINT  )
RESULT( nom TEXT )
BEGIN
	SELECT convName from tb_convs WHERE idConv = convUserIdtoConvId(id)
END;
