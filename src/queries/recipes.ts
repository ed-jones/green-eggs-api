/**
 * Author: Edward Jones
 */
import { User as PrismaUser, Prisma } from '@prisma/client';

import prisma from '../prisma';
import {
  QueryRecipesArgs, Recipe as ApolloRecipe, RecipesResult, Sort,
} from '../generated/graphql';
import fullRecipeArgs from '../core/recipe/fullRecipeArgs';
import prismaToApolloRecipe from '../core/recipe/prismaToApolloRecipe';
import buildRecipeArgsForUser from '../core/buildRecipeArgsForUser';

/**
 * Resolver that returns a paginated list of recipes that be queried, filtered and sorted
 */
const recipes = async (
  _parent: any,
  {
    offset, limit, query, sort, filter,
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
      orderBy = [
        {
          likedBy: {
            count: 'desc',
          },
        },
        {
          createdAt: 'desc',
        },
      ];
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

  const OR: Prisma.Enumerable<Prisma.RecipeWhereInput> = [];
  OR.push(
    { title: { contains: query, mode: 'insensitive' } },
    { description: { contains: query, mode: 'insensitive' } },
  );

  // Exclude allergies and excluded ingredients
  const NOT: Prisma.Enumerable<Prisma.RecipeWhereInput> = [];
  filter.allergies?.forEach((allergy) => {
    NOT.push({
      allergies: {
        some: {
          id: allergy,
        },
      },
    });
  });
  filter.ingredients?.excludes?.forEach((excludedIngredient) => {
    NOT.push({
      ingredients: {
        some: {
          genericIngredient: {
            id: excludedIngredient,
          },
        },
      },
    });
  });

  // Include categories, diets, included ingredients and cook time
  const AND: Prisma.Enumerable<Prisma.RecipeWhereInput> = [];
  filter.categories?.forEach((category) => {
    AND.push({
      categories: {
        some: {
          id: category,
        },
      },
    });
  });
  filter.diets?.forEach((diet) => {
    AND.push({
      diets: {
        some: {
          id: diet,
        },
      },
    });
  });
  filter.ingredients?.includes?.forEach((includedIngredient) => {
    AND.push({
      ingredients: {
        some: {
          genericIngredient: {
            id: includedIngredient,
          },
        },
      },
    });
  });
  if (filter.cookTime) {
    AND.push({
      timeEstimate: filter.cookTime,
    });
  }

  if (filter.user) {
    AND.push({
      submittedById: filter.user,
    });
  }

  const recipeArgsForUser = await buildRecipeArgsForUser(context);
  if (Array.isArray(recipeArgsForUser?.AND) && recipeArgsForUser?.AND !== undefined) {
    AND.push(...recipeArgsForUser?.AND);
  }
  if (Array.isArray(recipeArgsForUser?.OR) && recipeArgsForUser?.OR !== undefined) {
    OR.push(...recipeArgsForUser?.OR);
  }

  const prismaRecipes = await prisma.recipe.findMany({
    ...fullRecipeArgs,
    skip: offset,
    take: limit,
    where: {
      OR,
      NOT,
      AND,
    },
    orderBy,
  });

  const data: ApolloRecipe[] = prismaRecipes.map(
    (recipe) => prismaToApolloRecipe(recipe, context?.id),
  );

  return { data };
};

export default recipes;
