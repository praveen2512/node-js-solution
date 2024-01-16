# Node.js recruitment task - solution

This repository contains the solution for Node JS assignment. Below features have been implemented. I have implemented the solution with best of my knowledge and it may have few bugs.

- CRUD operations for customers (get, update, delete) by id or email;

- login and signup operations for customers;

- roles USER and ADMIN;

- access token;

- restrict access to get customers operation from unauthenticated users;

- restrict access to delete customer and update customer operations from unauthenticated users and customers with USER role;

- ability to verify customer's account after signup with activation code;

## Installation

```bash
# Install packages
npm install

npx prisma generate
```

## Local database

```bash
# Setup local postgres
docker run --name recruitment-task -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11.16

#create .env file with your local database credentials

# Run migration
npx prisma migrate dev

# Run db seed
npx prisma db seed
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```
