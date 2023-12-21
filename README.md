# Doit

<p align="center">
  <img src="https://github.com/RedheadRusskie/server-todos/blob/main/public/list.svg" alt="Logo" width="200" />
</p>

<p align="center">
  A demonstrational server-side application for conveying skillset related to backend development, built with Nest.JS, PostgreSQL, Mikro ORM, Passport, Swagger, Bcrypt, and more.
</p>


## Table of Contents

- [Installation](#installation)
- [Database](#database)
- [Authentication](#authentication)
- [Usage](#usage)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/RedheadRusskie/server-todos.git
```

2. Install dependencies
```bash
npm install
```

## Database
The database itseft with which CRUD operations can be performed consists of three entities, to keep things simple. The following ERD depicts their relationships, properties and data types.

<p align="center">
  <img src="https://github.com/RedheadRusskie/server-todos/blob/main/public/doIt-erd.png" alt="Logo" />
</p>

Adjust your ORM configuration in `apps/server/src/app/orm/orm.module.ts` . A helper file for entity creation can be found at `apps/server/src/app/orm/entities/entity-definition.sql` . 

```ts
@Module({
  imports: [
    MikroOrmModule.forRoot({
      dbName: 'your-db-name',
      type: 'postgresql',
      user: 'username',
      autoLoadEntities: true,
    }),
  ],
})
export class OrmModule {}
```


## Authentication
For intended usage of user authentication, create an `.env` file at the root directory of the cloned project.

1. Create .env file
```bash
touch .env
```

2. Populate it with a secret of your choice. 
```
JWT_SECRET=your-secret
```
Remember to maintain the same variable name of `JWT_SECRET`.

## Usage

1. Run server application
```bash
npx nx run server:serve
```
    
2. A Postman collection has been provided at `apps/server/postman/Doit.postman_collection.json` . Import it to make requests to the server.




