--
-- Ce fichier de commandes recharge une base de données qui a été déchargée avec "dbunload".
--
-- (Version:  12.0.1.3152)
--


-- Database file: C:\Users\louis\OneDrive - EPHEC asbl\progra\TP JS-SQL\ProjetLg\Projetlg.db
-- Database CHAR collation: UTF8BIN, NCHAR collation: UCA
-- Connection Character Set: UTF-8
--
-- CREATE DATABASE command: CREATE DATABASE 'C:\\Users\\louis\\OneDrive - EPHEC asbl\\progra\\TP JS-SQL\\ProjetLg\\Projetlg.db' LOG ON 'C:\\Users\\louis\\OneDrive - EPHEC asbl\\progra\\TP JS-SQL\\ProjetLg\\ProjetLg.log' MIRROR 'C:\\Users\\louis\\OneDrive - EPHEC asbl\\progra\\TP JS-SQL\\ProjetLg\\ProjetLg.mlg' CASE IGNORE ACCENT IGNORE PAGE SIZE 4096 COLLATION 'UTF8BIN' NCHAR COLLATION 'UCA' BLANK PADDING OFF JCONNECT ON CHECKSUM ON DBA USER 'dba'
--


SET OPTION date_order          = 'YMD'
go

SET OPTION PUBLIC.preserve_source_format = 'OFF'
go

SET TEMPORARY OPTION tsql_outer_joins = 'ON'
go

SET TEMPORARY OPTION st_geometry_describe_type = 'binary'
go

SET TEMPORARY OPTION st_geometry_on_invalid = 'Ignore'
go

SET OPTION PUBLIC.reserved_keywords = ''
go


-------------------------------------------------
--   Create dbspaces
-------------------------------------------------


-------------------------------------------------
--   Create login policies
-------------------------------------------------


-------------------------------------------------
--   Create users
-------------------------------------------------

GRANT CONNECT,DBA,RESOURCE,BACKUP,REMOTE DBA,VALIDATE,READFILE,PROFILE,READCLIENTFILE,WRITECLIENTFILE TO "dba" IDENTIFIED BY sql
go

GRANT CONNECT,DBA,GROUP,RESOURCE TO "dbo" IDENTIFIED BY ENCRYPTED '\x01\x0c\x4c\x78\x4d\xe9\x0b\x66\x81\xee\xfc\x8d\x83\x12\xce\xbe\xb0\x50\x78\xde\x39\xe8\xf4\x4e\x1b\x29\xa6\x35\xc8\xc0\x1d\xb5\x52\xdf\xc6\x80\xfd'
go

GRANT CONNECT,DBA,RESOURCE,BACKUP,REMOTE DBA,VALIDATE,READFILE,PROFILE,READCLIENTFILE,WRITECLIENTFILE TO "francois" IDENTIFIED BY ENCRYPTED '\x01\x9d\x3c\x15\x43\x95\xeb\xb4\xba\xd4\x51\xbe\xe7\xa4\xf6\xc9\x29\x61\xcc\xad\x84\xc9\x48\xd9\xff\x95\xc8\x9a\xec\xc9\x0b\x05\xcd\x63\x06\x3d\x94'
go
COMMENT ON USER "francois" IS 
	'franÃ§ois'
go

GRANT CONNECT,DBA,RESOURCE,BACKUP,REMOTE DBA,VALIDATE,READFILE,PROFILE,READCLIENTFILE,WRITECLIENTFILE TO "arthur" IDENTIFIED BY ENCRYPTED '\x01\x84\x30\x30\x64\x86\xac\xad\x8b\x82\x30\xfa\xc5\xcf\xc9\x60\x09\xd0\x1e\xbf\xc4\x47\x6a\xee\xf3\xfd\xe9\x57\xcc\x8d\xb7\x0c\x66\xbb\xc7\x9d\x55'
go

GRANT CONNECT,DBA,RESOURCE,BACKUP,REMOTE DBA,VALIDATE,READFILE,PROFILE,READCLIENTFILE,WRITECLIENTFILE TO "baptiste" IDENTIFIED BY ENCRYPTED '\x01\x40\x48\x67\xa9\xd5\x36\xa0\x00\x1e\x39\xea\x90\xe1\x5a\x94\xf8\xd0\xc0\x0a\x6b\x09\xad\x74\xa2\xc1\x73\x2a\xde\x5f\x17\x5b\xbf\x2f\x47\x57\x2f'
go


-------------------------------------------------
--   Create user types
-------------------------------------------------


-------------------------------------------------
--   Create spatial units of measure
-------------------------------------------------

CREATE  SPATIAL UNIT OF MEASURE IF NOT EXISTS  "degree"
	TYPE ANGULAR
	CONVERT USING .017453292519943
go

CREATE  SPATIAL UNIT OF MEASURE IF NOT EXISTS  "meter"
	TYPE LINEAR
	CONVERT USING 1
go

CREATE  SPATIAL UNIT OF MEASURE IF NOT EXISTS  "planar degree"
	TYPE LINEAR
	CONVERT USING 111120
go


-------------------------------------------------
--   Create spatial reference systems
-------------------------------------------------

CREATE  SPATIAL REFERENCE SYSTEM IF NOT EXISTS  "Default"
	IDENTIFIED BY 0
	ORGANIZATION 'Sybase' IDENTIFIED BY 0
	LINEAR UNIT OF MEASURE "metre"
	TYPE PLANAR
	SNAP TO GRID .000001
	TOLERANCE .000001
	AXIS ORDER 'x/y/z/m'
	POLYGON FORMAT 'EvenOdd'
	COORDINATE X BETWEEN -1000000 AND 1000000
	COORDINATE Y BETWEEN -1000000 AND 1000000
