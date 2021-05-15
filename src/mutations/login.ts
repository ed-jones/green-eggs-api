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

  if (user) {
    if (secret) {
      bcrypt.compare(loginDetails.password, user.password,
        (error: Error | undefined, same: boolean) => {
          if (error) {
            return { error };
          }
          if (same) {
            return {
              data: {
                token: jwt.sign(
                  { email: loginDetails.email }, secret,
                ),
              },
            };
          }
          return {
            error: {
              message: 'Incorrect Password',
            },
          };
        });
    }
    return {
      error: {
        message: 'Unable to encrypt password, secret not found',
      },
    };
  }
  return {
    error: {
      message: 'No user with that email was found',
    },
  };
};

export default login;
