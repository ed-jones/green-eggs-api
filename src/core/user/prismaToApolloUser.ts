import { User as PrismaUser, Privacy as PrismaPrivacy } from '@prisma/client';

import {
  FullUser,
  Privacy as ApolloPrivacy,
  UserUnion as ApolloUserUnion,
} from '../../generated/graphql';

export default function prismaToApolloUser(
  prismaUser: PrismaUser,
  me?: FullUser,
): ApolloUserUnion {
  if (
    prismaUser.visibility === PrismaPrivacy.PRIVATE
    && me?.id !== prismaUser.id
  ) {
    return {
      id: prismaUser.id,
      visibility: prismaUser.visibility as ApolloPrivacy,
    };
  }
  return {
    ...prismaUser,
    visibility: prismaUser.visibility as ApolloPrivacy,
  };
}
