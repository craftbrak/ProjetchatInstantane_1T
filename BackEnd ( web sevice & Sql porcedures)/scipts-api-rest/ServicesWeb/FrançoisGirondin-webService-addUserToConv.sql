/*crée par François Girondin*/

CREATE SERVICE "addUsersToConv" TYPE 'RAW' AUTHORIZATION OFF USER "dba" METHODS 'GET,POST' AS call proc_addUsersToConv(:id,:nom);
