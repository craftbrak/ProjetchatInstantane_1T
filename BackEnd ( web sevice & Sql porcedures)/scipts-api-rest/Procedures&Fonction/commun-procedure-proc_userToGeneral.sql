/*crée par François Girondin*/


CREATE PROCEDURE "dba"."proc_userToGeneral"( IN userId BIGINT )
RESULT (id BIGINT)
BEGIN
	SELECT userIdconvIdToConvUserId(3,userId)
END;
