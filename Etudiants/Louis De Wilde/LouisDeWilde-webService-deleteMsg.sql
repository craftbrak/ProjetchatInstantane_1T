/*crée par Louis De Wilde*/

CREATE SERVICE "deleteMsg" TYPE 'JSON' AUTHORIZATION OFF USER "dba" URL ON AS call deleteMsg(:MsgId);
/* cette procedure n'est pas en utilisation pour le moment ,
   les fonctions de modification des messages n'etait pas tres appreciée par notre professeur,
   j'ai donc decider de desactiver l'interface utilisateur mais de conserver le code fonctionel malgré tout
 */