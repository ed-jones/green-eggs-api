/**
 * Author: Edward Jones
 */
import prisma from '../prisma';
import { QueryFollowedUsersArgs, UsersResult } from '../generated/graphql';
import Errors from '../errors';
import prismaToApolloUser from '../core/user/prismaToApolloUser';

/**
 * Resolver that returns a paginated list of users followed by a user
 */
const followedUsers = async (
  _parent: any,
  {
    userId, offset, limit, query,
  }: QueryFollowedUsersArgs,
): Promise<UsersResult> => {
  if (!userId) {
    return {
      error: {
        message: Errors.NO_CONTEXT,
      },
    };
  }
  const followed = await prisma.follows.findMany({
    where: {
      followerId: userId,
      OR: [
        { following: { firstName: { contains: query, mode: 'insensitive' } } },
        { following: { lastName: { contains: query, mode: 'insensitive' } } },
      ],
    },
    include: {
      following: true,
    },
    skip: offset,
    take: limit,
  });

  return { data: followed.map((user) => prismaToApolloUser(user.following)) };
};

export default followedUsers;
