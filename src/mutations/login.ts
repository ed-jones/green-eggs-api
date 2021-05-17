import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { MutationLoginArgs, AuthResult } from '../generated/graphql';
import prisma from '../prisma';

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
        message: 'No user with that email was found',
      },
    };
  }
  if (!secret) {
    return {
      error: {
        message: 'Unable to encrypt password, secret not found',
      },
    };
  }

  const same = await bcrypt.compare(loginDetails.password, user.password);
  if (!same) {
    return {
      error: {
        message: 'Incorrect Password',
      },
    };
  }

  return {
    data: {
      token: jwt.sign(
        { email: loginDetails.email }, secret,
      ),
    },
  };
};

export default login;
