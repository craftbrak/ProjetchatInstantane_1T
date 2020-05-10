Web Service UpdateChat:

    Description : Recupere les nouveau message d'une conversation.
    Pramettres : 
            -:IdConvVar Integer (Id de conversation Utilisateur ( lien entre une conversation et un utilisateur))
            -:lastId Integer ( dernier Id de message connut)

    Format de réposes : Json
        Propriété des élement du tableau:
            -id (number)
            -msgContent (string)
            -pseudo(string)
            -idUser(number)      

Web Service removeUserFromConv :
    
    Description : Retire un utilisateur d'une conversation
    Pramettres :
            -:id Integer(l'Identifiant de l'utilisateur)
            -:nom text (nom de la conversation )
    
    Format des réposes : RAW.

Web Service ObtenirInfoConv:

    Description : Recuperes les inforamtion sur un conversation ( id, nom et couleurs)
    Pramettres : 
            -:convUserIdVar Interger (Id de conversation Utilisateur ( lien entre une conversation et un utilisateur))
    
    Format de réposes : Json
        Propriété des élement du tableau:
            -convColor (string) (couleur d'un conversation)
            -convName (string) ( Nom d'une conversation )
            -isAdmin (boolean)  ( Si vrai l'utilisateur est administrateur de la conversation)
            -pseudo (string) ( Pseudo de l'utilisateur)

Web Service newMSG:
    
    Description : insert un nouveau message dans la table tb_chat
    Pramettres: 
            -msgContentVar Varchar ( les contenu d'un msessage)
            -convUserIdVar Interger (Id de conversation Utilisateur ( lien entre une conversation et un utilisateur))
    
    Format de réposes : RAW

Web Service deleteMsg :
    
    Description: supprime un message d'un conversation 
    Pramettres : 
            -msgId Interger
    
    Format de réposes : RAW

web Service chatParticipant :

    Description : Recupere tout les participants d'une conversation 
    Pramettres :
            -convUserIdVar Integer (Id de conversation Utilisateur ( lien entre une conversation et un utilisateur))
    
    Format de réposes: Json
        Propriété des élement du tableau:
            -participant (string) ( pseudo d'un participant a la conversation)
            -isAdmin (boolean) ( indique si oui ou nom l'utilisateur est administrateur)
            -convName (string) ( Nom De la conversation )
