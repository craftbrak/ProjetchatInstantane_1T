/*crée par François Girondin*/

CREATE SERVICE "getPseudo" TYPE 'RAW' AUTHORIZATION OFF USER "dba" METHODS 'GET' AS call proc_getPseudo(:id);
