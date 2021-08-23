import prisma from '../prisma';
import {
  AllergiesResult,
} from '../generated/graphql';
import Errors from '../errors';

const users = async (): Promise<AllergiesResult> => {
  const prismaAllergies = await prisma.allergies.findMany();

  if (prismaAllergies.length === 0) {
    return { data: prismaAllergies, error: { message: Errors.NO_ALLERGIES } };
  }

  return { data: prismaAllergies };
};

export default users;
