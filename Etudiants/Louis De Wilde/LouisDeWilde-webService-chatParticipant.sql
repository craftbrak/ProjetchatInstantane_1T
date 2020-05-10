/*crée par Louis De Wilde*/
CREATE SERVICE "chatParticipant" TYPE 'JSON' AUTHORIZATION OFF USER "dba" URL ON AS call chatParticipant(:convUserIdVar);
