/* crée par Louis De Wilde */

CREATE SERVICE "obtenirUserId" TYPE 'JSON' AUTHORIZATION OFF USER "dba" METHODS 'GET,POST' AS select ConvUserIdToUserId(:convUserId) as UserId;
