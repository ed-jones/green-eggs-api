/**
 * Author: Edward Jones
 */
import {
  NotificationType,
  User as PrismaUser,
} from '@prisma/client';
import fullCommentArgs from '../core/comment/fullCommentArgs';
import FullPrismaCommentType from '../core/comment/FullPrismaCommentType';
import prismaToApolloComment from '../core/comment/prismaToApolloComment';
import Errors from '../errors';
import {
  CommentResult,
  MutationAddCommentArgs,
} from '../generated/graphql';
import prisma from '../prisma';

export default async (_parent: any,
  { recipeId, comment: commentContent }: MutationAddCommentArgs,
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
              contents: commentContent,
            },
          ],
        },
      },
      include: {
        recipeComments: {
          ...fullCommentArgs,
        },
      },
    });

    const comment = updateRecipe.recipeComments.find(
      (recipeComment) => recipeComment.contents === commentContent,
    ) as FullPrismaCommentType;

    if (comment) {
      // Create a comment notification
      await prisma.notification.create({
        data: {
          type: NotificationType.RECIPE_COMMENTED,
          forId: recipe.submittedById,
          concernsId: context.id,
          linkId: comment.id,
        },
      });
      return { data: prismaToApolloComment(comment, context?.id) };
    }

    throw new Error('Comment was not added successfully');
  } catch ({ message }) {
    return {
      error: {
        message: message as string,
      },
    };
  }
};
