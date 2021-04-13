import { PrismaClient } from '@prisma/client'
import { IResolvers } from 'apollo-server';

const prisma = new PrismaClient();

const resolvers: IResolvers = {
  Query: {
    allRecipes: () => {
      return prisma.recipe.findMany();
    }
  },
  Mutation: {
    addRecipe: async (_, {recipe}) => {
        const createdRecipe = await prisma.recipe.create({data: recipe});
        return {data: createdRecipe};
      },
  }
};

export default resolvers;