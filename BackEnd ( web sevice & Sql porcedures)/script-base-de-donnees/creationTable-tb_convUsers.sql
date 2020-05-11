
CREATE TABLE "dba"."tb_convUsers" (
	"convUserId" INTEGER NOT NULL DEFAULT AUTOINCREMENT,
	"Iduser" BIGINT NOT NULL,
	"convId" BIGINT NOT NULL,
	"isAdmin" BIT NOT NULL DEFAULT 0,
	CONSTRAINT "pk_convUser" PRIMARY KEY ( "convUserId" ASC )
) IN "system";
ALTER TABLE "dba"."tb_convUsers" ADD CONSTRAINT "tb_convs" NOT NULL FOREIGN KEY ( "convId" ASC ) REFERENCES "dba"."tb_convs" ( "idConv" );
ALTER TABLE "dba"."tb_convUsers" ADD CONSTRAINT "tb_Identifiants" NOT NULL FOREIGN KEY ( "Iduser" ASC ) REFERENCES "dba"."tb_Identifiants" ( "idUser" );
