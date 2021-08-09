import {
  Privacy as ApolloPrivacy, Recipe as ApolloRecipe,
} from '../../generated/graphql';
import FullPrismaRecipeType from './FullPrismaRecipeType';

const prismaToApolloRecipe = (prismaRecipe: FullPrismaRecipeType): ApolloRecipe => ({
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
  comments: prismaRecipe.recipeComments.map((comment) => ({
    contents: comment.contents,
    author: comment.author,
    liked: false,
    likeCount: 1,
    replyCount: 2,
    replies: comment.replies.map((reply) => ({
      contents: reply.contents,
      author: reply.author,
      liked: false,
      likeCount: 1,
      replyCount: 2,
    })),
  })),
});

export default prismaToApolloRecipe;
