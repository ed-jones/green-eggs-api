/**
 * Author: Edward Jones
 */
import prisma from '../prisma';
import { CategoriesResult, QueryCategoriesArgs } from '../generated/graphql';

/**
 * Resolver that returns a paginated list of categories within the database
 */
const categories = async (
  _parent: any,
  {
    offset, limit, query,
  }: QueryCategoriesArgs,
): Promise<CategoriesResult> => {
  const data = await prisma.category.findMany({
    skip: offset,
    take: limit,
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
      ],
    },
    orderBy: [
      {
        coverImage: 'asc',
      },
      {
        name: 'asc',
      },
    ],
  });

  if (data.length === 0) {
    return ({
      error: {
        message: 'No categories found',
      },
      data,
    });
  }

  return { data };
};

export default categories;
