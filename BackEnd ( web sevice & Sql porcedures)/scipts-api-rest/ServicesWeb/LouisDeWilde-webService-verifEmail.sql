/* crée par Louis De Wilde */

CREATE SERVICE "verifEmail" TYPE 'RAW' AUTHORIZATION OFF USER "dba" URL ON AS call verifEmail(:emailVar);
