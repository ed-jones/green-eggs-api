/**
 * Author: Edward Jones
 */
import {
  User as PrismaUser,
} from '@prisma/client';

import Errors from '../errors';
import {
  DeleteAccountResult,
} from '../generated/graphql';
import prisma from '../prisma';

export default async (_parent: any,
  _args: any,
  context?: PrismaUser): Promise<DeleteAccountResult> => {
  try {
    // Find user to change password for
    if (!context?.id) {
      throw new Error(Errors.NO_CONTEXT);
    }
    const user = await prisma.user.findUnique({
      where: {
        id: context.id,
      },
    });
    if (!user?.id) {
      throw new Error(Errors.NO_USER);
    }

    await prisma.user.delete({
      where: {
        id: context.id,
      },
    });

    return {};
  } catch ({ message }) {
    return {
      error: {
        message: message as string,
      },
    };
  }
};
