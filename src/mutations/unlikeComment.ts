import {
  User as PrismaUser,
} from '@prisma/client';
import Errors from '../errors';
import {
  MutationUnlikeCommentArgs,
  UnlikeCommentResult,
} from '../generated/graphql';
import prisma from '../prisma';

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
      include: {
        likedBy: true,
      },
    });

    if (updateComment.likedBy.map((liker) => liker.id).includes(context.id)) {
      throw new Error('Comment was not unliked successfully');
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
