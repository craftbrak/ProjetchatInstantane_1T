# 1TL1 Projet Tchat

## Presentation de l'équipe

* Baptiste Bemelmans
* Louis De Wilde
* François Girondin
* Arthur Schamroth

## Description du projet

Pour ce projet, nous avons décidé de réaliser un tchat de discussion, du même style que messenger ou whatsApp.
Nous désirons y implémenter différents services tel qu'un système d'inscription et de connexion, un chat global et un système de discussions privées. L'utilisateur aura également la possibilité de modifier son profil.

## Comment Instaler
  -Pour commencer telecharger le repository complet, installer Sybase avec SQL anywhere . 
  
  -Ensuite crée un base de donnée Sybase et un service Web SqlAnywhere, la base de donnée doit etre remplie avec les scripts fournit dans le dossier BackEnd. Cette base doit etre dans le dossier parent au dossier backend ( le dossier du racine du site)
  Pour que le site fonctionne correctement une structure de fichier spécifique est nécésaire , pour ce faire il vous sufit d'extraire le contenu du dossier FrontEnd dans son dossier parent (la ou ce situe la base de donnée),

  -demarer le serveur Web Sybase , et si tout a correctement ete mit ne place vous pouver naviger sur index.html pour decouvrir le site ☺ 
## Aspects implémentés 

### Backend

* Script API rest
  * Procédures
    * Arthur Schamroth - mettreAJour.sql
    * Arthur Schamroth - infos.sql
    * Baptiste Bemelmans - proc_Creation.sql
    * Baptiste Bemelmans - proc_Connexion.sql
    * Baptiste Bemelmans - returnIdCreation.sql
    * François Girondin - proc_getAllConvNames.sql
    * François Girondin - proc_getAllUsers.sql
    * François Girondin - proc_getConvName.sql
    * François Girondin - proc_newConv.sql
    * François Girondin - proc_userConvs.sql
    * Louis De Wilde - deleteMsg.sql
    * Louis De Wilde - insertNewMsg.sql
    * Louis De Wilde - proc_ObtenirInfoConv.sql
    * Louis De Wilde - proc_modifConv.sql
    * Louis De Wilde - proc_removeUserFromConv.sql
    * Louis De Wilde - requestChat.sql
    * Louis De Wilde - verifEmail.sql
    * Louis De Wilde - verifPseudo.sql
    * Commun - proc_addUserToConv.sql
    * Commun - proc_getPseudo.sql
    * Commun - proc_userToGeneral.sql

  * Fonctions
    * Louis De Wilde - userIdconvIdToConvUserId.sql
    * Commun - convNameToConvid.sql
    * Commun - convUserIdToConvId.sql
    * Commun - convUserIdToUserId.sql

  * Services Web
    * Arthur Schamroth - modification.sql
    * Arthur Schamroth - mettreAJour.sql
    * Baptiste Bemelmans - connexion.sql
    * Baptiste Bemelmans - creation.sql
    * Baptiste Bemelmans - redirectionCreation.sql
    * Francois Girondin - getConvName.sql
    * François Girondin - addUserToConv.sql
    * François Girondin - getAllConvNames.sql
    * François Girondin - getAllUsers.sql
    * François Girondin - newConv.sql
    * François Girondin - userConvs.sql
    * Louis De Wilde - ObtenirInfoConv.sql
    * Louis De Wilde - UpdateConv.sql
    * Louis De Wilde - chatParticipant.sql
    * Louis De Wilde - deleteMsg.sql
    * Louis De Wilde - newMsg.sql
    * Louis De Wilde - removeUserFromConv.sql
    * Louis De Wilde - updateChat.sql
    * Louis De Wilde - verifEmail.sql
    * Louis De Wilde - verifPseudo.sql
    * Commun - getPseudo.sql
    * Commun - obtenirUserId.sql
    * Commun - usertoGeneral.sql

* Script Base de données
  * InsertionDonneesMinimales-ConvGeneral.sql
  * creationTable-tb_Identifiants.sql
  * creationTable-tb_chat.sql
  * creationTable-tb_convUsers.sql
  * creationTable-tb_convs.sql

* Script Seveur Web 
  * root.sql
  * webservices-procedures-base.sql

### Frontend

* JavaScript
  * Arthur Schamroth - modifier.js
  * Baptiste Bemelmans - connexion.js
  * Baptiste Bemelmans - creation.js
  * François Girondin - modConv.js
  * François Girondin - multiConv.js
  * François Girondin - new.js
  * Louis De Wilde - chat.js
  * Louis De Wilde - main.js
  * newUserVerif.js

* CSS
  * Commun - chat.css
  * Commun - customForm.css
  * Commun - index.css
  * Commun - main.css
  * Commun - new.css

* HTML
  * Arthur Schamroth - modificationProfil.html
  * Baptiste Bemelmans - connexion.html
  * Baptiste Bemelmans - creation.html
  * François Girondin - modifConv.html
  * François Girondin - new.html
  * Louis De Wilde - play.html
  * Louis De Wilde - 404.html
  * Louis De Wilde - index.html

## Détail API rest

* webService-connexion :
  * Appelle la procédure proc_connexion avec pour paramètre l'email de connexion (emailVerif varchar(55)).<br/>
	Il renvoie le mot de passe (mdp varchar(255)) et l'identifiant utilisateur (idUser integer)  correspondant à l'email donné.<br/>
	Le format du webservice est le JSON.
  
