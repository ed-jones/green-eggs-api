import { Privacy as ApolloPrivacy, User as ApolloUser } from '../../generated/graphql';
import FullPrismaUserType from './FullPrismaUserType'

export default function prismaToApolloUser(prismaUser: FullPrismaUserType, me?: FullPrismaUserType): ApolloUser {
  const isFollowing = me?.following.some((following) => following.userId === prismaUser.id);
  const likeCount = prismaUser.submittedRecipes.map((submittedRecipe) => submittedRecipe.likedBy.length).reduce((a, b) => a + b);
  return ({
    ...prismaUser,
    isFollowing,
    likeCount,
    followingCount: prismaUser.following.length,
    followerCount: prismaUser.followedBy.length,
    visibility: prismaUser.visibility as ApolloPrivacy,
  });
}