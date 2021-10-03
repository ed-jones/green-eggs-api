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
  const prismaIngredients = await prisma.ingredient.findMany({
    include: {
      genericIngredient: true,
    },
    skip: offset,
    take: limit,
    where: {
      OR: [
        { genericIngredient: { name: { contains: query } } },
      ],
    },
    orderBy: {
      genericIngredient: {
        name: 'asc',
      },
    },
  });
  const apolloIngredients = prismaIngredients.map(
    ({ genericIngredient, ...ingredient }) => ({ ...ingredient, name: genericIngredient.name }),
  );
  if (prismaIngredients.length === 0) {
    return { data: apolloIngredients, error: { message: Errors.NO_INGREDIENTS } };
  }

  return { data: apolloIngredients };
};

export default ingredients;
