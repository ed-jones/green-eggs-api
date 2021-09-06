import {
  User as PrismaUser,
  Diet as PrismaDiet,
  Allergies as PrismaAllergy,
  Follows,
} from "@prisma/client";

import FullPrismaRecipeType from '../recipe/FullPrismaRecipeType';

type FullPrismaUserType = PrismaUser & {
    dietaryPreferences: PrismaDiet[];
  } & {
    allergyPreferences: PrismaAllergy[];
  } & {
    following: Follows[];
  } & {
    followedBy: Follows[];
  } & {
    submittedRecipes: FullPrismaRecipeType[];
  }
  
export default FullPrismaUserType;