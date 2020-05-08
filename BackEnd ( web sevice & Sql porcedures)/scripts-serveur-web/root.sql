CREATE SERVICE "root" TYPE 'RAW' AUTHORIZATION OFF USER "dba" URL ON AS call http_getPage(:url);
