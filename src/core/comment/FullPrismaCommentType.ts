/**
 * Author: Edward Jones
 */
import { RecipeComment as PrismaRecipeComment, User as PrismaUser } from '@prisma/client';

type FullPrismaCommentType = PrismaRecipeComment & {
  author: PrismaUser;
  likedBy: PrismaUser[];
  replyTo: PrismaRecipeComment | null;
  replies: (PrismaRecipeComment & {
      author: PrismaUser;
      replies: PrismaRecipeComment[];
      likedBy: PrismaUser[];
  })[];
}

  export default FullPrismaCommentType;