go

CREATE  SPATIAL REFERENCE SYSTEM IF NOT EXISTS  "sa_octahedral_gnomonic"
	IDENTIFIED BY 2147483647
	ORGANIZATION 'Sybase' IDENTIFIED BY 2147483647
	LINEAR UNIT OF MEASURE "metre"
	TYPE PLANAR
	SNAP TO GRID .000000000001
	TOLERANCE .000000000001
	AXIS ORDER 'x/y/z/m'
	POLYGON FORMAT 'EvenOdd'
	COORDINATE X BETWEEN 0 AND 1
	COORDINATE Y BETWEEN -1 AND 1
go

CREATE  SPATIAL REFERENCE SYSTEM IF NOT EXISTS  "sa_planar_unbounded"
	IDENTIFIED BY 2147483646
	ORGANIZATION 'Sybase' IDENTIFIED BY 2147483646
	LINEAR UNIT OF MEASURE "metre"
	TYPE PLANAR
	SNAP TO GRID 0
	TOLERANCE 0
	AXIS ORDER 'x/y/z/m'
	POLYGON FORMAT 'EvenOdd'
	COORDINATE X BETWEEN -1.79769313E308 AND 1.79769313E308
	COORDINATE Y BETWEEN -1.79769313E308 AND 1.79769313E308
go

CREATE  SPATIAL REFERENCE SYSTEM IF NOT EXISTS  "WGS 84"
	IDENTIFIED BY 4326
	ORGANIZATION 'EPSG' IDENTIFIED BY 4326
	LINEAR UNIT OF MEASURE "metre"
	ANGULAR UNIT OF MEASURE "degree"
	TYPE ROUND EARTH
	SNAP TO GRID 0
	TOLERANCE 0
	ELLIPSOID SEMI MAJOR AXIS 6378137 INVERSE FLATTENING 298.257223563
	AXIS ORDER 'long/lat/z/m'
	POLYGON FORMAT 'EvenOdd'
	COORDINATE LATITUDE BETWEEN -90 AND 90
	COORDINATE LONGITUDE BETWEEN -180 AND 180
	DEFINITION 'GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4326"]]'
	TRANSFORM DEFINITION '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs'
go

CREATE  SPATIAL REFERENCE SYSTEM IF NOT EXISTS  "WGS 84 (planar)"
	IDENTIFIED BY 1000004326
	ORGANIZATION 'EPSG' IDENTIFIED BY 4326
	LINEAR UNIT OF MEASURE "planar degree"
	ANGULAR UNIT OF MEASURE "degree"
	TYPE PLANAR
	SNAP TO GRID .000000001
	TOLERANCE .000000001
	ELLIPSOID SEMI MAJOR AXIS 6378137 INVERSE FLATTENING 298.257223563
	AXIS ORDER 'long/lat/z/m'
	POLYGON FORMAT 'EvenOdd'
	COORDINATE LATITUDE BETWEEN -90 AND 90
	COORDINATE LONGITUDE BETWEEN -180 AND 180
	DEFINITION 'GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4326"]]'
	TRANSFORM DEFINITION '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs'
go


-------------------------------------------------
--   Create group memberships
-------------------------------------------------

GRANT MEMBERSHIP IN GROUP "dbo" TO "arthur"
go

GRANT MEMBERSHIP IN GROUP "dbo" TO "baptiste"
go

GRANT MEMBERSHIP IN GROUP "dbo" TO "dba"
go


-------------------------------------------------
--   Create remote servers
-------------------------------------------------


-------------------------------------------------
--   Create dbspace permissions
-------------------------------------------------

begin
    for dbspaces as dbcurs cursor for 
	select privilege_type, dbspace_name, user_name 
		from SYS.SYSDBSPACEPERM p 
		join SYS.SYSDBSPACE d on p.dbspace_id = d.dbspace_id
		join SYS.SYSUSER u on u.user_id = p.grantee
    do
	execute immediate 'revoke ' + if privilege_type = 1 then 'CREATE' else 'UNKNOWN' endif + ' on "' + dbspace_name + '" from "' + user_name + '"'
    end for;
end

go

grant CREATE on "system" to "PUBLIC"
go

grant CREATE on "temporary" to "PUBLIC"
go


-------------------------------------------------
--   Create external environments
-------------------------------------------------

IF EXISTS( SELECT * FROM SYS.SYSEXTERNENV WHERE name = 'java' ) THEN 
    ALTER EXTERNAL ENVIRONMENT "java"
        LOCATION '' 
END IF 
go

IF EXISTS( SELECT * FROM SYS.SYSEXTERNENV WHERE name = 'perl' ) THEN 
    ALTER EXTERNAL ENVIRONMENT "perl"
        LOCATION 'perl' 
END IF 
go

IF EXISTS( SELECT * FROM SYS.SYSEXTERNENV WHERE name = 'clr' ) THEN 
    ALTER EXTERNAL ENVIRONMENT "clr"
        LOCATION 'dbextclr[VER_MAJOR]' 
END IF 
go

IF EXISTS( SELECT * FROM SYS.SYSEXTERNENV WHERE name = 'php' ) THEN 
    ALTER EXTERNAL ENVIRONMENT "php"
        LOCATION 'php' 
END IF 
go

