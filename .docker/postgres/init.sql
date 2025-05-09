-- init.sql

-- Step 01: Create the database
CREATE DATABASE ${DATABASE_NAME};

-- Step 02: Create the user and set the password
CREATE USER ${DATABASE_USER} WITH PASSWORD '${DATABASE_PASSWORD}';

-- Step 03: Set the user as the owner of the database
ALTER DATABASE ${DATABASE_NAME} OWNER TO ${DATABASE_USER};

-- Step 04: Grant all privileges
GRANT ALL PRIVILEGES ON DATABASE ${DATABASE_NAME} TO ${DATABASE_USER};

-- Step 05: Connect to the new database to enable the extension
\connect ${DATABASE_NAME}

-- Step 06: Enable uuid-ossp extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
