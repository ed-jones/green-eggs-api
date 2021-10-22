/**
 * Author: Edward Jones
 */
import { GraphQLUpload, graphqlUploadExpress } from 'graphql-upload';
import { loadSchema, GraphQLFileLoader } from 'graphql-tools';
import { graphqlHTTP } from 'express-graphql';

import jwt from 'jsonwebtoken';
import { User as PrismaUser } from '@prisma/client';

import * as Query from './queries';
import * as Mutation from './mutations';
import express from 'express';

/**
 * Asynchronously loads all graphql schema files, resolvers and loaders
 */
const schemaPromise = loadSchema('./graphql/**/*.graphql', {
  resolvers: { Query, Mutation, FileUpload: GraphQLUpload! },
  loaders: [
    new GraphQLFileLoader(),
  ],
});

const secret = process.env.SECRET;

/**
 * Decodes the JWT provided by the GraphQL context into a user object
 */
const getContext = (token?: string): PrismaUser | undefined => {
  return token ? (
    jwt.verify(token, secret || '') as PrismaUser
  ) : undefined;
}

/**
 * When the Apollo schema is loaded, starts a GraphQL server.
 */
schemaPromise.then((schema) => {
  express()
  .use(
    graphqlUploadExpress({ maxFileSize: 250000000, maxFiles: 10 }),
    graphqlHTTP((request) => ({ schema, context: getContext(request.headers.authorization) }))
  )
  .listen(process.env.PORT || 4000, () => {
    console.log(`
      Server is running!
      Listening on port ${process.env.PORT || 4000}
      Explore at https://studio.apollographql.com/dev
    `);
  });
});
