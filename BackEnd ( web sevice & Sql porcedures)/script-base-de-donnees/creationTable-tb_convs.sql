
CREATE TABLE "dba"."tb_convs" (
	"idConv" BIGINT NOT NULL DEFAULT AUTOINCREMENT,
	"convName" "text" NULL,
	"convColor" CHAR(6) NOT NULL,
	CONSTRAINT "idConv" PRIMARY KEY ( "idConv" ASC )
) IN "system";
COMMENT ON TABLE "dba"."tb_convs" IS '
';
