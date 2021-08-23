import {
  Privacy as ApolloPrivacy, Recipe as ApolloRecipe,
} from '../../generated/graphql';
import prismaToApolloComment from '../comment/prismaToApolloComment';
import FullPrismaRecipeType from './FullPrismaRecipeType';

const prismaToApolloRecipe = (
  prismaRecipe: FullPrismaRecipeType, userId?: string,
): ApolloRecipe => ({
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
  liked: userId ? prismaRecipe.likedBy.map((liker) => liker.id).includes(userId) : false,
  comments: prismaRecipe.recipeComments.map((comment) => ({
    ...prismaToApolloComment(comment, userId),
  })),
  likeCount: prismaRecipe.likedBy.length,
  commentCount: prismaRecipe.recipeComments.length,
});

export default prismaToApolloRecipe;
