/**
 * Author: Edward Jones
 */
import {
  User as PrismaUser,
} from '@prisma/client';
import fullCommentArgs from '../core/comment/fullCommentArgs';
import prismaToApolloComment from '../core/comment/prismaToApolloComment';
import Errors from '../errors';
import {
  MutationUnlikeCommentArgs,
  UnlikeCommentResult,
} from '../generated/graphql';
import prisma from '../prisma';

/**
 * Resolver that removes a comment from the list of liked comments for the logged in user
 */
export default async (_parent: any,
  { commentId }: MutationUnlikeCommentArgs,
  context?: PrismaUser): Promise<UnlikeCommentResult> => {
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

    // Find comment to unlike
    const comment = await prisma.recipeComment.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!comment) {
      throw new Error(Errors.NO_COMMENT);
    }

    const updateComment = await prisma.recipeComment.update({
      where: {
        id: commentId,
      },
      data: {
        likedBy: {
          disconnect: [
            { id: context.id },
          ],
        },
      },
      ...fullCommentArgs,
    });

    if (updateComment.likedBy.map((liker) => liker.id).includes(context.id)) {
      throw new Error('Comment was not unliked successfully');
    }

    return { data: prismaToApolloComment(updateComment, user.id) };
  } catch ({ message }) {
    return {
      error: {
        message: message as string,
      },
    };
  }
};
