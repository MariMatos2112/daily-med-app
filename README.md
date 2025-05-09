# Daily Medi API - Ballast Lane Tech Interview

## 📌 Overview

This project is a microservice-based application designed to extract drug indications from **DailyMed** labels, map them to **ICD-10 codes**, and serve the structured data via an enterprise-grade API. The system follows **Clean Architecture** principles, includes **test-driven development**, and is fully **Dockerized**.

---

## ⚙️ Core Functionality

- Scrapes or parses **DailyMed** drug labels (currently: *Dupixent*)
- Extracts **indications** from label sections
- Handles:
  - Synonyms (e.g., *Hypertension* vs. *High Blood Pressure*)
  - Multiple indications per drug
  - Unmappable conditions
- Stores mappings in a **relational database**
- Queryable via a **RESTful API**
- Well structured - DDD based

---

## 🏁 How to Run

### 🧩 Prerequisites

- Clone your repo
- Make sure you have the following installed:
  - **Node.js** (version 22)
  - **npm**
  - **Next.js**
  - **PostgreSQL**
  - **Docker**

---
![image](https://github.com/user-attachments/assets/1d673b9b-018c-4613-b3ed-5c91902e1e81)


### 🐳 Docker Run

To start everything using Docker:
```bash
docker-compose up
```
---

### 🔧 Manual Run (without Docker)

If Docker doesn't work for you, you can run the app manually. Just make sure the database is created and set up before you start the app.

#### 🛠️ Database Setup

1. **Create your database** (use the same name as `DATABASE_NAME` in your `.env` file):
```bash
CREATE DATABASE your_database_name;
```
2. Create your database user (if it doesn't exist yet) and make them the OWNER Of the table
```bash
CREATE USER database_user WITH PASSWORD 'your_password';
ALTER DATABASE your_database_name OWNER TO database_user;
```
3. To avoid errors, GRANT ALL PRIVILEGES to this user;
```bash
GRANT ALL PRIVILEGES ON DATABASE your_database_name TO database_user;
```
4. Create uuid-oosp extension on the db;
```bash
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```
This ensures that the uuid_generate_v4() function is available for generating UUIDs in your migrations.

5. Create the migration file by running package.json script:
```bash
migration:generate
```
This will generate a migration file in the src/migrations folder.

6. Run your migration and see your tables being created!
```bash
npm run migration:run
```

### After that, just run `npm run start:dev` to see the magic happen! ✨

## Documentation 📚
Swagger documentation is available at: [http://localhost:3000/api#/](http://localhost:3000/api#/)
![image](https://github.com/user-attachments/assets/da9d0ffa-48ad-4351-983a-e26d6b3617b6)


## Unit Tests 🧪
Jest unit tests were implemented with coverage greater than 90%. ✅

## Postman Collection 📦
The Postman collection is available in the root folder.
![image](https://github.com/user-attachments/assets/2cdb2176-aba7-4459-9819-10597756f399)

