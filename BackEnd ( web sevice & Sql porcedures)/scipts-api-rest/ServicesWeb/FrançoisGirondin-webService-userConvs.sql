/*crée par François Girondin*/

CREATE SERVICE "userConvs" TYPE 'JSON' AUTHORIZATION OFF USER "dba" URL ON METHODS 'GET' AS call proc_userConvs(:userId);
