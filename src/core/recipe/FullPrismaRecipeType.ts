import {
  Recipe as PrismaRecipe,
  User as PrismaUser,
  Category as PrismaCategory,
  Diet as PrismaDiet,
  Allergies as PrismaAllergy,
  Ingredient as PrismaIngredient,
  GenericIngredient as PrismaGenericIngredient,
  RecipeStep as PrismaRecipeStep,
  RecipeComment as PrismaRecipeComment,
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
  } & {
    recipeComments: (PrismaRecipeComment & {
      author: PrismaUser;
      // count: {
      //   replies: number;
      // };
      replies: (PrismaRecipeComment & {
        author: PrismaUser;
      })[];
    })[];
  }
  
export default FullPrismaRecipeType;