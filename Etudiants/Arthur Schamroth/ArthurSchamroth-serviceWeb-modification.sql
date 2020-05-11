/* crée par Arthur Schamroth*/

CREATE SERVICE "modification" TYPE 'JSON' AUTHORIZATION OFF USER "dba" URL ON METHODS 'GET' AS call arthur.infos(:idChoisi);
