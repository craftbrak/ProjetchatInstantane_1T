/*crée par Louis De Wilde*/


CREATE FUNCTION "dba"."convUserIdtoConvId"( IN convUserIdVar INTEGER )
RETURNS INTEGER
DETERMINISTIC
BEGIN
	DECLARE IdConv INTEGER;
	set Idconv = (SELECT dba.tb_convUsers.convId FROM tb_convUsers WHERE dba.tb_convUsers.convUserId =convUserIdVar);
	RETURN IdConv;
END;
