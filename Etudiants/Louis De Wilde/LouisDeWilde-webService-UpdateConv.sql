/* crée par Louis De Wilde */

CREATE SERVICE "Updateconv" TYPE 'RAW' AUTHORIZATION OFF USER "dba" URL ON AS call proc_modifConv(:nouveauNom,:convColorVar,:convUserId);
