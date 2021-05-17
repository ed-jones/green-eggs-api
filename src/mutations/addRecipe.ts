import { Recipe as PrismaRecipe, User as PrismaUser, Prisma } from '@prisma/client';

import prisma from '../prisma';
import { unixToISO } from '../utils';
import { MutationAddRecipeArgs, RecipeResult, Recipe as ApolloRecipe } from '../generated/graphql';

const addRecipe = async (
  _: any, { recipe }: MutationAddRecipeArgs,
): Promise<RecipeResult> => {
  // Find user to connect to this recipe
  // TODO: Use apollo context to use current logged in user
  const firstUser = await prisma.user.findFirst();

  // Create prisma object from apollo object and user found in previous step
  const recipeInput: Prisma.RecipeCreateInput = {
    ...recipe,
    submittedBy: {
      connect: {
        id: firstUser?.id,
      },
    },
    timeEstimate: unixToISO(recipe.timeEstimate),
  };

  // Add recipe to database and fetch this recipe once in the database
  const createdRecipe: PrismaRecipe & {
    submittedBy: PrismaUser;
  } = await prisma.recipe.create({
    data: recipeInput, include: { submittedBy: true },
  });

  // Convert fetched recipe to apollo object
  const returnedRecipe: ApolloRecipe = {
    ...createdRecipe,
    createdAt: String(createdRecipe.createdAt.getUTCMilliseconds()),
    timeEstimate: String(createdRecipe.timeEstimate.getUTCMilliseconds()),
  };

  return { data: returnedRecipe };
};

export default addRecipe;
