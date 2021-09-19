import {
  User as PrismaUser,
} from '@prisma/client';

import Errors from '../errors';
import {
  MutationRemoveAllergyPreferencesArgs,
  RemoveAllergyPreferencesResult,
} from '../generated/graphql';
import prisma from '../prisma';

export default async (_parent: any,
  { allergyPreferenceDetails: { allergies } }: MutationRemoveAllergyPreferencesArgs,
  context?: PrismaUser): Promise<RemoveAllergyPreferencesResult> => {
  try {
    // Find user to remove allergy preferences for
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
          disconnect: allergies.map((allergy) => ({
            id: allergy,
          }))
        }
      }
    })
    
    return { data: updatedUser.allergyPreferences };
  } catch ({ message }) {
    return {
      error: {
        message: message as string,
      },
    };
  }
};
