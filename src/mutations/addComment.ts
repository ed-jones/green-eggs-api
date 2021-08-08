import {
  User as PrismaUser,
} from '@prisma/client';
import Errors from '../errors';
import {
  CommentResult,
  MutationAddCommentArgs,
} from '../generated/graphql';
import prisma from '../prisma';

export default async (_parent: any,
  { recipeId, comment }: MutationAddCommentArgs,
  context?: PrismaUser): Promise<CommentResult> => {
  try {
    // Find user to associate with comment
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

    // Find recipe to comment on
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
        recipeComments: {
          create: [
            {
              author: {
                connect: { id: user.id },
              },
              contents: comment,
            },
          ],
        },
      },
      include: {
        recipeComments: true,
      },
    });

    if (!updateRecipe.recipeComments.map(
      (recipeComment) => recipeComment.contents,
    ).includes(comment)) {
      throw new Error('Comment was not added successfully');
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
