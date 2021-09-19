import {
  User as PrismaUser,
} from '@prisma/client';
import Errors from '../errors';
import {
  MutationDeleteCommentArgs,
  DeleteCommentResult,
} from '../generated/graphql';
import prisma from '../prisma';

export default async (_parent: any,
  { commentId }: MutationDeleteCommentArgs,
  context?: PrismaUser): Promise<DeleteCommentResult> => {
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
      });

      if (!(updateComment.deleted && updateComment.contents === '')) {
        throw new Error('Comment was not liked successfully');
      }
    } else {
      throw new Error('User does not have permission to delete this comment');
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
