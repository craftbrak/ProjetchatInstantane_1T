
CREATE TABLE "dba"."tb_Identifiants" (
	"idUser" BIGINT NOT NULL DEFAULT AUTOINCREMENT UNIQUE,
	"nom" CHAR(55) NOT NULL,
	"prenom" CHAR(55) NOT NULL,
	"mdpUser" VARCHAR(255) NOT NULL,
	"email" VARCHAR(55) NOT NULL UNIQUE,
	"pseudo" CHAR(85) NOT NULL,
	CONSTRAINT "idUser" PRIMARY KEY ( "idUser" ASC )
) IN "system";
