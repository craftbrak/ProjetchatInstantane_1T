/*fonction crée par Fraçois Girondin*/

CREATE FUNCTION "dba"."convNameToConvId"( IN nom TEXT )
RETURNS BIGINT
DETERMINISTIC
BEGIN
	DECLARE "id" BIGINT;
	set "id" = (SELECT dba.tb_convs.idConv FROM tb_convs WHERE dba.tb_convs.convName = nom);
	RETURN "id";
END;
