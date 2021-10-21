/**
 * Author: Edward Jones
 */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { MutationLoginArgs, AuthResult } from '../generated/graphql';
import prisma from '../prisma';
import Errors from '../errors';

const secret = process.env.SECRET;

const login = async (_: any, { loginDetails }: MutationLoginArgs): Promise<AuthResult> => {
  const user = await prisma.user.findUnique({
    where: {
      email: loginDetails.email,
    },
  });
  if (!user) {
    return {
      error: {
        message: Errors.NO_USER,
      },
    };
  }
  if (!secret) {
    return {
      error: {
        message: Errors.NO_SECRET,
      },
    };
  }

  const same = await bcrypt.compare(loginDetails.password, user.password);
  if (!same) {
    return {
      error: {
        message: Errors.WRONG_PASSWORD,
      },
    };
  }

  return {
    data: {
      token: jwt.sign(
        user, secret,
      ),
    },
  };
};

export default login;
