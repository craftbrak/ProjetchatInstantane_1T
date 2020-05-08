
CREATE TABLE "dba"."tb_convUsers" (
	"convUserId" INTEGER NOT NULL DEFAULT AUTOINCREMENT,
	"Iduser" BIGINT NOT NULL,
	"convId" BIGINT NOT NULL,
	"isAdmin" BIT NOT NULL DEFAULT 0,
	CONSTRAINT "pk_convUser" PRIMARY KEY ( "convUserId" ASC )
) IN "system";
