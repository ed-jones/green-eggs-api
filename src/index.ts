import { ApolloServer } from 'apollo-server';
import { loadSchema, GraphQLFileLoader } from 'graphql-tools';
import { IResolvers } from 'apollo-server';
import { PrismaClient } from '@prisma/client';

import * as Query from './queries';
import * as Mutation from './mutations';

const resolvers: IResolvers = { Query, Mutation };

export const schema = loadSchema('./graphql/**/*.graphql', {
  loaders: [
    new GraphQLFileLoader()
  ]
})

schema.then((schema) => {
  const server = new ApolloServer({ schema, resolvers });

  const TypeMap = schema.getTypeMap();

  server.listen().then(() => {
    console.log(`
      Server is running!
      Listening on port 4000
      Explore at https://studio.apollographql.com/dev
    `);
  });
});

export const prisma = new PrismaClient();
