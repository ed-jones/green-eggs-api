/**
 * Author: Edward Jones
 */
import {
  User as PrismaUser,
} from '@prisma/client';
import fullRecipeArgs from '../core/recipe/fullRecipeArgs';
import prismaToApolloRecipe from '../core/recipe/prismaToApolloRecipe';
import Errors from '../errors';
import {
  UnlikeRecipeResult,
  MutationUnlikeRecipeArgs,
} from '../generated/graphql';
import prisma from '../prisma';

/**
 * Resolver that removes a recipe from the list of liked recipes for the logged in user
 */
export default async (_parent: any,
  { recipeId }: MutationUnlikeRecipeArgs,
  context?: PrismaUser): Promise<UnlikeRecipeResult> => {
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
        likedBy: {
          disconnect: [
            { id: context.id },
          ],
        },
      },
      ...fullRecipeArgs,
    });

    if (updateRecipe.likedBy.map((liker) => liker.id).includes(context.id)) {
      throw new Error('Recipe was not unliked successfully');
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
