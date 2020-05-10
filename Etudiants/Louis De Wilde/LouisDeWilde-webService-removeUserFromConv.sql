/* crée par Louis De Wilde */

CREATE SERVICE "removeUserFromConv" TYPE 'RAW' AUTHORIZATION OFF USER "dba" URL ON AS call proc_removeUserFromConv(:id,:nom);
