/* crée par Louis De Wilde */

CREATE SERVICE "ObtenirInfoConv" TYPE 'JSON' AUTHORIZATION OFF USER "dba" URL ON AS call proc_ObtenirInfoConv(:convUserIdvar);