IF EXISTS( SELECT * FROM SYS.SYSEXTERNENV WHERE name = 'c_esql32' ) THEN 
    ALTER EXTERNAL ENVIRONMENT "c_esql32"
        LOCATION 'bin32[SLASH]dbexternc[VER_MAJOR]' 
END IF 
go

IF EXISTS( SELECT * FROM SYS.SYSEXTERNENV WHERE name = 'c_odbc32' ) THEN 
    ALTER EXTERNAL ENVIRONMENT "c_odbc32"
        LOCATION 'bin32[SLASH]dbexternc[VER_MAJOR]' 
END IF 
go

IF EXISTS( SELECT * FROM SYS.SYSEXTERNENV WHERE name = 'c_esql64' ) THEN 
    ALTER EXTERNAL ENVIRONMENT "c_esql64"
        LOCATION 'bin64[SLASH]dbexternc[VER_MAJOR]' 
END IF 
go

IF EXISTS( SELECT * FROM SYS.SYSEXTERNENV WHERE name = 'c_odbc64' ) THEN 
    ALTER EXTERNAL ENVIRONMENT "c_odbc64"
        LOCATION 'bin64[SLASH]dbexternc[VER_MAJOR]' 
END IF 
go

IF EXISTS( SELECT * FROM SYS.SYSEXTERNENV WHERE name = 'dbmlsync' ) THEN 
    ALTER EXTERNAL ENVIRONMENT "dbmlsync"
        LOCATION '' 
END IF 
go


-------------------------------------------------
--   Create external environment objects
-------------------------------------------------

create temporary procedure sa_unload_display_table_status( 
    msgid int, ord int, numtabs int, user_name char(128), table_name char(128) )
begin 
  declare @fullmsg long varchar; 
  set @fullmsg = lang_message( msgid ) ||
      ' (' || ord || '/' || numtabs || ') ' ||
      '"' || user_name || '"."' || table_name || '"'; 
  message @fullmsg type info to client; 
end
go


-------------------------------------------------
--   Create tables
-------------------------------------------------

CREATE TABLE "dbo"."maint_plan" (
    "plan_id"                        unsigned int NOT NULL DEFAULT autoincrement
   ,"plan_name"                      varchar(128) NOT NULL
   ,"event_name"                     varchar(128) NULL
   ,"disable_new_connections"        bit NOT NULL
   ,"disconnect_all_users"           bit NOT NULL
   ,"do_validate"                    bit NOT NULL
   ,"validate_database_check"        bit NOT NULL
   ,"validate_checksum_check"        bit NOT NULL
   ,"validate_express_check"         bit NOT NULL
   ,"validate_normal_check"          bit NOT NULL
   ,"do_backup"                      bit NOT NULL
   ,"disk_backup"                    bit NOT NULL
   ,"full_backup"                    bit NOT NULL
   ,"archive_backup"                 bit NOT NULL
   ,"backup_path"                    long varchar NULL
   ,"tape_backup_prompt"             bit NOT NULL
   ,"tape_backup_comment"            long varchar NULL
   ,"save_report_count"              int NULL
   ,"report_to_console"              bit NOT NULL
   ,"email_success"                  bit NOT NULL
   ,"email_failure"                  bit NOT NULL
   ,"email_recipients"               long varchar NULL
   ,"email_smtp_server_name"         long varchar NULL
   ,"email_smtp_port"                int NULL
   ,"email_smtp_sender_name"         long varchar NULL
   ,"email_smtp_sender_address"      long varchar NULL
   ,"email_smtp_auth_user_name"      long varchar NULL
   ,"email_smtp_auth_password"       long varchar NULL
   ,"email_user_id"                  long varchar NULL
   ,"email_user_password"            long varchar NULL
   ,"email_smtp_trusted_certificates" long varchar NULL
   ,"email_smtp_certificate_company" long varchar NULL
   ,"email_smtp_certificate_unit"    long varchar NULL
   ,"email_smtp_certificate_name"    long varchar NULL
   ,"custom_prevalidation_sql"       long varchar NULL
   ,"custom_postbackup_sql"          long varchar NULL
   ,CONSTRAINT "maint_plan_pk" PRIMARY KEY ("plan_id") 
)
go

ALTER TABLE "dbo"."maint_plan"
    ADD CONSTRAINT "maint_plan_uc" UNIQUE ( "plan_name" )
go

CREATE TABLE "dbo"."maint_plan_report" (
    "plan_id"                        unsigned int NOT NULL
   ,"start_time"                     timestamp NOT NULL
   ,"finish_time"                    timestamp NULL
   ,"success"                        bit NOT NULL
   ,"report"                         long varchar NULL
   ,CONSTRAINT "maint_plan_report_pk" PRIMARY KEY ("plan_id","start_time") 
)
go

CREATE GLOBAL TEMPORARY TABLE "dbo"."maint_plan_status" (
    "plan_id"                        unsigned int NOT NULL
   ,"connection_id"                  int NOT NULL
   ,"status"                         char(20) NOT NULL
   ,"percent_complete"               int NULL
   ,CONSTRAINT "maint_plan_status_pk" PRIMARY KEY ("plan_id") 
) NOT TRANSACTIONAL SHARE BY ALL
go

CREATE TABLE "dba"."tb_Identifiants" (
    "idUser"                         bigint NOT NULL DEFAULT global autoincrement(317)
   ,"nom"                            char(55) NOT NULL
   ,"prenom"                         char(55) NOT NULL
   ,"mdpUser"                        varchar(255) NOT NULL
   ,"email"                          varchar(55) NOT NULL
   ,"pseudo"                         char(40) NOT NULL
   ,CONSTRAINT "idUser" PRIMARY KEY ("idUser") 
)
go

