import { Recipe as PrismaRecipe, User as PrismaUser, Prisma } from '@prisma/client';

import prisma from '../prisma';
import { unixToISO } from '../utils';
import { MutationAddRecipeArgs, RecipeResult, Recipe as ApolloRecipe } from '../generated/graphql';

const addRecipe = async (
  _parent: any, { recipe }: MutationAddRecipeArgs, context?: PrismaUser,
): Promise<RecipeResult> => {
  // Find user to connect to this recipe
  if (!context?.id) {
    return {
      error: {
        message: 'Context not supplied',
      },
    };
  }
  const user = await prisma.user.findUnique({
    where: {
      id: context.id,
    },
  });
  if (!user?.id) {
    return {
      error: {
        message: 'User not found',
      },
    };
  }

  // Create prisma object from apollo object and user found in previous step
  const recipeInput: Prisma.RecipeCreateInput = {
    ...recipe,
    submittedBy: {
      connect: {
        id: user.id,
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
