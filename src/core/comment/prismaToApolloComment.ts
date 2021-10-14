import { FullUser, RecipeComment as ApolloRecipeComment } from '../../generated/graphql';
import prismaToApolloUser from '../user/prismaToApolloUser';
import FullPrismaCommentType from './FullPrismaCommentType';

const prismaToApolloComment = (
  prismaComment: FullPrismaCommentType,
  me?: FullUser,
): ApolloRecipeComment => ({
  ...prismaComment,
  liked: me?.id ? prismaComment.likedBy.map((liker) => liker.id).includes(me.id) : false,
  likeCount: prismaComment.likedBy.length,
  replyCount: prismaComment.replies.length,
  submittedBy: prismaToApolloUser(prismaComment.author),
  createdAt: String(prismaComment.createdAt.getTime()),
  replies: prismaComment.replies.map((reply) => ({
    ...reply,
    liked: me?.id ? reply.likedBy.map((liker) => liker.id).includes(me.id) : false,
    likeCount: reply.likedBy.length,
    replyCount: reply.replies.length,
    submittedBy: prismaToApolloUser(reply.author),
  })),
});

export default prismaToApolloComment;
