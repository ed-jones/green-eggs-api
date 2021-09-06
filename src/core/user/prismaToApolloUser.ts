import { Privacy as ApolloPrivacy, User as ApolloUser } from '../../generated/graphql';
import FullPrismaUserType from './FullPrismaUserType'

export default function prismaToApolloUser(prismaUser: FullPrismaUserType): ApolloUser {
  return ({
    ...prismaUser,
    visibility: prismaUser.visibility as ApolloPrivacy,
  });
}