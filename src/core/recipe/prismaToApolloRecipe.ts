/**
 * Author: Edward Jones
 */
import {
  Recipe as ApolloRecipe,
} from '../../generated/graphql';
import prismaToApolloComment from '../comment/prismaToApolloComment';
import FullPrismaRecipeType from './FullPrismaRecipeType';
import prismaToApolloUser from '../user/prismaToApolloUser';

/**
 * Converts a recipe (in prisma format) to a recipe (in apollo format)
 */
const prismaToApolloRecipe = (
  prismaRecipe: FullPrismaRecipeType, userId?: string,
): ApolloRecipe => ({
  ...prismaRecipe,
  submittedBy: prismaToApolloUser(prismaRecipe.submittedBy),
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
  timeEstimate: prismaRecipe.timeEstimate && String(prismaRecipe.timeEstimate.getTime()),
  liked: userId ? prismaRecipe.likedBy.map((liker) => liker.id).includes(userId) : false,
  saved: userId ? prismaRecipe.savedBy.map((saver) => saver.id).includes(userId) : false,
  comments: prismaRecipe.recipeComments.filter(
    (recipeComment) => !recipeComment.replyTo,
  ).map((comment) => ({
    ...prismaToApolloComment(comment, userId),
  })),
  likeCount: prismaRecipe.likedBy.length,
  commentCount: prismaRecipe.recipeComments.length,
});

export default prismaToApolloRecipe;
