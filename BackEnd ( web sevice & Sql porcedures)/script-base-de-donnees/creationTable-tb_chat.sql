

CREATE TABLE "dba"."tb_chat" (
	"idMessage" BIGINT NOT NULL DEFAULT AUTOINCREMENT,
	"convUserId" INTEGER NOT NULL,
	"msgContent" LONG VARCHAR NOT NULL,
	"timeOfAdd" "datetime" NOT NULL DEFAULT CURRENT TIMESTAMP,
	CONSTRAINT "idMessage" PRIMARY KEY ( "idMessage" ASC )
) IN "system";
COMMENT ON TABLE "dba"."tb_chat" IS '

';
