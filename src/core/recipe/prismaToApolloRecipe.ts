import {
  FullUser,
  Privacy as ApolloPrivacy, Recipe as ApolloRecipe,
} from '../../generated/graphql';
import prismaToApolloComment from '../comment/prismaToApolloComment';
import FullPrismaRecipeType from './FullPrismaRecipeType';
import prismaToApolloUser from '../user/prismaToApolloUser';

const prismaToApolloRecipe = (
  prismaRecipe: FullPrismaRecipeType, me?: FullUser,
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
  steps: prismaRecipe.steps.map(({ imageURI, title, ...step }, index) => ({
    ...step,
    image: imageURI,
    title: title ?? `Step ${index + 1}`,
  })),
  createdAt: String(prismaRecipe.createdAt.getTime()),
  timeEstimate: String(prismaRecipe.timeEstimate.getTime()),
  liked: me?.id ? prismaRecipe.likedBy.map((liker) => liker.id).includes(me?.id) : false,
  saved: me?.id ? prismaRecipe.savedBy.map((saver) => saver.id).includes(me?.id) : false,
  comments: prismaRecipe.recipeComments.filter(
    (recipeComment) => !recipeComment.replyTo,
  ).map((comment) => ({
    ...prismaToApolloComment(comment, me),
  })),
  likeCount: prismaRecipe.likedBy.length,
  commentCount: prismaRecipe.recipeComments.length,
});

export default prismaToApolloRecipe;
