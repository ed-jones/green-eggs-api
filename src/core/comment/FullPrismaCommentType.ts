import { RecipeComment as PrismaRecipeComment, User as PrismaUser } from '@prisma/client';

type FullPrismaCommentType = PrismaRecipeComment & {
  author: PrismaUser;
  likedBy: PrismaUser[];
  replyTo: PrismaUser | null;
  replies: (PrismaRecipeComment & {
      author: PrismaUser;
      replies: PrismaRecipeComment[];
      likedBy: PrismaUser[];
  })[];
}

  export default FullPrismaCommentType;