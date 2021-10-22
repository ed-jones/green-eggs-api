/**
 * Author: Edward Jones
 */
import {
  User as PrismaUser,
} from '@prisma/client';

import { Privacy as ApolloPrivacy, User as ApolloUser } from '../../generated/graphql';

/**
 * Converts a user (in prisma format) to a user (in apollo format)
 */
export default function prismaToApolloUser(prismaUser: PrismaUser): ApolloUser {
  return ({
    ...prismaUser,
    visibility: prismaUser.visibility as ApolloPrivacy,
  });
}
