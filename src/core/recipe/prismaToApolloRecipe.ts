import {
  Privacy as ApolloPrivacy, Recipe as ApolloRecipe,
} from '../../generated/graphql';
import prismaToApolloComment from '../comment/prismaToApolloComment';
import FullPrismaRecipeType from './FullPrismaRecipeType';
import prismaToApolloUser from '../user/prismaToApolloUser';

const prismaToApolloRecipe = (
  prismaRecipe: FullPrismaRecipeType, userId?: string,
): ApolloRecipe => ({
  ...prismaRecipe,
  submittedBy: prismaToApolloUser(prismaRecipe.submittedBy),
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
  comments: prismaRecipe.recipeComments.filter(
    (recipeComment) => !recipeComment.replyTo,
  ).map((comment) => ({
    ...prismaToApolloComment(comment, userId),
  })),
  likeCount: prismaRecipe.likedBy.length,
  commentCount: prismaRecipe.recipeComments.length,
});

export default prismaToApolloRecipe;