ALTER TABLE "dba"."tb_Identifiants"
    ADD CONSTRAINT "uniPseudo" UNIQUE ( "pseudo" )
go

ALTER TABLE "dba"."tb_Identifiants"
    ADD CONSTRAINT "inuEmail" UNIQUE ( "email" )
go

ALTER TABLE "dba"."tb_Identifiants"
    ADD UNIQUE ( "idUser" )
go

GRANT SELECT,INSERT,DELETE,UPDATE,ALTER,REFERENCES ON "dba"."tb_Identifiants" TO "arthur" 
go

GRANT SELECT,INSERT,DELETE,UPDATE,ALTER,REFERENCES ON "dba"."tb_Identifiants" TO "baptiste" 
go

GRANT SELECT,INSERT,DELETE,UPDATE,ALTER,REFERENCES ON "dba"."tb_Identifiants" TO "dba" 
go

GRANT SELECT,INSERT,DELETE,UPDATE,ALTER,REFERENCES ON "dba"."tb_Identifiants" TO "francois" 
go

GRANT SELECT("email","idUser","mdpUser","nom","prenom","pseudo") ON "dba"."tb_Identifiants" TO "dba" 
go

GRANT UPDATE("email","idUser","mdpUser","nom","prenom","pseudo") ON "dba"."tb_Identifiants" TO "dba" 
go

GRANT REFERENCE("email","idUser","mdpUser","nom","prenom","pseudo") ON "dba"."tb_Identifiants" TO "dba" 
go

GRANT SELECT("email","idUser","mdpUser","nom","prenom","pseudo") ON "dba"."tb_Identifiants" TO "arthur" 
go

GRANT UPDATE("email","idUser","mdpUser","nom","prenom","pseudo") ON "dba"."tb_Identifiants" TO "arthur" 
go

GRANT REFERENCE("email","idUser","mdpUser","nom","prenom","pseudo") ON "dba"."tb_Identifiants" TO "arthur" 
go

GRANT SELECT("email","idUser","mdpUser","nom","prenom","pseudo") ON "dba"."tb_Identifiants" TO "baptiste" 
go

GRANT UPDATE("email","idUser","mdpUser","nom","prenom","pseudo") ON "dba"."tb_Identifiants" TO "baptiste" 
go

GRANT REFERENCE("email","idUser","mdpUser","nom","prenom","pseudo") ON "dba"."tb_Identifiants" TO "baptiste" 
go

GRANT SELECT("email","idUser","mdpUser","nom","prenom","pseudo") ON "dba"."tb_Identifiants" TO "francois" 
go

GRANT UPDATE("email","idUser","mdpUser","nom","prenom","pseudo") ON "dba"."tb_Identifiants" TO "francois" 
go

GRANT REFERENCE("email","idUser","mdpUser","nom","prenom","pseudo") ON "dba"."tb_Identifiants" TO "francois" 
go

CREATE TABLE "dba"."tb_convs" (
    "idConv"                         bigint NOT NULL DEFAULT autoincrement
   ,CONSTRAINT "idConv" PRIMARY KEY ("idConv") 
)
go

COMMENT ON TABLE "dba"."tb_convs" IS 
	'
'
go

ALTER INDEX PRIMARY KEY ON "dba"."tb_convs" RENAME TO "idGame"
go

CREATE TABLE "dba"."tb_chat" (
    "idMessage"                      bigint NOT NULL DEFAULT autoincrement
   ,"idUser"                         bigint NOT NULL
   ,"idConv"                         bigint NOT NULL
   ,"msgContent"                     long varchar NOT NULL
   ,"timeOfAdd"                      "datetime" NOT NULL DEFAULT current timestamp
   ,CONSTRAINT "idMessage" PRIMARY KEY ("idMessage") 
)
go

COMMENT ON TABLE "dba"."tb_chat" IS 
	'

'
go


-------------------------------------------------
--   Reload column statistics
-------------------------------------------------

if db_property('PageSize') >= 4096 then 
    LOAD STATISTICS "dba"."tb_chat"."idMessage" 
	65, -1, 5, 3, 
	0x0000000000206a400000000000206a400000000000406a40,
	0x00000000439a183d439a183d
end if
go

if db_property('PageSize') >= 4096 then 
    LOAD STATISTICS "dba"."tb_chat"."idUser" 
	64, -1, 3, 3, 
	0x000000000070884000000000007088400000000000b88e40,
	0x000000009a99193fa975f73e
end if
go

if db_property('PageSize') >= 4096 then 
    LOAD STATISTICS "dba"."tb_chat"."idConv" 
	64, -1, 7, 7, 
	0x000000000000f03f000000000000f03f00000000000000400000000000000040000000000000084000000000000008400000000000406940,
	0x00000000e629613e000000006766e63e9a99193e0000803f9a99193e
end if
go


-------------------------------------------------
--   Reload data
-------------------------------------------------

call sa_unload_display_table_status( 17737, 1, 5, 'dbo', 'maint_plan' )
go

