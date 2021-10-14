import {
  Privacy as PrismaPrivacy,
} from '@prisma/client';
import {
  Privacy as ApolloPrivacy,
  FullUserUnion as ApolloFullUserUnion,
  FullUser,
} from '../../generated/graphql';
import FullPrismaUserType from './FullPrismaUserType';

export default function prismaToApolloFullUser(
  prismaUser: FullPrismaUserType,
  me?: FullUser,
): ApolloFullUserUnion {
  if (prismaUser.visibility === PrismaPrivacy.PRIVATE && me?.id !== prismaUser.id) {
    return ({
      id: prismaUser.id,
      visibility: prismaUser.visibility as ApolloPrivacy,
    });
  }
  const isFollowing = me?.following.some(
    (following) => following.followerId === prismaUser.id,
  );
  const likeCount = [
    0,
    ...prismaUser.submittedRecipes.map(
      (submittedRecipe) => submittedRecipe.likedBy.length,
    ),
  ].reduce((a, b) => a + b);
  return {
    ...prismaUser,
    isFollowing,
    likeCount,
    followingCount: prismaUser.following.length,
    followerCount: prismaUser.followedBy.length,
    visibility: prismaUser.visibility as ApolloPrivacy,
    recipeCount: prismaUser.submittedRecipes.length,
  };
}
