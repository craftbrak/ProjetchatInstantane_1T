/*crée par Louis De Wilde*/

CREATE PROCEDURE "dba"."requestChat"( in idConvUserVar integer, in lastId INTEGER  )
 RESULT(id INTEGER , msgContent long varchar,heure date, pseudo char (55) ,idUSer INTEGER )
BEGIN
	Select chat.idMessage, chat.msgContent ,chat.timeOfAdd,ident.pseudo,convUser.Iduser from dba.tb_chat as chat
    natural join tb_convUsers as convUser
    NATURAL join tb_Identifiants as ident
    JOIN tb_convs as conv ON convUser.convId = conv.idConv where conv.idConv = convUserIdtoConvId(idConvUserVar) AND chat.idMessage>lastId
    ORDER BY Chat.idMessage ASC
END;
