#!/bin/ash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE TABLE USERS (
      first_name varchar (50) NOT NULL,
      last_name varchar (50) NOT NULL,
      primary key (first_name, last_name)
    );
    
EOSQL
