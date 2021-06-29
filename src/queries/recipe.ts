import { QueryRecipeArgs } from '../generated/graphql';
import prisma from '../prisma';

const recipes = (_parent: any, { recipeId }: QueryRecipeArgs) => (
  prisma.recipe.findFirst({
    where: { id: recipeId },
    include: { submittedBy: true },
  })
);

export default recipes;
