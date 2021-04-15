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
      const submittedBy = '1603a6e2-8951-4e8c-96c1-2ec1f59cda53';
      const recipeInput = {
        ...recipe,
        submittedBy: {
          connect: {
            id: submittedBy,
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