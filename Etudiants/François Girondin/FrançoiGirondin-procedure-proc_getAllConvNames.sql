/* cree par François Girondin*/

CREATE PROCEDURE "dba"."proc_getAllConvNames"()
RESULT(nom TEXT)
BEGIN
	SELECT convName from tb_convs
END;
