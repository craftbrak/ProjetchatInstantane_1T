/* crée par Louis De Wilde */

CREATE SERVICE "updateChat" TYPE 'JSON' AUTHORIZATION OFF USER "dba" URL ON AS call dba.requestChat(:idConvUserVar,:lastId);
