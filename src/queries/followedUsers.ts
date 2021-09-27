import { User as PrismaUser } from '@prisma/client';

import prisma from '../prisma';
import { QueryFollowedUsersArgs, UsersResult } from '../generated/graphql';
import Errors from '../errors';
import prismaToApolloUser from '../core/user/prismaToApolloUser';
import fullUserArgs from '../core/user/fullUserArgs';

const users = async (
  _parent: any,
  { userId }: QueryFollowedUsersArgs,
  context: PrismaUser | undefined,
): Promise<UsersResult> => {
  if (!userId) {
    return {
      error: {
        message: Errors.NO_USER,
      },
    };
  }
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      followedBy: {
        include: {
          following: fullUserArgs,
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
  return { data: user.followedBy.map(followedBy => prismaToApolloUser(followedBy.following))};
};

export default users;