INPUT INTO "dbo"."maint_plan" 
    FROM 'C:/Users/louis/OneDrive - EPHEC asbl/progra/TP JS-SQL/ProjetLg/Output/720.dat'
    FORMAT TEXT
    ESCAPE CHARACTER '\\'
    BY ORDER("plan_id","plan_name","event_name","disable_new_connections","disconnect_all_users","do_validate","validate_database_check","validate_checksum_check","validate_express_check","validate_normal_check","do_backup","disk_backup","full_backup","archive_backup","backup_path","tape_backup_prompt","tape_backup_comment","save_report_count","report_to_console","email_success","email_failure","email_recipients","email_smtp_server_name","email_smtp_port","email_smtp_sender_name","email_smtp_sender_address","email_smtp_auth_user_name","email_smtp_auth_password","email_user_id","email_user_password","email_smtp_trusted_certificates","email_smtp_certificate_company","email_smtp_certificate_unit","email_smtp_certificate_name","custom_prevalidation_sql","custom_postbackup_sql")
    ENCODING 'UTF-8'
go

call sa_unload_display_table_status( 17737, 2, 5, 'dbo', 'maint_plan_report' )
go

INPUT INTO "dbo"."maint_plan_report" 
    FROM 'C:/Users/louis/OneDrive - EPHEC asbl/progra/TP JS-SQL/ProjetLg/Output/721.dat'
    FORMAT TEXT
    ESCAPE CHARACTER '\\'
    BY ORDER("plan_id","start_time","finish_time","success","report")
    ENCODING 'UTF-8'
go

call sa_unload_display_table_status( 17737, 3, 5, 'dba', 'tb_Identifiants' )
go

INPUT INTO "dba"."tb_Identifiants" 
    FROM 'C:/Users/louis/OneDrive - EPHEC asbl/progra/TP JS-SQL/ProjetLg/Output/723.dat'
    FORMAT TEXT
    ESCAPE CHARACTER '\\'
    BY ORDER("idUser","nom","prenom","mdpUser","email","pseudo")
    ENCODING 'UTF-8'
go

call sa_unload_display_table_status( 17737, 4, 5, 'dba', 'tb_convs' )
go

INPUT INTO "dba"."tb_convs" 
    FROM 'C:/Users/louis/OneDrive - EPHEC asbl/progra/TP JS-SQL/ProjetLg/Output/724.dat'
    FORMAT TEXT
    ESCAPE CHARACTER '\\'
    BY ORDER("idConv")
    ENCODING 'UTF-8'
go

call sa_unload_display_table_status( 17737, 5, 5, 'dba', 'tb_chat' )
go

INPUT INTO "dba"."tb_chat" 
    FROM 'C:/Users/louis/OneDrive - EPHEC asbl/progra/TP JS-SQL/ProjetLg/Output/725.dat'
    FORMAT TEXT
    ESCAPE CHARACTER '\\'
    BY ORDER("idMessage","idUser","idConv","msgContent","timeOfAdd")
    ENCODING 'UTF-8'
go

commit work
go


-------------------------------------------------
--   Create text configurations
-------------------------------------------------

ALTER TEXT CONFIGURATION "SYS"."default_char" TERM BREAKER GENERIC
go

ALTER TEXT CONFIGURATION "SYS"."default_nchar" TERM BREAKER GENERIC
go

ALTER TEXT CONFIGURATION "SYS"."default_char" MINIMUM TERM LENGTH 1
go

ALTER TEXT CONFIGURATION "SYS"."default_nchar" MINIMUM TERM LENGTH 1
go

ALTER TEXT CONFIGURATION "SYS"."default_char" MAXIMUM TERM LENGTH 20
go

ALTER TEXT CONFIGURATION "SYS"."default_nchar" MAXIMUM TERM LENGTH 20
go

ALTER TEXT CONFIGURATION "SYS"."default_char" STOPLIST ''
go

ALTER TEXT CONFIGURATION "SYS"."default_nchar" STOPLIST ''
go


-------------------------------------------------
--   Create materialized views
-------------------------------------------------

commit
go



-------------------------------------------------
--   Create indexes
-------------------------------------------------

call sa_unload_display_table_status( 17738, 1, 6, 'dbo', 'maint_plan' )
go

call sa_unload_display_table_status( 17738, 2, 6, 'dbo', 'maint_plan_report' )
go

ALTER TABLE "dbo"."maint_plan_report"
    ADD NOT NULL FOREIGN KEY "maint_plan_report_fk" ("plan_id")
    REFERENCES "dbo"."maint_plan" ("plan_id")
    ON DELETE CASCADE CHECK ON COMMIT 
go

call sa_unload_display_table_status( 17738, 3, 6, 'dbo', 'maint_plan_status' )
go

call sa_unload_display_table_status( 17738, 4, 6, 'dba', 'tb_Identifiants' )
go

call sa_unload_display_table_status( 17738, 5, 6, 'dba', 'tb_convs' )
go

call sa_unload_display_table_status( 17738, 6, 6, 'dba', 'tb_chat' )
go

ALTER TABLE "dba"."tb_chat"
    ADD NOT NULL FOREIGN KEY "tb_Identifiants" ("idUser")
    REFERENCES "dba"."tb_Identifiants" ("idUser")
    
go

ALTER TABLE "dba"."tb_chat"
    ADD NOT NULL FOREIGN KEY "tb_convs" ("idConv")
    REFERENCES "dba"."tb_convs" ("idConv")
    
go

commit work
go


-------------------------------------------------
--   Create immediate materialized views
-------------------------------------------------

commit
go



-------------------------------------------------
--   Create functions
-------------------------------------------------

commit
go


create function dba.getPath()
returns long varchar
deterministic
begin
  declare dbPath long varchar; // chemin de la db
  declare dbName long varchar; // nom de la db
  --
  set dbPath = (select db_property('file')); -- path + nom de la db
  set dbName = (select db_property('name'))+'.db'; -- nom de la db
  set dbPath = "left"(dbPath,length(dbPath)-length(dbName)); -- path seul
  --
  return dbPath // renvoyer path
