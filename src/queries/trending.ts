import { User as PrismaUser } from '@prisma/client';

import fullRecipeArgs from '../core/recipe/fullRecipeArgs';
import prismaToApolloRecipe from '../core/recipe/prismaToApolloRecipe';
import {
  QueryTrendingArgs, RecipesResult, Recipe as ApolloRecipe
} from '../generated/graphql';
import prisma from '../prisma';
import me from './me';

const trending = async (
  parent: any,
  { offset, limit }: QueryTrendingArgs,
  context: PrismaUser | undefined
): Promise<RecipesResult> => {
  const meResult = await me(parent, undefined, context);
  if (meResult.error) return { error: meResult.error };

  // Return a list of paginated recipes, sorted by like count in the past 7 days
  const prismaRecipes = await prisma.recipe.findMany({ 
    ...fullRecipeArgs,
    skip: offset,
    take: limit,
    orderBy: {
      likedBy: {
        count: 'desc',
      },
    },
    where: {
      createdAt: {
        gte: new Date(Date.now() - (7 * 24 * 60 * 60 * 1000)),
      },
    },
  });

  const data: ApolloRecipe[] = prismaRecipes.map(
    (recipe) => prismaToApolloRecipe(recipe, context?.id),
  );

  return { data };

};

export default trending;
