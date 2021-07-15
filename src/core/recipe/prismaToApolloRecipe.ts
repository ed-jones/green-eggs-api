import {
  Privacy as ApolloPrivacy,
} from '../../generated/graphql';
import FullPrismaRecipeType from './FullPrismaRecipeType';

const prismaToApolloRecipe = (prismaRecipe: FullPrismaRecipeType) => ({
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
  createdAt: String(prismaRecipe.createdAt.getTime()),
  timeEstimate: String(prismaRecipe.timeEstimate.getTime()),
});

export default prismaToApolloRecipe;
