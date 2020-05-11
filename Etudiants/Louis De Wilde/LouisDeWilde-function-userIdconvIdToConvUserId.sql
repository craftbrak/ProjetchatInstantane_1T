/*crée par Louis De Wilde*/

CREATE FUNCTION "dba"."userIdconvIdToConvUserId"( IN convIdVar INTEGER ,IN userIdVar INTEGER)
RETURNS INTEGER
DETERMINISTIC
BEGIN
	DECLARE convUserId INTEGER;
	set convUserId = (SELECT dba.tb_convUsers.convUserId FROM tb_convUsers WHERE dba.tb_convUsers.Iduser =userIdVar AND dba.tb_convUsers.convId=convIdVar);
	RETURN convUserId;
END;
