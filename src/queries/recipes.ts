import { User as PrismaUser } from '@prisma/client';

import prisma from '../prisma';
import { QueryRecipesArgs, Recipe as ApolloRecipe, RecipesResult } from '../generated/graphql';
import fullRecipeArgs from '../core/recipe/fullRecipeArgs';
import prismaToApolloRecipe from '../core/recipe/prismaToApolloRecipe';

const recipes = async (
  _parent: any,
  { offset, limit }: QueryRecipesArgs,
  context?: PrismaUser,
): Promise<RecipesResult> => {
  const prismaRecipes = await prisma.recipe.findMany({
    ...fullRecipeArgs,
    skip: offset,
    take: limit,
  });

  const data: ApolloRecipe[] = prismaRecipes.map(
    (recipe) => prismaToApolloRecipe(recipe, context?.id),
  );

  return { data };
};

export default recipes;
