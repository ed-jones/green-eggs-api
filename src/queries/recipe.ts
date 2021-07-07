import {
  QueryRecipeArgs, Recipe as ApolloRecipe, RecipeResult, Privacy as ApolloPrivacy,
} from '../generated/graphql';
import prisma from '../prisma';

const recipes = async (_parent: any, { recipeId }: QueryRecipeArgs): Promise<RecipeResult> => {
  const prismaRecipe = await prisma.recipe.findUnique({
    where: { id: recipeId },
    include: {
      submittedBy: true,
      categories: true,
      diets: true,
      allergies: true,
      steps: true,
      ingredients: {
        include: {
          genericIngredient: true,
        },
      },
    },
  });

  if (prismaRecipe === null) return { error: { message: `Could not find recipe with id ${recipeId}` } };

  const data: ApolloRecipe = {
    ...prismaRecipe,
    visibility: prismaRecipe.visibility as ApolloPrivacy,
    commentability: prismaRecipe.commentability as ApolloPrivacy,
    likeability: prismaRecipe.likeability as ApolloPrivacy,
    coverImage: prismaRecipe.previewURI,
    ingredients: prismaRecipe.ingredients.map((prismaRecipeIngredient) => ({
      ...prismaRecipeIngredient,
      name: prismaRecipeIngredient.genericIngredient.name,
    })),
    steps: prismaRecipe.steps.map((step) => ({
      ...step,
      image: step.imageURI,
    })),
    createdAt: String(prismaRecipe.createdAt.getUTCMilliseconds()),
    timeEstimate: String(prismaRecipe.timeEstimate.getUTCMilliseconds()),
  };

  return { data };
};

export default recipes;
