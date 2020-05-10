/* crée par Arthur Schamroth*/

CREATE SERVICE "mettreAJour" TYPE 'RAW' AUTHORIZATION OFF USER "arthur" URL ON METHODS 'GET' AS call mettreAJour(:idUtilisateur,:nvNom,:nvPrenom,:nvMdp,:nvMail,:nvPseudo);
