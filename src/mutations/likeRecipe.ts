/**
 * Author: Edward Jones
 */
import {
  NotificationType,
  User as PrismaUser,
} from '@prisma/client';
import prismaToApolloRecipe from '../core/recipe/prismaToApolloRecipe';
import fullRecipeArgs from '../core/recipe/fullRecipeArgs';
import Errors from '../errors';
import {
  LikeRecipeResult,
  MutationLikeRecipeArgs,
} from '../generated/graphql';
import prisma from '../prisma';

/**
 * Resolver that adds a recipe to the list of liked recipes for the logged in user
 */
export default async (_parent: any,
  { recipeId }: MutationLikeRecipeArgs,
  context?: PrismaUser): Promise<LikeRecipeResult> => {
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
          connect: [
            { id: context.id },
          ],
        },
      },
      ...fullRecipeArgs,
    });

    if (!updateRecipe.likedBy.map((liker) => liker.id).includes(context.id)) {
      throw new Error('Recipe was not liked successfully');
    }

    // Create a like notification
    await prisma.notification.create({
      data: {
        type: NotificationType.RECIPE_LIKED,
        forId: recipe.submittedById,
        concernsId: context.id,
        linkId: recipe.id,
      },
    });

    return { data: prismaToApolloRecipe(updateRecipe, user.id) };
  } catch ({ message }) {
    return {
      error: {
        message: message as string,
      },
    };
  }
};
