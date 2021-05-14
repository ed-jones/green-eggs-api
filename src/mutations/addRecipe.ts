import { Recipe as PrismaRecipe, Prisma } from '@prisma/client';

import { prisma } from '..';
import { unixToISO } from '../utils';
import { MutationAddRecipeArgs, RecipeResult, Recipe as ApolloRecipe } from '../generated/graphql';

const addRecipe = async (_: any, { recipe }: MutationAddRecipeArgs): Promise<RecipeResult> => {
  const firstUser = await prisma.user.findFirst();
  const recipeInput: Prisma.RecipeCreateInput = {
    ...recipe,
    submittedBy: {
      connect: {
        id: firstUser?.id,
      },
    },
    timeEstimate: unixToISO(recipe.timeEstimate),
  };
  const submittedRecipe: PrismaRecipe = await prisma.recipe.create({
    data: recipeInput, include: { submittedBy: true },
  });
  return { data: submittedRecipe as unknown as ApolloRecipe };
};

export default addRecipe;
