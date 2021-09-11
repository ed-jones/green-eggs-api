import {
  User as PrismaUser,
} from '@prisma/client';
import fullUserArgs from '../core/user/fullUserArgs';
import prismaToApolloUser from '../core/user/prismaToApolloUser';
import Errors from '../errors';
import {
  UnfollowUserResult,
  MutationUnfollowUserArgs,
} from '../generated/graphql';
import prisma from '../prisma';

export default async (_parent: any,
  { userId }: MutationUnfollowUserArgs,
  context?: PrismaUser): Promise<UnfollowUserResult> => {
  try {
    // Find user to unfollow
    if (!userId) {
      throw new Error(Errors.NO_CONTEXT);
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user?.id) {
      throw new Error(Errors.NO_USER);
    }

    // Find logged in user
    if (!context?.id) {
      throw new Error(Errors.NO_CONTEXT);
    }
    const me = await prisma.user.findUnique({
      where: {
        id: context.id,
      },
    });
    if (!me?.id) {
      throw new Error(Errors.NO_USER);
    }

    const updateMe = await prisma.user.update({
      ...fullUserArgs,
      where: {
        id: me.id,
      },
      data: {
        following: {
          delete: {
            followingId_followerId: {
              followerId: user.id,
              followingId: me.id,
            },
          },
        },
      },
    });

    return { data: prismaToApolloUser(updateMe) };
  } catch ({ message }) {
    return {
      error: {
        message: message as string,
      },
    };
  }
};
