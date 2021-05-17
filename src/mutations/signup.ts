import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User as PrismaUser, Prisma } from '@prisma/client';

import { MutationSignupArgs, AuthResult } from '../generated/graphql';
import prisma from '../prisma';

const secret = process.env.SECRET;

const signup = async (_: any, { signupDetails }: MutationSignupArgs): Promise<AuthResult> => {
  if (signupDetails.password !== signupDetails.confirmPassword) {
    return {
      error: {
        message: 'Password did not match confirmation',
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
        message: 'Unable to encrypt password, secret not found',
      },
    };
  }
  if (!createdUser) {
    return {
      error: {
        message: 'Unable to create user',
      },
    };
  }
  return {
    data: {
      token: jwt.sign(
        { id: createdUser.id }, secret,
      ),
    },
  };
};

export default signup;
