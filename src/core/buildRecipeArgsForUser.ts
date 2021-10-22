/**
 * Author: Edward Jones
 */
import { Prisma, User as PrismaUser } from '@prisma/client';
import me from '../queries/me';

/**
 * Function that builds the allergy and dietary preferences for a recipe, based on the preferences of the logged in user
 */
const buildRecipeArgsForUser = async (context: PrismaUser | undefined): Promise<Prisma.RecipeWhereInput | undefined> => {
  const meResult = await me(undefined, undefined, context);
  if (meResult.error || !meResult.data) return undefined;

  const NOT: Prisma.Enumerable<Prisma.RecipeWhereInput> = [];

  meResult.data.allergyPreferences.forEach((allergyPreference) => NOT.push({
    allergies: {
      some: {
        id: allergyPreference.id,
      },
    },
  }));

  const AND: Prisma.Enumerable<Prisma.RecipeWhereInput> = [];

  meResult.data.dietaryPreferences.forEach((dietaryPreference) => AND.push({
    diets: {
      some: {
        id: dietaryPreference.id,
      }
    }
  }))

  return {
    NOT,
    AND,
  }
}

export default buildRecipeArgsForUser;
