import { User as PrismaUser } from '@prisma/client';
import prismaToApolloRecipe from '../core/recipe/prismaToApolloRecipe';
import fullRecipeArgs from '../core/recipe/fullRecipeArgs';
import Errors from '../errors';
import {
  MutationDeleteRecipeArgs,
  DeleteRecipeResult,
} from '../generated/graphql';
import prisma from '../prisma';

export default async (
  _parent: any,
  { recipeId }: MutationDeleteRecipeArgs,
  context?: PrismaUser,
): Promise<DeleteRecipeResult> => {
  try {
    // Find user in order to ensure they have permissionto delete
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

    // Find reci[e] to delete
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
      ...fullRecipeArgs,
    });
    if (!recipe) {
      throw new Error(Errors.NO_RECIPE);
    }

    const isRecipeAuthor = recipe.submittedById === context.id;

    if (isRecipeAuthor) {
      await prisma.recipeStep.deleteMany({
        where: {
          recipeId,
        },
      });
      await prisma.recipeComment.deleteMany({
        where: {
          recipeId,
        },
      });
      await prisma.ingredient.deleteMany({
        where: {
          recipeId,
        },
      });
      const updateRecipe = await prisma.recipe.delete({
        where: {
          id: recipeId,
        },
        ...fullRecipeArgs,
      });

      return { data: prismaToApolloRecipe(updateRecipe, user.id) };
    }
    throw new Error('User does not have permission to delete this recipe');
  } catch ({ message }) {
    return {
      error: {
        message: message as string,
      },
    };
  }
};
