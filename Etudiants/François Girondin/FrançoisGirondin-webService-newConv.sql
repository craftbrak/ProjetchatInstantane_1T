/*crée par François Girondin*/

CREATE SERVICE "newConv" TYPE 'RAW' AUTHORIZATION OFF USER "dba" METHODS 'POST' AS call proc_newConv(:name,:color,:admin);
COMMENT ON SERVICE "newConv" IS '
';
