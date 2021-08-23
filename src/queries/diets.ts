import prisma from '../prisma';
import {
  DietsResult,
} from '../generated/graphql';
import Errors from '../errors';

const diets = async (): Promise<DietsResult> => {
  const prismaDiet = await prisma.diet.findMany();

  if (prismaDiet.length === 0) {
    return { data: prismaDiet, error: { message: Errors.NO_DIETS } };
  }

  return { data: prismaDiet };
};

export default diets;
