/* crée par Louis De Wilde */

CREATE PROCEDURE "dba"."deleteMsg"( in MsgId INTEGER  )

BEGIN
	DELETE from tb_chat where dba.tb_chat.idMessage=MsgId;
END;

/* cette procedure n'est pas en utilisation pour le moment ,
   les fonctions de modification des messages n'etait pas tres appreciée par notre professeur,
   j'ai donc decider de desactiver l'interface utilisateur mais de conserver le code fonctionel malgré tout
 */