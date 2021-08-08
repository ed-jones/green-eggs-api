import {
  User as PrismaUser,
} from '@prisma/client';
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
        replies: {
          create: [
            {
              recipe: {
                connect: { id: comment.recipeId },
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
        replies: true,
      },
    });

    if (!updateComment.replies.map(
      (commentReply) => commentReply.contents,
    ).includes(commentContent)) {
      throw new Error('Reply was not added successfully');
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
