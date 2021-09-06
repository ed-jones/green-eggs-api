import { User as PrismaUser } from '@prisma/client';

import { UserResult } from '../generated/graphql';
import prisma from '../prisma';
import Errors from '../errors';
import fullUserArgs from '../core/user/fullUserArgs';
import prismaToApolloUser from '../core/user/prismaToApolloUser';

const me = async (
  _parent: any, _args: any, context: PrismaUser | undefined,
): Promise<UserResult> => {
  if (!context) {
    return {
      error: {
        message: Errors.NO_CONTEXT,
      },
    };
  }
  const user = await prisma.user.findUnique({
    ...fullUserArgs,
    where: {
      id: context.id,
    },
  });

  if (!user) {
    return {
      error: {
        message: Errors.NO_USER,
      },
    };
  }
  return { data: prismaToApolloUser(user) };
};

export default me;
