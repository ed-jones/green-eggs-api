import prisma from '../prisma';
import {
  IngredientsResult, QueryIngredientsArgs,
} from '../generated/graphql';
import Errors from '../errors';

const ingredients = async (
  _parent: any,
  {
    offset, limit, query,
  }: QueryIngredientsArgs,
): Promise<IngredientsResult> => {
  const prismaIngredients = await prisma.genericIngredient.findMany({
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

  if (prismaIngredients.length === 0) {
    return { data: prismaIngredients, error: { message: Errors.NO_INGREDIENTS } };
  }

  return { data: prismaIngredients };
};

export default ingredients;
