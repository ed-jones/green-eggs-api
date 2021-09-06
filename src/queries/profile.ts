import { User as PrismaUser } from '@prisma/client';

import { UserResult, QueryProfileArgs } from '../generated/graphql';
import prisma from '../prisma';
import Errors from '../errors';
import fullUserArgs from '../core/user/fullUserArgs';
import prismaToApolloUser from '../core/user/prismaToApolloUser';

const me = async (
  _parent: any, { userId }: QueryProfileArgs, context: PrismaUser | undefined,
): Promise<UserResult> => {
  if (!userId) {
    return {
      error: {
        message: Errors.NO_USER,
      },
    };
  }
  const user = await prisma.user.findUnique({
    ...fullUserArgs,
    where: {
      id: userId,
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
