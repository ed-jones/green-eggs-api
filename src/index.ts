import { ApolloServer } from 'apollo-server-azure-functions';
import { ContextFunction } from 'apollo-server-core';
import { ExpressContext } from 'apollo-server-express';
import { loadSchema, GraphQLFileLoader } from 'graphql-tools';
import jwt from 'jsonwebtoken';
import { User as PrismaUser } from '@prisma/client';
import { AzureFunction, Context } from '@azure/functions';

import * as Query from './queries';
import * as Mutation from './mutations';

const httpTrigger: AzureFunction = async (azureContext: Context) => {
  const schema = await loadSchema('./graphql/**/*.graphql', {
    resolvers: { Query, Mutation },
    loaders: [
      new GraphQLFileLoader(),
    ],
  });

  const secret = process.env.SECRET;

  const context: ContextFunction<ExpressContext, PrismaUser | undefined> = () => {
    const token = azureContext.req?.headers.authorization || '';
    return token ? (
      jwt.verify(token, secret || '') as PrismaUser
    ) : undefined;
  };

  const server = new ApolloServer({
    schema,
    context,
  });

  const apolloHandler = server.createHandler();

  return new Promise((resolve, reject) => {
    const originalDone = azureContext.done;

    // eslint-disable-next-line no-param-reassign
    azureContext.done = (error, result) => {
      originalDone(error, result);

      if (error) {
        reject(error);
      }

      resolve(result);
    };

    apolloHandler(azureContext, azureContext.req!);
  });
};

export default httpTrigger;
