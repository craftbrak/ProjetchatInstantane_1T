/* crée par Baptiste Bemelmans*/

CREATE SERVICE "connexion" TYPE 'JSON' AUTHORIZATION OFF USER "dba" URL ON AS call proc_connexion(:emailVerif);
