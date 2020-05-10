/* crée par Louis De Wilde */

CREATE SERVICE "newMsg" TYPE 'RAW' AUTHORIZATION OFF USER "dba" URL ELEMENTS AS call insertNewMsg(:msgContentVar,:convUserIdVar);
