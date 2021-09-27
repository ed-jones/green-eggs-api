import { User as PrismaUser } from '@prisma/client';

import prisma from '../prisma';
import { QueryFollowingUsersArgs, UsersResult } from '../generated/graphql';
import Errors from '../errors';
import prismaToApolloUser from '../core/user/prismaToApolloUser';
import fullUserArgs from '../core/user/fullUserArgs';

const users = async (
  _parent: any,
  { userId }: QueryFollowingUsersArgs,
  context: PrismaUser | undefined,
): Promise<UsersResult> => {
  if (!userId) {
    return {
      error: {
        message: Errors.NO_CONTEXT,
      },
    };
  }
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      following: {
        include: {
          follower: fullUserArgs,
        }
      },
    }
  });

  if (!user) {
    return {
      error: {
        message: Errors.NO_USER,
      },
    };
  }
  return { data: user.following.map(following => prismaToApolloUser(following.follower))};
};

export default users;
