/**
 * Author: Edward Jones
 */
import prisma from '../prisma';
import {
  DietsResult, QueryDietsArgs,
} from '../generated/graphql';
import Errors from '../errors';

const diets = async (
  _parent: any,
  {
    offset, limit, query,
  }: QueryDietsArgs,
): Promise<DietsResult> => {
  const prismaDiet = await prisma.diet.findMany({
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

  if (prismaDiet.length === 0) {
    return { data: prismaDiet, error: { message: Errors.NO_DIETS } };
  }

  return { data: prismaDiet };
};

export default diets;
