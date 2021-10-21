/**
 * Author: Edward Jones
 */
import { User as PrismaUser } from '@prisma/client';

import { FullUserResult } from '../generated/graphql';
import prisma from '../prisma';
import Errors from '../errors';
import fullUserArgs from '../core/user/fullUserArgs';
import prismaToApolloFullUser from '../core/user/prismaToApolloFullUser';

const me = async (
  _parent: any, _args: any, context: PrismaUser | undefined,
): Promise<FullUserResult> => {
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
  return { data: prismaToApolloFullUser(user) };
};

export default me;
