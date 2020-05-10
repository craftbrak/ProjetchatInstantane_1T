/*crée par Baptiste Bemelmans*/

CREATE SERVICE "redirectCreation" TYPE 'JSON' AUTHORIZATION OFF USER "dba" URL ON AS call returnIdCreation(:emailRecherche);
