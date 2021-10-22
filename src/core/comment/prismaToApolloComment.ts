/**
 * Author: Edward Jones
 */
import { RecipeComment as ApolloRecipeComment } from '../../generated/graphql';
import prismaToApolloUser from '../user/prismaToApolloUser';
import FullPrismaCommentType from './FullPrismaCommentType';

/**
 * Converts a comment (in prisma format) to a comment (in apollo format)
 */
const prismaToApolloRecipe = (
  prismaComment: FullPrismaCommentType,
  userId?: string,
): ApolloRecipeComment => ({
  ...prismaComment,
  liked: userId ? prismaComment.likedBy.map((liker) => liker.id).includes(userId) : false,
  likeCount: prismaComment.likedBy.length,
  replyCount: prismaComment.replies.length,
  submittedBy: prismaToApolloUser(prismaComment.author),
  createdAt: String(prismaComment.createdAt.getTime()),
  replies: prismaComment.replies.map((reply) => ({
    ...reply,
    liked: userId ? reply.likedBy.map((liker) => liker.id).includes(userId) : false,
    likeCount: reply.likedBy.length,
    replyCount: reply.replies.length,
    submittedBy: prismaToApolloUser(reply.author),
  })),
});

export default prismaToApolloRecipe;
