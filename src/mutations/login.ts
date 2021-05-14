import jwt from 'jsonwebtoken';

import { MutationLoginArgs, AuthResult } from '../generated/graphql';

const secret = process.env.SECRET;

const login = (_: any, { loginDetails }: MutationLoginArgs): AuthResult => {
  if (secret) {
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
      message: 'Unable to encrypt password, secret not found',
    },
  };
};

export default login;
