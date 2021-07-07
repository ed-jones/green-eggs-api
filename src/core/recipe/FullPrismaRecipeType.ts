import {
    Recipe as PrismaRecipe,
    User as PrismaUser,
    Category as PrismaCategory,
    Diet as PrismaDiet,
    Allergies as PrismaAllergy,
    Ingredient as PrismaIngredient,
    GenericIngredient as PrismaGenericIngredient,
    RecipeStep as PrismaRecipeStep,
  } from "@prisma/client";

type FullPrismaRecipeType = PrismaRecipe & {
    submittedBy: PrismaUser;
  } & {
    categories: PrismaCategory[];
  } & {
    diets: PrismaDiet[];
  } & {
    allergies: PrismaAllergy[];
  } & {
    ingredients: (PrismaIngredient & {
      genericIngredient: PrismaGenericIngredient;
    })[]
  } & {
    steps: PrismaRecipeStep[];
  }
  
export default FullPrismaRecipeType;