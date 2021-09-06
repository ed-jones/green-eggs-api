import {
  User as PrismaUser,
  Diet as PrismaDiet,
  Allergies as PrismaAllergy,
} from "@prisma/client";

type FullPrismaRecipeType = PrismaUser & {
    dietaryPreferences: PrismaDiet[];
  } & {
    allergyPreferences: PrismaAllergy[];
  }
  
export default FullPrismaRecipeType;