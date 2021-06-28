import { ApolloServer } from 'apollo-server';
import { ContextFunction } from 'apollo-server-core';
import { ExpressContext } from 'apollo-server-express';
import { loadSchema, GraphQLFileLoader } from 'graphql-tools';
import jwt from 'jsonwebtoken';
import { User as PrismaUser } from '@prisma/client';

import * as Query from './queries';
import * as Mutation from './mutations';

const schemaPromise = loadSchema('./graphql/**/*.graphql', {
  resolvers: { Query, Mutation },
  loaders: [
    new GraphQLFileLoader(),
  ],
});

const secret = process.env.SECRET;

const context: ContextFunction<ExpressContext, PrismaUser | undefined> = ({ req }) => {
  const token = req.headers.authorization || '';
  return token ? (
    jwt.verify(token, secret || '') as PrismaUser
  ) : undefined;
};

schemaPromise.then((schema) => {
  const server = new ApolloServer({
    schema,
    context,
    introspection: true
  });

  server.listen({ port: process.env.PORT || 4000 }).then(() => {
    // eslint-disable-next-line no-console
    console.log(`
      Server is running!
      Listening on port 4000
      Explore at https://studio.apollographql.com/dev
    `);
  });
});
