/* cree par François Girondin*/

CREATE PROCEDURE "dba"."proc_getAllConvNames"( /* [IN | OUT | INOUT] nom_paramètre type_paramètre [DEFAULT valeur_par_défaut], ... */ )
RESULT(nom TEXT)
BEGIN
	SELECT convName from tb_convs
END;
