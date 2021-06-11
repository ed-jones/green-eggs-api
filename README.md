# Green Eggs API ![Build Status](https://github.com/ed-jones/green-eggs-api/actions/workflows/production.yml/badge.svg)

This is a GraphQL API designed to be consumed by the Green Eggs mobile app. 

## Commands

Install NodeJS dependencies: `docker-compose run apollo yarn install`

Migrate db (dev): `docker-compose run prisma yarn prisma migrate dev`

Start: `docker-compose up -d --remove-orphans`

## Web Interfaces

GraphQL Playground: http://localhost:4000

Prisma Studio: http://localhost:5555

## Folder Structure

`./graphql` contains GraphQL schema files

`./prisma` contains Prisma schema files and migration files

`./src` contains all TypeScript source code

## Connecting to database from host machine

Avoid updating the database this way, as database updates should be done through Prisma migrations.

- **DB Type**: PostgreSQL
- **Host**: localhost
- **Username**: prisma
- **Password**: secret
- **DB Name**: green_eggs
- **Port**: 5433
