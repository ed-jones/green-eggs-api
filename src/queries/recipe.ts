import { QueryRecipeArgs } from '../generated/graphql';
import prisma from '../prisma';

const recipes = (_parent: any, { recipeId }: QueryRecipeArgs) => (
  prisma.recipe.findFirst({
    where: { id: recipeId },
    include: {
      submittedBy: true, categories: true, diets: true, allergies: true,
    },
  })
);

export default recipes;
