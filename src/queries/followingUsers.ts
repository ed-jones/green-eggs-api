import { User as PrismaUser } from '@prisma/client';

import prisma from '../prisma';
import { UsersResult } from '../generated/graphql';
import Errors from '../errors';
import prismaToApolloUser from '../core/user/prismaToApolloUser';
import fullUserArgs from '../core/user/fullUserArgs';

const users = async (
  _parent: any,
  _args: any,
  context: PrismaUser | undefined,
): Promise<UsersResult> => {
  if (!context) {
    return {
      error: {
        message: Errors.NO_CONTEXT,
      },
    };
  }
  const user = await prisma.user.findUnique({
    where: {
      id: context.id,
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
