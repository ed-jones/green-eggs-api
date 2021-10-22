/**
 * Author: Edward Jones
 */
import prisma from '../prisma';
import {
  AllergiesResult, QueryAllergiesArgs,
} from '../generated/graphql';
import Errors from '../errors';

/**
 * Resolver that returns a paginated list of allergies within the database
 */
const allergies = async (
  _parent: any,
  {
    offset, limit, query,
  }: QueryAllergiesArgs,
): Promise<AllergiesResult> => {
  const prismaAllergies = await prisma.allergies.findMany({
    skip: offset,
    take: limit,
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
      ],
    },
    orderBy: {
      name: 'asc',
    },
  });

  if (prismaAllergies.length === 0) {
    return { data: prismaAllergies, error: { message: Errors.NO_ALLERGIES } };
  }

  return { data: prismaAllergies };
};

export default allergies;
