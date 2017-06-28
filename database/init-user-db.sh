#!/bin/ash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE TABLE USERS (
      first_name varchar (50),
      last_name varchar (50)
    );
    
EOSQL
