/**
 * Author: Edward Jones
 */
import {
  User as PrismaUser,
} from '@prisma/client';

import Errors from '../errors';
import {
  MutationUpdateAllergyPreferencesArgs,
  UpdateAllergyPreferencesResult,
} from '../generated/graphql';
import prisma from '../prisma';

export default async (_parent: any,
  { allergyPreferenceDetails: { allergies } }: MutationUpdateAllergyPreferencesArgs,
  context?: PrismaUser): Promise<UpdateAllergyPreferencesResult> => {
  try {
    // Find user to update allergy preferences for
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
        allergyPreferences: true,
      },
      data: {
        allergyPreferences: {
          connect: allergies.map((allergy) => ({
            id: allergy,
          })),
        },
      },
    });

    return { data: updatedUser.allergyPreferences };
  } catch ({ message }) {
    return {
      error: {
        message: message as string,
      },
    };
  }
};
