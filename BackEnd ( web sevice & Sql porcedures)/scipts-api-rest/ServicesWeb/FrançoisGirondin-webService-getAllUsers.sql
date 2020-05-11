/*crée par François Girondin*/

CREATE SERVICE "getAllUsers" TYPE 'JSON' AUTHORIZATION OFF USER "dba" METHODS 'GET' AS call proc_getAllUsers(:id);
