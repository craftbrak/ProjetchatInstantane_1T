/* crée par Louis De Wilde */

CREATE SERVICE "verifPseudo" TYPE 'RAW' AUTHORIZATION OFF USER "dba" URL ON AS call verifPseudo(:pseudoVar);
