import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User as PrismaUser } from '@prisma/client';

import { MutationSignupArgs, AuthResult } from '../generated/graphql';
import prisma from '../prisma';
import Errors from '../errors';

const secret = process.env.SECRET;

const signup = async (_: any, { signupDetails }: MutationSignupArgs): Promise<AuthResult> => {
  if (signupDetails.password !== signupDetails.confirmPassword) {
    return {
      error: {
        message: Errors.PASSWORD_MISMATCH,
      },
    };
  }
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(signupDetails.password, salt);
  const { confirmPassword, ...userToCreate } = signupDetails;
  const createdUser: PrismaUser = await prisma.user.create({
    data: { ...userToCreate, password: hash },
  });
  if (!secret) {
    return {
      error: {
        message: Errors.NO_SECRET,
      },
    };
  }
  if (!createdUser) {
    return {
      error: {
        message: Errors.COULD_NOT_CREATE_USER,
      },
    };
  }
  return {
    data: {
      token: jwt.sign(
        createdUser, secret,
      ),
    },
  };
};

export default signup;
