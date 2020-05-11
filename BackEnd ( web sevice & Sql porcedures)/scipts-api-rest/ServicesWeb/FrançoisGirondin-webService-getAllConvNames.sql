/*créé par François Girondin*/

CREATE SERVICE "getAllConvNames" TYPE 'JSON' AUTHORIZATION OFF USER "dba" AS call proc_getAllConvNames();
