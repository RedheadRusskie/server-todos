/*
    Entities to add to an existing postgres DB.
*/

-- Users entity
CREATE TABLE IF NOT EXISTS user (
  "id" UUID PRIMARY KEY NOT NULL,
  "username" VARCHAR(30) NOT NULL,
  "password" VARCHAR(30) NOT NULL,
  "added" TIMESTAMP NOT NULL,
  "last_login" TIMESTAMP
);


-- ToDo entity
CREATE TABLE IF NOT EXISTS todo (
  "id" UUID PRIMARY KEY NOT NULL,
  "user" UUID REFERENCES "user" ("id") NOT NULL,
  "name" VARCHAR(30) NOT NULL,
  "body" TEXT,
  "complete" BOOLEAN,
  "role" INT NOT NULL,
  "added" TIMESTAMP NOT NULL,
  "last_updated" TIMESTAMP NOT NULL
);


-- User permissions
CREATE TABLE user_permissions ("id" INT PRIMARY KEY NOT NULL, "role" VARCHAR(30));


-- Establish relationship between user and user permissions entities
ALTER TABLE "user"
  ADD CONSTRAINT fk_user_permission
  FOREIGN KEY ("role") 
  REFERENCES "user_permissions" ("id");