import { User as PrismaUser, Prisma } from '@prisma/client';

import prisma from '../prisma';
import {
  QueryRecipesArgs, Recipe as ApolloRecipe, RecipesResult, Sort,
} from '../generated/graphql';
import fullRecipeArgs from '../core/recipe/fullRecipeArgs';
import prismaToApolloRecipe from '../core/recipe/prismaToApolloRecipe';

const recipes = async (
  _parent: any,
  {
    offset, limit, query, sort,
  }: QueryRecipesArgs,
  context?: PrismaUser,
): Promise<RecipesResult> => {
  let orderBy: Prisma.Enumerable<Prisma.RecipeOrderByWithRelationInput>;

  switch (sort) {
    // Sort from newest to oldest
    case Sort.New:
      orderBy = {
        createdAt: 'desc',
      };
      break;
    // Sorted by by most likes, then by newest to oldest
    case Sort.Relevant:
      orderBy = {
        likedBy: {
          count: 'desc',
        },
        createdAt: 'desc',
      };
      break;
    // Sorted by most likes
    case Sort.Popular:
    default:
      orderBy = {
        likedBy: {
          count: 'desc',
        },
      };
  }

  const prismaRecipes = await prisma.recipe.findMany({
    ...fullRecipeArgs,
    skip: offset,
    take: limit,
    where: {
      OR: [
        { title: { contains: query } },
        { subtitle: { contains: query } },
        { description: { contains: query } },
      ],
    },
    orderBy,
  });

  const data: ApolloRecipe[] = prismaRecipes.map(
    (recipe) => prismaToApolloRecipe(recipe, context?.id),
  );

  return { data };
};

export default recipes;
