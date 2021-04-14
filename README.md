# Green Eggs API

This is a GraphQL API designed to be consumed by the Green Eggs mobile app.

## Commands

Start: `docker-compose up -d`

Install NodeJS dependencies: `docker-compose run apollo yarn install`

Migrate db (dev): `docker-compose run prisma yarn prisma migrate dev`

## Web Interfaces

GraphQL Playground: http://localhost:4000

Prisma Studio: http://localhost:5555

## Connecting to database from host machine
Avoid updating the database this way, as database updates should be done through Prisma migrations.
* **DB Type**: PostgreSQL
* **Host**: localhost
* **Username**: prisma
* **Password**: secret
* **DB Name**: green_eggs
* **Port**: 5433
