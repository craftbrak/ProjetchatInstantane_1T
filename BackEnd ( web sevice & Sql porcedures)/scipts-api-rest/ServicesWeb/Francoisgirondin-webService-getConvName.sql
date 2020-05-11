/*crée par François Girondin*/

CREATE SERVICE "getConvName" TYPE 'RAW' AUTHORIZATION OFF USER "dba" AS call proc_getConvName(:id);
