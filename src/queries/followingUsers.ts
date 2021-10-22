/**
 * Author: Edward Jones
 */
import prisma from '../prisma';
import { QueryFollowingUsersArgs, UsersResult } from '../generated/graphql';
import Errors from '../errors';
import prismaToApolloUser from '../core/user/prismaToApolloUser';

/**
 * Resolver that returns a paginated list of users a user is following
 */
const followingUsers = async (
  _parent: any,
  {
    userId, offset, limit, query,
  }: QueryFollowingUsersArgs,
): Promise<UsersResult> => {
  if (!userId) {
    return {
      error: {
        message: Errors.NO_CONTEXT,
      },
    };
  }

  const following = await prisma.follows.findMany({
    where: {
      followingId: userId,
      OR: [
        { follower: { firstName: { contains: query, mode: 'insensitive' } } },
        { follower: { lastName: { contains: query, mode: 'insensitive' } } },
      ],
    },
    include: {
      follower: true,
    },
    skip: offset,
    take: limit,
  });

  return { data: following.map((user) => prismaToApolloUser(user.follower)) };
};

export default followingUsers;
