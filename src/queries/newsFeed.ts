/**
 * Author: Edward Jones
 */
import { User as PrismaUser } from '@prisma/client';
import fullRecipeArgs from '../core/recipe/fullRecipeArgs';

import {
  QueryNewsFeedArgs, RecipesResult, Recipe as ApolloRecipe
} from '../generated/graphql';
import prismaToApolloRecipe from '../core/recipe/prismaToApolloRecipe';
import prisma from '../prisma';
import me from './me';
import buildRecipeArgsForUser from '../core/buildRecipeArgsForUser';

const newsFeed = async (
  parent: any,
  { offset, limit }: QueryNewsFeedArgs,
  context: PrismaUser | undefined
): Promise<RecipesResult> => {
  const meResult = await me(parent, undefined, context);
  if (meResult.error || !meResult.data) return { error: meResult.error };

  // Return a list of paginated recipes, sorted by creation date and 
  // filtered by accounts followed by the user
  const prismaRecipes = await prisma.recipe.findMany({
    ...fullRecipeArgs,
    skip: offset,
    take: limit,
    orderBy: {
      createdAt: 'desc'
    },
    where: {
      ...await buildRecipeArgsForUser(context),
      submittedBy: {
        followedBy: {
          some: {
            followingId: meResult.data.id,
          }
        }
      }
    },
  });

  const data: ApolloRecipe[] = prismaRecipes.map(
    (recipe) => prismaToApolloRecipe(recipe, context?.id),
  );

  return { data };
};

export default newsFeed;
