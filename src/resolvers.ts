import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    allRecipes: () => {
      return prisma.recipe.findMany();
    }
  }
};

export default resolvers;