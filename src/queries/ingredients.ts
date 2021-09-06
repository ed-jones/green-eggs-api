import prisma from '../prisma';
import {
  IngredientsResult,
} from '../generated/graphql';
import Errors from '../errors';

const ingredients = async (): Promise<IngredientsResult> => {
  const prismaIngredients = await prisma.ingredient.findMany({
    include: {
      genericIngredient: true,
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
