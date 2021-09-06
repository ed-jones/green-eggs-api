import {
  User as PrismaUser,
} from '@prisma/client';
import bcrypt from 'bcryptjs';

import Errors from '../errors';
import {
  MutationChangePasswordArgs,
  ChangePasswordResult,
} from '../generated/graphql';
import prisma from '../prisma';

export default async (_parent: any,
  { changePasswordDetails: { newPassword, oldPassword, confirmNewPassword} }: MutationChangePasswordArgs,
  context?: PrismaUser): Promise<ChangePasswordResult> => {
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

    const same = await bcrypt.compare(oldPassword, user.password);
    if (!same) {
      return {
        error: {
          message: Errors.WRONG_PASSWORD,
        },
      };
    }

    if (newPassword !== confirmNewPassword) {
      throw new Error(Errors.PASSWORD_MISMATCH);
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: {
        id: context.id,
      },
      data: {
        password: hash,
      }
    })
    
    return {};
  } catch ({ message }) {
    return {
      error: {
        message,
      },
    };
  }
};
