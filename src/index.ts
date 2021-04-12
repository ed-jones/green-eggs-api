import { ApolloServer } from 'apollo-server';
import { PrismaClient } from '@prisma/client'

import typeDefs from './schema';

const server = new ApolloServer({ typeDefs });

server.listen().then(() => {
  console.log(`
    Server is running!
    Listening on port 4000
    Explore at https://studio.apollographql.com/dev
  `);
});

const prisma = new PrismaClient()

async function main() {
  const allRecipes = await prisma.recipe.findMany();

  console.log(allRecipes);
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect();
  })