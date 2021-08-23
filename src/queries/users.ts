import { Prisma } from '@prisma/client';

import prisma from '../prisma';
import {
  QueryUsersArgs, Sort, UsersResult,
} from '../generated/graphql';
import Errors from '../errors';

const users = async (
  _parent: any,
  {
    offset, limit, query, sort,
  }: QueryUsersArgs,
): Promise<UsersResult> => {
  let orderBy: Prisma.Enumerable<Prisma.UserOrderByWithRelationInput>;

  switch (sort) {
    // Sort from newest to oldest
    case Sort.New:
      orderBy = {
        createdAt: 'desc',
      };
      break;
    // Sorted by by most followers, then by newest to oldest
    case Sort.Relevant:
      orderBy = {
        createdAt: 'desc',
        followedBy: {
          _count: 'desc',
        },
      };
      break;
    // Sorted by most followers
    case Sort.Popular:
    default:
      orderBy = {
        followedBy: {
          _count: 'desc',
        },
      };
  }

  const prismaUsers = await prisma.user.findMany({
    skip: offset,
    take: limit,
    orderBy,
    where: {
      OR: [
        { firstName: { contains: query } },
        { firstName: { in: query } },
        { lastName: { contains: query } },
        { lastName: { in: query } },
      ],
    },
  });

  if (prismaUsers.length === 0) {
    return { data: prismaUsers, error: { message: Errors.NO_USER } };
  }

  return { data: prismaUsers };
};

export default users;
