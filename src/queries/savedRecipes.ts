/**
 * Author: Edward Jones
 */
import { User as PrismaUser } from '@prisma/client';

import prisma from '../prisma';
import { Recipe as ApolloRecipe, RecipesResult, QuerySavedRecipesArgs } from '../generated/graphql';
import fullRecipeArgs from '../core/recipe/fullRecipeArgs';
import prismaToApolloRecipe from '../core/recipe/prismaToApolloRecipe';
import me from './me';

/**
 * Resolver that returns a paginated list of saved recipes
 */
const savedRecipes = async (
  parent: any,
  { offset, limit }: QuerySavedRecipesArgs,
  context?: PrismaUser,
): Promise<RecipesResult> => {
  const meResult = await me(parent, undefined, context);
  if (meResult.error || !meResult.data) return { error: meResult.error };

  const prismaRecipes = await prisma.recipe.findMany({
    ...fullRecipeArgs,
    skip: offset,
    take: limit,
    where: {
      savedBy: {
        some: {
          id: meResult.data.id,
        },
      },
    },
  });

  const data: ApolloRecipe[] = prismaRecipes.map(
    (recipe) => prismaToApolloRecipe(recipe, context?.id),
  );

  return { data };
};

export default savedRecipes;
