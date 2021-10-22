/**
 * Author: Edward Jones
 */
import {
  Privacy as ApolloPrivacy,
  FullUser as ApolloFullUser,
} from '../../generated/graphql';
import FullPrismaUserType from './FullPrismaUserType';

/**
 * Converts a user (in prisma format) to a *full user* (in apollo format)
 */
export default function prismaToApolloFullUser(
  prismaUser: FullPrismaUserType,
  me?: FullPrismaUserType,
): ApolloFullUser {
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
