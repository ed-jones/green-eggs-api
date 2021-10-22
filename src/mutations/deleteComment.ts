/**
 * Author: Edward Jones
 */
import { User as PrismaUser } from '@prisma/client';
import fullCommentArgs from '../core/comment/fullCommentArgs';
import prismaToApolloComment from '../core/comment/prismaToApolloComment';
import Errors from '../errors';
import {
  MutationDeleteCommentArgs,
  DeleteCommentResult,
} from '../generated/graphql';
import prisma from '../prisma';

/**
 * Resolver that deletes a given comment as long as it was created by the logged in user
 */
export default async (
  _parent: any,
  { commentId }: MutationDeleteCommentArgs,
  context?: PrismaUser,
): Promise<DeleteCommentResult> => {
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

    // Find comment to delete
    const comment = await prisma.recipeComment.findUnique({
      where: {
        id: commentId,
      },
      include: {
        recipe: true,
      },
    });
    if (!comment) {
      throw new Error(Errors.NO_COMMENT);
    }

    const isCommentAuthor = comment.userId === context.id;
    const isRecipeAuthor = comment.recipe.submittedById === context.id;

    if (isCommentAuthor || isRecipeAuthor) {
      const updateComment = await prisma.recipeComment.update({
        where: {
          id: commentId,
        },
        data: {
          contents: '[deleted]',
          deleted: true,
        },
        ...fullCommentArgs,
      });

      if (!(updateComment.deleted && updateComment.contents === '')) {
        throw new Error('Comment was not liked successfully');
      }
      return { data: prismaToApolloComment(updateComment, user.id) };
    }
    throw new Error('User does not have permission to delete this comment');
  } catch ({ message }) {
    return {
      error: {
        message: message as string,
      },
    };
  }
};
