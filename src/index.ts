import { ApolloServer } from 'apollo-server';
import { loadSchema, GraphQLFileLoader } from 'graphql-tools';

import * as Query from './queries';
import * as Mutation from './mutations';

const schemaPromise = loadSchema('./graphql/**/*.graphql', {
  resolvers: { Query, Mutation },
  loaders: [
    new GraphQLFileLoader(),
  ],
});

schemaPromise.then((schema) => {
  const server = new ApolloServer({ schema });

  server.listen().then(() => {
    // eslint-disable-next-line no-console
    console.log(`
      Server is running!
      Listening on port 4000
      Explore at https://studio.apollographql.com/dev
    `);
  });
});
