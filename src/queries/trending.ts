/**
 * Author: Edward Jones
 */
import { User as PrismaUser } from "@prisma/client";

import fullRecipeArgs from "../core/recipe/fullRecipeArgs";
import prismaToApolloRecipe from "../core/recipe/prismaToApolloRecipe";
import {
  QueryTrendingArgs,
  RecipesResult,
  Recipe as ApolloRecipe,
} from "../generated/graphql";
import prisma from "../prisma";
import me from "./me";
import buildRecipeArgsForUser from "../core/buildRecipeArgsForUser";

/**
 * Resolver that returns a paginated list of recipes that are popular and new
 */
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
    orderBy: [
      {
        createdAt: "desc",
      },
      {
        likedBy: {
          count: "desc",
        },
      },
    ],
    where: {
      ...(await buildRecipeArgsForUser(context)),
    },
  });

  const data: ApolloRecipe[] = prismaRecipes.map((recipe) =>
    prismaToApolloRecipe(recipe, context?.id)
  );

  return { data };
};

export default trending;
