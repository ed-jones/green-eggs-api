import { User as PrismaUser } from '@prisma/client';

import prisma from '../prisma';
import { CommentResult, QueryCommentArgs } from '../generated/graphql';
import Errors from '../errors';
import prismaToApolloComment from '../core/comment/prismaToApolloComment';
import fullCommentArgs from '../core/comment/fullCommentArgs';
import FullPrismaCommentType from '../core/comment/FullPrismaCommentType';

export default async (
  _parent: any,
  { commentId }: QueryCommentArgs,
  context?: PrismaUser,
): Promise<CommentResult> => {
  try {
    const comment = await prisma.recipeComment.findUnique({
      where: { id: commentId },
      ...fullCommentArgs,
    }) as FullPrismaCommentType;

    if (!comment) {
      throw new Error(Errors.NO_COMMENT);
    }

    return { data: prismaToApolloComment(comment, context?.id) };
  } catch ({ message }) {
    return {
      error: {
        message: message as string,
      },
    };
  }
};
