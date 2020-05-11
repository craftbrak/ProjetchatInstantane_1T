/* crée par Louis De Wilde */


CREATE FUNCTION "dba"."ConvUserIdToUserId"( IN convUserIdVar INTEGER )
RETURNS INTEGER
DETERMINISTIC
BEGIN
	DECLARE Iduser INTEGER;
	set Iduser = (SELECT dba.tb_convUsers.Iduser FROM tb_convUsers WHERE dba.tb_convUsers.convUserId =convUserIdVar);
	RETURN Iduser;
END;
