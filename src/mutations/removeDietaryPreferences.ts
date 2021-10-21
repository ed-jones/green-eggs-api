/**
 * Author: Edward Jones
 */
import {
  User as PrismaUser,
} from '@prisma/client';

import Errors from '../errors';
import {
  MutationRemoveDietaryPreferencesArgs,
  RemoveDietaryPreferencesResult,
} from '../generated/graphql';
import prisma from '../prisma';

export default async (_parent: any,
  { dietaryPreferenceDetails: { diets } }: MutationRemoveDietaryPreferencesArgs,
  context?: PrismaUser): Promise<RemoveDietaryPreferencesResult> => {
  try {
    // Find user to update dietary preferences for
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
      include: {
        dietaryPreferences: true,
      },
      data: {
        dietaryPreferences: {
          disconnect: diets.map((diet) => ({
            id: diet,
          })),
        },
      },
    });

    return { data: updatedUser.dietaryPreferences };
  } catch ({ message }) {
    return {
      error: {
        message: message as string,
      },
    };
  }
};
