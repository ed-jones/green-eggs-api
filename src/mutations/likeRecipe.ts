import {
  User as PrismaUser,
} from '@prisma/client';
import Errors from '../errors';
import {
  LikeRecipeResult,
  MutationLikeRecipeArgs,
} from '../generated/graphql';
import prisma from '../prisma';

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
      include: {
        likedBy: true,
      },
    });

    if (!updateRecipe.likedBy.map((liker) => liker.id).includes(context.id)) {
      throw new Error('Recipe was not liked successfully');
    }

    return {};
  } catch ({ message }) {
    return {
      error: {
        message,
      },
    };
  }
};