* webService-creation :
  * Appelle la procédure proc_Creation avec pour paramètre l'email (newEmail varchar(55)), le nom (newNom char(55)), le prénom (newPrenom char(55)), le pseudo (newPseudo char(40)) et le mot de passe (newMdpUser varchar(255)).<br/>
	Il crée un nouvel utilisateur dans la table des identifiants (tb_Identifiants) avec ces paramètres.<br/>
	Le format du webservice est le JSON.
  
* webService-redirectionCreation :
   * Appelle la procédure returnIdCreation avec pour paramètre l'email de l'utilisateur (emailRecherche varchar(55)).<br/>
	Il renvoie l'identifiant (idUser bigint) correspondant à l'email reçu en paramètre.<br/>
	Le format du webservice est le JSON.<br/>

* webService-UpdateConv :
  * Appelle la procédure proc_modifConv avec pour paramètre le nom de la conversation (nouveauNom text), la couleur de la conversation (convColorVar char(6)) et l'identifiant de corrélation conversation-utilisateur (convUserId interger).<br/>
	Il met à jour le nom , la couleur de la conversation pour laquelle l'identifiant correspond à celui récupérer grâce à la fonction convUserIdToConvId ayant pour paramètre convUserId qui récupère l'identifiant d'une conversation (IdConv integer) à partir d'un identifiant de corrélation conversation-utilisateur (convUserIdVar integer).<br/>
	Le résultat de la procédure est newConvName de type "text".<br/>
	Le format du webservice est le RAW.

* webService-verifEmail :
  * Appelle la procédure verifEmail avec pour paramètre l'email (emailVar varchar(55)).<br/>
	Il renvoie l'email de tb_Identifiants correspondant à l'email donnée en paramètre.<br/>
	Le format du webservice est le RAW.
  
* webService-verifPseudo : 
  * Appelle la procédure verifPseudo avec pour paramètre le pseudo (pseudoVar varchar(55)).<br/>
	Il renvoie le pseudo de tb_Identifiants correspondant au pseudo donné en paramètre.<br/>
	Le format du webservice est le RAW.
  
* webService-updateChat :  
  * Description : Recupere les nouveau message d'une conversation.<br/>
  * Paramètres : 
     * IdConvVar Integer (Id de conversation Utilisateur ( lien entre une conversation et un utilisateur))
     * lastId Integer ( dernier Id de message connut)

   * Format de réposes : Json
   * Propriété des élement du tableau:
        * id (number)
        * msgContent (string)
        * pseudo(string)
        * idUser(number)     
        
* webService-removeUserFromConv:
   *  Description : Retire un utilisateur d'une conversation
   * Paramètres:
      * id Integer(l'Identifiant de l'utilisateur)
      * nom text (nom de la conversation)
   * Format des réposes : RAW.
   
* webService ObtenirInfoConv:
   * Description : Recuperes les inforamtion sur un conversation ( id, nom et couleurs)
   * Paramètre : 
      * convUserIdVar Interger (Id de conversation Utilisateur ( lien entre une conversation et un utilisateur))
   * Format de réposes : Json
   * Propriétés des élement du tableau :
      * convColor (string) (couleur d'un conversation)
      * convName (string) ( Nom d'une conversation )
      * isAdmin (boolean)  ( Si vrai l'utilisateur est administrateur de la conversation)
      * pseudo (string) ( Pseudo de l'utilisateur)

* webService newMSG:
  * Description : insert un nouveau message dans la table tb_chat
  * Paramètres: 
    * msgContentVar Varchar ( les contenu d'un msessage)
    * convUserIdVar Interger (Id de conversation Utilisateur ( lien entre une conversation et un utilisateur))
  * Format de réposes : RAW

* Web Service deleteMsg:
  * Description: supprime un message d'un conversation 
  * Paramètre :
    * -msgId Interger
  * Format de réposes : RAW

* webService chatParticipant :
  * Description : Recupere tout les participants d'une conversation 
  * Paramètre :
    * c
  * Format de réposes: Json
  * Propriété des élement du tableau: 
    * participant (string) (pseudo d'un participant a la conversation)
    * isAdmin (boolean) (indique si oui ou nom l'utilisateur est administrateur)
    * convName (string) (Nom De la conversation)
    
## Détail DB
* tb_chat 
  * Cette table contient les id des messages, l'id de conversation de l'utilisateur, le contenu de chaque message, la date et l'heure d'ajout du message. Voici les différents noms de données présentes dans cette table :
    * idMessage
      * Utilise un id autoincrémenté
    * convUserId
    * msgContent
    * timeOfAdd

* tb_convs
  * Cette table contient l'ensemble des différentes discussions en leur attribuant à chacune un id ainsi qu'une couleur choisie par l'utilisateur. La table est composée de ces différentes colonnes :
    * idConv
      * Utilise un id autoincrémenté
    * convName 
    * convColor
    
* tb_convUsers
    * Cette table contient l'

* tb_Identifiants
    * Cette table contient les informations de chaque utilisateur telles que son id, son nom, son prénom, son mot de passe, son adresse mail et son pseudo. La table est composée de ces colonnes :
      * idUser 
        * Utilise un id autoincrémenté 
      * nom
      * prenom
      * mdpUser
      * email
      * pseudo
