/* Il s'agit des procédures et services proposés durant le cours théoriques et les TP pour utiliser Sybase en temps que serveur web. */

--------------- Procédures / fonctions de base -------------------------------------------------------------------

CREATE FUNCTION "dba"."getPath"()
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
END;


CREATE PROCEDURE "dba"."http_getPage"( in url char(255) )
result( html long varchar ) dynamic result sets 1
begin
  --
  call sa_set_http_header('Content-Type','text/html'); // header http
  select xp_read_file(dba.getPath() || url) // renvoyer page
--
end;

CREATE PROCEDURE "dba"."http_getJS"(in url char(255) )
result(css long varchar)
BEGIN
--
  call sa_set_http_header( 'Content-Type', 'application/javascript' ); // header http
    select xp_read_file(dba.getPath() || 'JS\' || url);    // renvoyer fichier javascript
--
END;

CREATE PROCEDURE "dba"."http_getCSS"(in url char(255) )
result(css long varchar)
BEGIN
--
  call sa_set_http_header( 'Content-Type', 'text/css' ); // header http
    select xp_read_file(dba.getPath() || 'CSS\' || url);    // renvoyer fichier css
--
END;

CREATE PROCEDURE "dba"."http_getIMG"(in url char(255) )
result(img long binary)
BEGIN
--
  call sa_set_http_header('Content-Type', 'image/png'); // header http
    select xp_read_file(dba.getPath() || 'IMG\' || url);  // renvoyer image
--
END;


--------------- webservices de base -------------------------------------------------------------------



CREATE SERVICE "js" TYPE 'RAW' AUTHORIZATION OFF USER "DBA" URL ON METHODS 'GET' AS call dba.http_getJS(:url);

CREATE SERVICE "css" TYPE 'RAW' AUTHORIZATION OFF USER "DBA" URL ON METHODS 'GET' AS call dba.http_getCSS(:url);

CREATE SERVICE "img" TYPE 'RAW' AUTHORIZATION OFF USER "DBA" URL ON METHODS 'GET' AS call dba.http_getIMG(:url);