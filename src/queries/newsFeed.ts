import { User as PrismaUser } from '@prisma/client';
import prisma from '../prisma';
import me from './me';

const newsFeed = async (parent: any, args: any, context: PrismaUser | undefined) => {
  const meResult = await me(parent, args, context);
  if (meResult.error) return meResult;

  // TODO: Only return recipes from followed accounts
  return prisma.recipe.findMany({ include: { submittedBy: true } });
};

export default newsFeed;
