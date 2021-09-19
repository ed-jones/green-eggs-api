import {
  User as PrismaUser,
} from '@prisma/client';
import Errors from '../errors';
import {
  SaveRecipeResult,
  MutationSaveRecipeArgs,
} from '../generated/graphql';
import prisma from '../prisma';

export default async (_parent: any,
  { recipeId }: MutationSaveRecipeArgs,
  context?: PrismaUser): Promise<SaveRecipeResult> => {
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
          connect: [
            { id: context.id },
          ],
        },
      },
      include: {
        savedBy: true,
      },
    });

    if (!updateRecipe.savedBy.map((saver) => saver.id).includes(context.id)) {
      throw new Error('Recipe was not saved successfully');
    }

    return {};
  } catch ({ message }) {
    return {
      error: {
        message: message as string,
      },
    };
  }
};
