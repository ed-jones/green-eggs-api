import fullRecipeArgs from '../core/recipe/fullRecipeArgs';
import prismaToApolloRecipe from '../core/recipe/prismaToApolloRecipe';
import {
  QueryRecipeArgs, RecipeResult,
} from '../generated/graphql';
import prisma from '../prisma';

const recipes = async (_parent: any, { recipeId }: QueryRecipeArgs): Promise<RecipeResult> => {
  const prismaRecipe = await prisma.recipe.findUnique({
    where: { id: recipeId },
    ...fullRecipeArgs,
  });

  if (!prismaRecipe) return { error: { message: `Could not find recipe with id ${recipeId}` } };

  return { data: prismaToApolloRecipe(prismaRecipe) };
};

export default recipes;
