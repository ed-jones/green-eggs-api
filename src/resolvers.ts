import { PrismaClient } from '@prisma/client'
import { IResolvers } from 'apollo-server';
import UnixToISO from './utils';

const prisma = new PrismaClient();

const resolvers: IResolvers = {
  Query: {
    recipes: () => {
      return prisma.recipe.findMany({include: {submittedBy: true}});
    }
  },
  Mutation: {
    addRecipe: async (_, {recipe}) => {
      const firstUser = await prisma.user.findFirst();
      const recipeInput = {
        ...recipe,
        submittedBy: {
          connect: {
            id: firstUser?.id,
          }
        },
        timeEstimate: UnixToISO(recipe.timeEstimate),
      }
      const submittedRecipe = await prisma.recipe.create({data: recipeInput, include: {submittedBy: true}});
      return {data: submittedRecipe};
    },
  }
};

export default resolvers;