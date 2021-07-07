import prisma from '../prisma';
import { Recipe as ApolloRecipe, RecipesResult, Privacy as ApolloPrivacy } from '../generated/graphql';

const recipes = async (): Promise<RecipesResult> => {
  const prismaRecipes = await prisma.recipe.findMany(
    {
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
    },
  );

  const data: ApolloRecipe[] = prismaRecipes.map((prismaRecipe) => ({
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
  }));

  return { data };
};

export default recipes;
