import { User as PrismaUser } from '@prisma/client';

import { UserResult } from '../generated/graphql';

import prisma from '../prisma';

const me = async (
  _parent: any, _args: any, context: PrismaUser | undefined,
): Promise<UserResult> => {
  if (!context) {
    return {
      error: {
        message: 'Context not supplied',
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
        message: 'User not found',
      },
    };
  }
  return { data: user };
};

export default me;
