/* crée par Baptiste Bemelmans*/

CREATE SERVICE "creation" TYPE 'JSON' AUTHORIZATION OFF USER "dba" URL ON AS call proc_Creation(:newEmail,:newNom,:newPrenom,:newPseudo,:newMdpUser);
