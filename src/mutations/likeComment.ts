/**
 * Author: Edward Jones
 */
import {
  NotificationType,
  User as PrismaUser,
} from '@prisma/client';
import fullCommentArgs from '../core/comment/fullCommentArgs';
import prismaToApolloComment from '../core/comment/prismaToApolloComment';
import Errors from '../errors';
import {
  MutationLikeCommentArgs,
  LikeCommentResult,
} from '../generated/graphql';
import prisma from '../prisma';

/**
 * Resolver that adds a comment to the list of liked comments for the logged in user
 */
export default async (_parent: any,
  { commentId }: MutationLikeCommentArgs,
  context?: PrismaUser): Promise<LikeCommentResult> => {
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

    // Find comment to like
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
          connect: [
            { id: context.id },
          ],
        },
      },
      ...fullCommentArgs,
    });

    if (!updateComment.likedBy.map((liker) => liker.id).includes(context.id)) {
      throw new Error('Comment was not liked successfully');
    }

    // Create a like notification
    await prisma.notification.create({
      data: {
        type: NotificationType.COMMENT_LIKED,
        forId: comment.userId,
        concernsId: context.id,
        linkId: comment.id,
      },
    });

    return { data: prismaToApolloComment(updateComment, user.id) };
  } catch ({ message }) {
    return {
      error: {
        message: message as string,
      },
    };
  }
};
