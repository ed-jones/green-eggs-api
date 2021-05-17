import { User as PrismaUser } from '@prisma/client';

import { UserResult } from '../generated/graphql';
import prisma from '../prisma';
import Errors from '../errors';

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
  return { data: user };
};

export default me;
