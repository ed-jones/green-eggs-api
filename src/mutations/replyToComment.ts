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
  MutationReplyToCommentArgs,
} from '../generated/graphql';
import prisma from '../prisma';

export default async (_parent: any,
  { commentId, comment: commentContent }: MutationReplyToCommentArgs,
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

    // Find comment to reply to
    const replyComment = await prisma.recipeComment.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!replyComment) {
      throw new Error(Errors.NO_COMMENT);
    }

    const updateComment = await prisma.recipeComment.update({
      where: {
        id: commentId,
      },
      data: {
        replies: {
          create: [
            {
              recipe: {
                connect: { id: replyComment.recipeId },
              },
              author: {
                connect: { id: user.id },
              },
              contents: commentContent,
            },
          ],
        },
      },
      include: {
        replies: {
          ...fullCommentArgs,
        },
      },
    });

    const comment = updateComment.replies.find(
      (recipeComment) => recipeComment.contents === commentContent,
    ) as FullPrismaCommentType;

    if (comment) {
      // Create a reply notification
      await prisma.notification.create({
        data: {
          type: NotificationType.COMMENT_REPLIED,
          forId: comment.userId,
          concernsId: context.id,
        },
      });
      return { data: prismaToApolloComment(comment, context?.id) };
    }
    throw new Error('Reply was not added successfully');
  } catch ({ message }) {
    return {
      error: {
        message: message as string,
      },
    };
  }
};