end
go

COMMENT TO PRESERVE FORMAT ON PROCEDURE "dba"."getPath" IS 
{create FUNCTION dba."getPath"()
returns long varchar
deterministic
BEGIN
 declare dbPath long varchar; // chemin de la db
 declare dbName long varchar; // nom de la db
 --
 set dbPath = (select db_property ('file'));        -- path + nom de la db
 set dbName = (select db_property('name')) + '.db'; -- nom de la db
 set dbPath = left(dbPath, length(dbPath)-length(dbName)); -- path seul
 --
 return dbPath; // renvoyer path
END
}
go


-------------------------------------------------
--   Create views
-------------------------------------------------

commit
go


SET TEMPORARY OPTION force_view_creation='ON'
go

SET TEMPORARY OPTION force_view_creation='OFF'
go

call dbo.sa_recompile_views(1)
go


-------------------------------------------------
--   Create user messages
-------------------------------------------------


-------------------------------------------------
--   Create procedures
-------------------------------------------------

commit
go


create procedure dba.http_getPage( in url char(255) ) 
result( html long varchar ) dynamic result sets 1
begin
  -- 
  call sa_set_http_header('Content-Type','text/html'); // header http
  select xp_read_file(dba.getPath() || url) // renvoyer page
-- 
end
go

COMMENT TO PRESERVE FORMAT ON PROCEDURE "dba"."http_getPage" IS 
{create PROCEDURE dba."http_getPage"( in url char(255) ) 
result( html long varchar ) dynamic result sets 1
begin
  -- 
  call sa_set_http_header('Content-Type','text/html'); // header http
  select xp_read_file(dba.getPath() || url) // renvoyer page
-- 
end
}
go

create procedure dba.http_getCSS( in url char(255) ) 
result( css long varchar ) dynamic result sets 1
begin
  -- 
  call sa_set_http_header('Content-Type','text/css'); // header http
  select xp_read_file(dba.getPath() || 'CSS\\' || url) // renvoyer fichier css
--
end
go

