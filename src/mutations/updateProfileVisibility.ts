/**
 * Author: Edward Jones
 */
import {
  User as PrismaUser,
} from '@prisma/client';

import Errors from '../errors';
import {
  MutationUpdateProfileVisibilityArgs,
  UpdateProfileVisibilityResult,
  Privacy as ApolloPrivacy,
} from '../generated/graphql';
import prisma from '../prisma';

export default async (_parent: any,
  { profileVisibilityDetails: { visibility } }: MutationUpdateProfileVisibilityArgs,
  context?: PrismaUser): Promise<UpdateProfileVisibilityResult> => {
  try {
    // Find user to update visibility for
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

    const updatedUser = await prisma.user.update({
      where: {
        id: context.id,
      },
      data: {
        visibility,
      },
    });

    return { data: updatedUser.visibility as ApolloPrivacy };
  } catch ({ message }) {
    return {
      error: {
        message: message as string,
      },
    };
  }
};
