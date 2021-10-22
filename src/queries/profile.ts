/**
 * Author: Edward Jones
 */
import { User as PrismaUser } from '@prisma/client';

import { FullUserResult, QueryProfileArgs } from '../generated/graphql';
import prisma from '../prisma';
import Errors from '../errors';
import fullUserArgs from '../core/user/fullUserArgs';
import prismaToFullApolloUser from '../core/user/prismaToApolloFullUser';

/**
 * Resolver that returns the profile details of a given user
 */
const profile = async (
  _parent: any, { userId }: QueryProfileArgs, context: PrismaUser | undefined,
): Promise<FullUserResult> => {
  if (!userId) {
    return {
      error: {
        message: Errors.NO_USER,
      },
    };
  }
  if (!context?.id) {
    return {
      error: {
        message: Errors.NO_CONTEXT,
      },
    };
  }
  const user = await prisma.user.findUnique({
    ...fullUserArgs,
    where: {
      id: userId,
    },
  });

  const me = await prisma.user.findUnique({
    ...fullUserArgs,
    where: {
      id: context.id,
    },
  });

  if (!me) {
    return {
      error: {
        message: Errors.NO_USER,
      },
    };
  }

  if (!user) {
    return {
      error: {
        message: Errors.NO_USER,
      },
    };
  }
  return { data: prismaToFullApolloUser(user, me) };
};

export default profile;
