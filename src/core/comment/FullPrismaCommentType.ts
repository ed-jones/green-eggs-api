/**
 * Author: Edward Jones
 */
import { RecipeComment as PrismaRecipeComment, User as PrismaUser } from '@prisma/client';

/**
 * Type of a comment (in prisma format) with all included fields
 */
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