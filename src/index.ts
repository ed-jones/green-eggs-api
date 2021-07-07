import { ApolloServer } from 'apollo-server';
import { GraphQLUpload, Upload, graphqlUploadExpress } from 'graphql-upload';
import { ContextFunction } from 'apollo-server-core';
import { ExpressContext } from 'apollo-server-express';
import { loadSchema, GraphQLFileLoader } from 'graphql-tools';
import { graphqlHTTP } from 'express-graphql';

import jwt from 'jsonwebtoken';
import { User as PrismaUser } from '@prisma/client';

import * as Query from './queries';
import * as Mutation from './mutations';
import express from 'express';

const schemaPromise = loadSchema('./graphql/**/*.graphql', {
  resolvers: { Query, Mutation, FileUpload: GraphQLUpload! },
  loaders: [
    new GraphQLFileLoader(),
  ],
});

const secret = process.env.SECRET;

// const context: ContextFunction<ExpressContext, PrismaUser | undefined> = ({ req }) => {
//   const token = req.headers.authorization || '';
//   console.log(token);
//   return token ? (
//     jwt.verify(token, secret || '') as PrismaUser
//   ) : undefined;
// };

const getContext = (token?: string): PrismaUser | undefined => {
  return token ? (
    jwt.verify(token, secret || '') as PrismaUser
  ) : undefined;
};


schemaPromise.then((schema) => {
  express()
  .use(
    graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
    graphqlHTTP((request) => ({ schema, context: getContext(request.headers.authorization) }))
  )
  .listen(process.env.PORT || 4000, () => {
    console.log(`
      Server is running!
      Listening on port 4000
      Explore at https://studio.apollographql.com/dev
    `);
  });
});
