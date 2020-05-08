/*crée par François Girondin*/

CREATE SERVICE "userToGeneral" TYPE 'RAW' AUTHORIZATION OFF USER "dba" METHODS 'GET' AS call proc_userToGeneral(:id);
