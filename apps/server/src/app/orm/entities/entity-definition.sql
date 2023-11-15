/*
    Entities to add to an existing postgres DB.
*/

-- Users entity
CREATE TABLE "DoitUser" (
  "id" UUID PRIMARY KEY NOT NULL,
  "username" VARCHAR(30) NOT NULL
);


-- ToDo entity
CREATE TABLE IF NOT EXISTS "ToDo" (
  "id" UUID PRIMARY KEY NOT NULL,
  "user" UUID REFERENCES "user" ("id"),
  "name" VARCHAR(30) NOT NULL,
  "body" TEXT,
  "complete" BOOLEAN NOT NULL
);
