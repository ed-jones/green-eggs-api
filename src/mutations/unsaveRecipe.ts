/**
 * Author: Edward Jones
 */
import {
  User as PrismaUser,
} from '@prisma/client';
import prismaToApolloRecipe from '../core/recipe/prismaToApolloRecipe';
import fullRecipeArgs from '../core/recipe/fullRecipeArgs';
import Errors from '../errors';
import {
  UnsaveRecipeResult,
  MutationUnsaveRecipeArgs,
} from '../generated/graphql';
import prisma from '../prisma';

/**
 * Resolver that removes a recipe from the list of saved recipes for the logged in user
 */
export default async (_parent: any,
  { recipeId }: MutationUnsaveRecipeArgs,
  context?: PrismaUser): Promise<UnsaveRecipeResult> => {
  try {
    // Find user to associate with liked recipe
    if (!context?.id) {
      throw new Error(Errors.NO_CONTEXT);
    }
    const user = await prisma.user.findUnique({
      where: {
        id: context.id,
      },
    });
    if (!user?.id) {
      throw new Error(Errors.NO_USER);
    }

    // Find recipe to like
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
    });
    if (!recipe) {
      throw new Error(Errors.NO_RECIPE);
    }

    const updateRecipe = await prisma.recipe.update({
      where: {
        id: recipeId,
      },
      data: {
        savedBy: {
          disconnect: [
            { id: context.id },
          ],
        },
      },
      ...fullRecipeArgs,
    });

    if (updateRecipe.savedBy.map((saver) => saver.id).includes(context.id)) {
      throw new Error('Recipe was not unsaved successfully');
    }

    return { data: prismaToApolloRecipe(updateRecipe, user.id) };
  } catch ({ message }) {
    return {
      error: {
        message: message as string,
      },
    };
  }
};
