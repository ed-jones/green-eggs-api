import prisma from '../prisma';
import { Recipe as ApolloRecipe, RecipesResult } from '../generated/graphql';
import fullRecipeArgs from '../core/recipe/fullRecipeArgs';
import prismaToApolloRecipe from '../core/recipe/prismaToApolloRecipe';

const recipes = async (): Promise<RecipesResult> => {
  const prismaRecipes = await prisma.recipe.findMany(
    fullRecipeArgs,
  );

  const data: ApolloRecipe[] = prismaRecipes.map(prismaToApolloRecipe);

  return { data };
};

export default recipes;
