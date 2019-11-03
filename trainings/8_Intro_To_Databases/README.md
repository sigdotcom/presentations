# Training 8 - Introduction to Databases/Docker
This tutorial will discuss the following topics:
+ [Databases](https://en.wikipedia.org/wiki/Database) (as an abstract concept)
+ [SQL](https://en.wikipedia.org/wiki/SQL)
+ [PostgreSQL](https://www.postgresql.org/)
+ [docker](https://docs.docker.com/get-started/)
+ [docker-compose](https://docs.docker.com/compose/)

by taking the application created in training 6/7 and using a database instead of
a in-memory list for storing todos. The database and application will also be
updated to run as a [docker-compose](https://docs.docker.com/compose/) file.

This tutorial is recommended to be run as a code along (have the students bring
their laptop and code with you). The code in this folder is the final product
after the first day.

## Procedure
1. Explain what a database is a high level
    + Talk about tables
    + Relational Database Management System (RDBMS)
    + relations
    + 'querying' and 'updating' data
2. Explain what containers are at a high level
    + Technically not a VM, but like a VM (moreso like a very special
      application)
    + Useful for sharing dependencies across computers without having exact same
      versions of everything
    + Used essentially everywhere today
3. Talk about docker in relation to containers
    + docker is a 'platform-agnostic' (sorta) way of running containers with a
      lot of tools and features
    + To show basic usage, start the basic postgresql docker container
        ```bash
        docker run --name todo_db -d postgres
        docker exec -it todo_db bash
        psql -U postgres
        ```
    + Note that you cannot externally connect to the container because ports are
      not exposed. To solve use:
        ```bash
        docker run -P --name todo_db -d postgres
        ```
4. Create the basic database and show the basic commands:
    1. create the 'todos' database:
        ```sql
        CREATE DATABASE "todos";
        ```
    2. connect to the 'todos' database:
        ```
        postgres=# \c todos;
        You are now connected to database "todos" as user "postgres".
        ```
    3. Add UUID extension for UUID support (`uuid-ossp`):
        ```sql
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        ```
    4. create the 'todos' table with id, name, and description:
        ```sql
        CREATE TABLE "todos" (
            id UUID NOT NULL DEFAULT uuid_generate_v4(),
            name VARCHAR NOT NULL,
            description VARCHAR NOT NULL,
            PRIMARY KEY (id)
        );
        ```
    5. Look at the newly created table schema:
        ```
        todos=# \d todos
        ```
    6. Fix 'description' being non-nullable:
        ```sql
        ALTER TABLE "todos" ALTER COLUMN description DROP NOT NULL;
        ```
    7. Insert new todo and view the contents of the table:
        ```sql
        INSERT INTO "todos" ("name", "description") VALUES ('test', 'test');
        SELECT * FROM "todos";
        SELECT id FROM "todos";
        SELECT name, description FROM "todos";
        ```
    8. Delete the newly created todo:
        ```sql
        SELECT id from "todos";
        DELETE FROM "todos" WHERE id='<TODO_SHOWN_FROM_ABOVE_COMMAND>';
        SELECT id from "todos";
        ```
5. Update the backend to work with the new database:
    1. Add `pg` dependencies:
        ```bash
        yarn add pg
        yarn add -D @types/pg
        ```
    2. create the `src/db.ts` file:
        ```typescript
        import { Pool, QueryResult } from "pg";

        const pool = new Pool({
          user: process.env.DB_USER || "postgres",
          host: process.env.DB_HOST || "localhost",
          port: parseInt(process.env.DB_PORT || "5432"),
          database: process.env.DB_DATABASE || "todos"
        });

        export const query = async (
          text: string,
          params?: (string | undefined)[]
        ): Promise<QueryResult> => {
          return pool.query(text, params);
        };
        ```
    3. Modify the `src/index.ts` to use the database
6. Create the various docker/docker-compose file:
    ```docker
    # backend/Dockerfile
    FROM node:latest

    WORKDIR /server

    COPY . /server
    ADD package.json /server/package.json
    RUN yarn

    EXPOSE 8000
    CMD yarn start
    ```

    ```yml
    # docker-compose.yml
    ---
    version: "3"
    services:
      web:
        restart: unless-stopped
        build: "./backend"
        environment:
          - DB_HOST=db
        ports: 
          - "8000:8000"
        volumes:
          - ./backend:/server
        networks:
          - db_nw
        depends_on:
          - db
      db:
        image: postgres
        environment:
          - POSTGRES_DATABASE=todos
          - POSTGRES_USER=postgres
        networks:
          - db_nw

    networks:
      db_nw:
        driver: bridge
    ```
7. `docker-compose up` and initialize the database
8. Talk about `docker-compose.override.yml` and `docker-compose.production.yml`