COMMENT TO PRESERVE FORMAT ON PROCEDURE "dba"."http_getCSS" IS 
{create PROCEDURE dba."http_getCSS"(in url char(255) )
result(css long varchar)
BEGIN
-- 
  call sa_set_http_header( 'Content-Type', 'text/css' ); // header http
    select xp_read_file(dba.getPath() || 'CSS\' || url);    // renvoyer fichier css
--
END
}
go

create procedure dba.http_getIMG( in url char(255) ) 
result( img long binary ) dynamic result sets 1
begin
  --
  call sa_set_http_header('Content-Type','image/png'); // header http
  select xp_read_file(dba.getPath() || 'IMG\\' || url) // renvoyer image
--
end
go

COMMENT TO PRESERVE FORMAT ON PROCEDURE "dba"."http_getIMG" IS 
{create PROCEDURE dba."http_getIMG"(in url char(255) )
result(img long binary)
BEGIN
--
  call sa_set_http_header('Content-Type', 'image/png'); // header http
    select xp_read_file(dba.getPath() || 'IMG\' || url);  // renvoyer image
--
END
}
go

create procedure dba.http_getJS( in url char(255) ) 
result( css long varchar ) dynamic result sets 1
begin
  -- 
  call sa_set_http_header('Content-Type','application/javascript'); // header http
  select xp_read_file(dba.getPath() || 'JS\\' || url) // renvoyer fichier javascript
--
end
go

COMMENT TO PRESERVE FORMAT ON PROCEDURE "dba"."http_getJS" IS 
{create PROCEDURE dba."http_getJS"(in url char(255) )
result(css long varchar)
BEGIN
-- 
  call sa_set_http_header( 'Content-Type', 'application/javascript' ); // header http
    select xp_read_file(dba.getPath() || 'JS\' || url);    // renvoyer fichier javascript
--
END
}
go

create procedure dba.insertNewMsg( in msgContentVar long varchar,in idUserVar integer,in idConvVar integer ) 
/* RESULT( nom_colonne type_colonne, ... ) */
begin
  insert into dba.tb_chat( idUser,idConv,msgContent ) values( idUserVar,idConvVar,msgContentVar ) 
end
go

COMMENT TO PRESERVE FORMAT ON PROCEDURE "dba"."insertNewMsg" IS 
{create PROCEDURE dba."insertNewMsg"( in msgContentVar long VARCHAR , in idUserVar INTEGER  , in idConvVar INTEGER  )
/* RESULT( nom_colonne type_colonne, ... ) */
BEGIN
	INSERT INTO dba.tb_chat (idUser , idConv , msgContent) VALUES (idUserVar ,idConvVar , msgContentVar);
END
}
go

create procedure dba.requestChat( in idConvVar integer ) 
result( id integer,msgContent long varchar,heure date,pseudo char(55) ) dynamic result sets 1
begin
  select Chat.idMessage as id,Chat.msgContent,Chat.timeOfAdd,ident.pseudo from dba.tb_chat as Chat natural join tb_Identifiants as ident where Chat.idConv = idConvVar order by Chat.idMessage asc
end
go

COMMENT TO PRESERVE FORMAT ON PROCEDURE "dba"."requestChat" IS 
{create PROCEDURE dba."requestChat"( in idConvVar integer )
 RESULT(id INTEGER , msgContent long varchar,heure date, pseudo char (55) )
BEGIN
	Select Chat.idMessage as id, Chat.msgContent, Chat.timeOfAdd, ident.pseudo from dba.tb_chat as Chat natural join tb_Identifiants as ident where Chat.idConv = idConvVar ORDER BY Chat.idMessage ASC 
END
}
go

create procedure dba.proc_connexion( in emailVerif varchar(55) ) 
result( mdp varchar(255),idUser integer ) dynamic result sets 1
begin
  call sa_set_http_header('Content-type','text/html');
  //Envoi du mot de passe et id
  select ident.mdpUser,ident.idUser
    from dba.tb_Identifiants as ident
    where ident.email = emailVerif
end //Baptiste

go

COMMENT TO PRESERVE FORMAT ON PROCEDURE "dba"."proc_connexion" IS 
{create PROCEDURE dba."proc_connexion" (in emailVerif varchar(55))
result (mdp varchar(255), idUser integer)
begin
    call sa_set_http_header('Content-type', 'text/html');

//Envoi du mot de passe et id
    select ident.mdpUser, ident.idUser
        from dba.tb_Identifiants as ident
        where ident.email = emailVerif;
end

//Baptiste
}
go

create procedure dba.proc_Creation( in newId bigint,in newEmail varchar(55),in newNom char(55),in newPrenom char(55),in newPseudo char(40),newMdpUser varchar(255) ) 
begin
  call sa_set_http_header('Content-type','text/html');
  insert into tb_Identifiants( idUser,email,nom,prenom,pseudo,mdpUser ) values
    ( newId,newEmail,newNom,newPrenom,newPseudo,newMdpUser ) 
end //baptiste

go

COMMENT TO PRESERVE FORMAT ON PROCEDURE "dba"."proc_Creation" IS 
{create PROCEDURE dba."proc_Creation" (in newId bigint, in newEmail varchar(55), in newNom char(55), in newPrenom char(55), in newPseudo char(40), newMdpUser varchar(255))
begin
    call sa_set_http_header('Content-type', 'text/html');
    insert into tb_Identifiants (idUser, email, nom, prenom, pseudo, mdpUser) 
    values (newId, newEmail, newNom, newPrenom, newPseudo, newMdpUser) ;
end
//baptiste
}
go

create procedure dba.proc_verifId( in idVerif bigint ) 
result( email varchar(55) ) dynamic result sets 1
begin
  call sa_set_http_header('Content-type','text/html');
  select ident.email
    from dba.tb_Identifiants as ident
    where ident.idUser = idVerif
end
go

COMMENT TO PRESERVE FORMAT ON PROCEDURE "dba"."proc_verifId" IS 
{create PROCEDURE dba."proc_verifId" (in idVerif bigint)
result (email varchar(55))
begin
    call sa_set_http_header('Content-type', 'text/html');
    select ident.email
    from dba.tb_Identifiants as ident
    where ident.idUser = idVerif
end
}
go

create procedure arthur.infos( in idChoisi integer ) 
result( idUser integer,nom varchar(50),prenom varchar(50),mdpUser varchar(50),mail varchar(50),pseudo varchar(50) ) dynamic result sets 1
begin
  select dba.tb_Identifiants.idUser,dba.tb_Identifiants.nom,dba.tb_Identifiants.prenom,dba.tb_Identifiants.mdpUser,dba.tb_Identifiants.email,dba.tb_Identifiants.pseudo
    from dba.tb_Identifiants
    where idUser = idChoisi
end
go

COMMENT TO PRESERVE FORMAT ON PROCEDURE "arthur"."infos" IS 
{create PROCEDURE arthur."infos"(in idChoisi integer)
result (idUser integer, nom varchar(50), prenom varchar(50), mdpUser varchar(50), mail varchar(50), pseudo varchar(50))
begin 
select dba.tb_Identifiants.idUser, dba.tb_Identifiants.nom, dba.tb_Identifiants.prenom, dba.tb_Identifiants.mdpUser, dba.tb_Identifiants.email, dba.tb_Identifiants.pseudo
from dba.tb_Identifiants
where idUser = idChoisi;
end
}
go

create procedure arthur.mettreAJour( in idUtilisateur integer,in nvNom varchar(50),in nvPrenom varchar(50),
  in nvMdp varchar(50),in nvMail varchar(50),in nvPseudo varchar(50) ) 
begin
  update dba.tb_Identifiants
    set dba.tb_Identifiants.nom = nvNom,dba.tb_Identifiants.prenom = nvPrenom,dba.tb_Identifiants.mdpUser = nvMdp,
    dba.tb_Identifiants.email = nvMail,dba.tb_Identifiants.pseudo = nvPseudo from
    dba.tb_Identifiants
    where dba.tb_identifiants.idUser = idUtilisateur
end
go

COMMENT TO PRESERVE FORMAT ON PROCEDURE "arthur"."mettreAJour" IS 
{create PROCEDURE arthur."mettreAJour"(in idUtilisateur integer, in nvNom varchar(50), in nvPrenom varchar(50),
in nvMdp varchar(50), in nvMail varchar(50), in nvPseudo varchar(50))
BEGIN 
update dba.tb_Identifiants
set dba.tb_Identifiants.nom = nvNom, dba.tb_Identifiants.prenom = nvPrenom, dba.tb_Identifiants.mdpUser = nvMdp,
dba.tb_Identifiants.email = nvMail, dba.tb_Identifiants.pseudo = nvPseudo
from dba.tb_Identifiants
where dba.tb_identifiants.idUser = idUtilisateur;
END
}
go

begin 
  declare prev_count int;
  declare new_count int;
  declare local temporary table dependent_proc ( 
    proc_id    unsigned int    not null, 
    primary key (proc_id) 
  ) in system not transactional; 
  set prev_count = -1;
  lp: loop
      truncate table dependent_proc;
      insert into dependent_proc 
	select proc_id from SYS.SYSPROCEDURE p 
	where exists (select * from SYS.SYSPROCPARM pp 
	    where pp.proc_id = p.proc_id 
	    and parm_name = 'expression' 
	    and parm_type = 1 
	   and domain_id = 1); 
      select count(*) into new_count from dependent_proc;
      if new_count = 0 or (new_count >= prev_count and prev_count >= 0) then
        leave lp;
      end if;
      set prev_count = new_count;
      for l1 as c1 cursor for 
	select u.user_name, proc_name
	from SYS.SYSPROCEDURE p
	    join dependent_proc d on (d.proc_id = p.proc_id)
	    join SYS.SYSUSER u on (p.creator = u.user_id)
      do
        begin
	   execute immediate with quotes on
            'alter procedure "' || user_name || '"."' || proc_name || '" recompile';
          exception when others then
        end
      end for;
  end loop;
end

go


-------------------------------------------------
--   Create sequences
-------------------------------------------------

call dbo.sa_recompile_views(0)
go


-------------------------------------------------
--   Create triggers
-------------------------------------------------

commit
go



-------------------------------------------------
--   Create SQL Remote definitions
-------------------------------------------------


-------------------------------------------------
--   Create MobiLink definitions
-------------------------------------------------


-------------------------------------------------
--   Create Synchronization profiles
-------------------------------------------------


-------------------------------------------------
--   Create logins
-------------------------------------------------


-------------------------------------------------
--   Create events
-------------------------------------------------

commit
go


CREATE EVENT "dba"."resetChat" ENABLE 
HANDLER
begin
  delete from tb_chat
end
go

COMMENT TO PRESERVE FORMAT ON EVENT "resetChat" IS 
{BEGIN 
	Delete from tb_chat
END
}
go

ALTER EVENT "resetChat"
    ADD SCHEDULE "resterChat" START TIME '15:00:00' ON ('Sunday') START DATE '2020/04/30' 
go


-------------------------------------------------
--   Create services
-------------------------------------------------

commit
go


CREATE SERVICE "root" 
    TYPE 'RAW' AUTHORIZATION OFF SECURE OFF URL PATH ON USER "dba"  AS
call http_getPage(:url)
go

CREATE SERVICE "css" 
    TYPE 'RAW' AUTHORIZATION OFF SECURE OFF URL PATH ON USER "dba"  AS
call http_getCSS(:url)
go

CREATE SERVICE "js" 
    TYPE 'RAW' AUTHORIZATION OFF SECURE OFF URL PATH ON USER "dba"  AS
call http_getJS(:url)
go

CREATE SERVICE "img" 
    TYPE 'RAW' AUTHORIZATION OFF SECURE OFF URL PATH ON USER "dba"  AS
call http_getIMG(:url)
go

CREATE SERVICE "newMsg" 
    TYPE 'RAW' AUTHORIZATION OFF SECURE OFF URL PATH ELEMENTS USER "dba"  AS
call insertNewMsg(:msgContentVar,:idUserVar,:idConvVar)
go

CREATE SERVICE "updateChat" 
    TYPE 'JSON' AUTHORIZATION OFF SECURE OFF URL PATH ON USER "dba"  AS
call dba.requestChat(:idConvVar)
go

CREATE SERVICE "modification" 
    TYPE 'JSON' AUTHORIZATION OFF SECURE OFF URL PATH ON USER "dba" USING "METHODS=GET"  AS
call arthur.infos(:idChoisi)
go

CREATE SERVICE "connexion" 
    TYPE 'JSON' AUTHORIZATION OFF SECURE OFF URL PATH ON USER "dba"  AS
call proc_connexion(:emailVerif)
go

CREATE SERVICE "mettreAJour" 
    TYPE 'RAW' AUTHORIZATION OFF SECURE OFF URL PATH ON USER "arthur" USING "METHODS=GET"  AS
call mettreAJour(:idUtilisateur,:nvNom,:nvPrenom,:nvMdp,:nvMail,:nvPseudo)
go

CREATE SERVICE "verifId" 
    TYPE 'JSON' AUTHORIZATION OFF SECURE OFF URL PATH ON USER "dba"  AS
call proc_verifId(:id)
go

CREATE SERVICE "creation" 
    TYPE 'RAW' AUTHORIZATION OFF SECURE OFF URL PATH ON USER "dba"  AS
call proc_Creation(:newId,:newEmail,:newNom,:newPrenom,:newPseudo,:newMdpUser)
go


-------------------------------------------------
--   Create mirror options and servers
-------------------------------------------------


-------------------------------------------------
--   Set DBA password
-------------------------------------------------

GRANT CONNECT TO DBA IDENTIFIED BY ENCRYPTED '\x01\x87\x45\xb7\x3c\x9a\xc8\x76\xe4\x31\x49\x97\x95\x69\x25\xd9\x02\xcd\xc3\x33\x43\x08\x0f\x65\xc1\x66\xfc\xcf\xe0\xc7\x1a\x1f\x53\x8b\x1d\x41\x92'
go


-------------------------------------------------
--   Create options
-------------------------------------------------

SET OPTION date_order =
go

SET OPTION PUBLIC.preserve_source_format =
go

SET OPTION "PUBLIC"."preserve_source_format"='On'
go
