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
