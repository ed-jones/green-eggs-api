/**
 * Author: Edward Jones
 */
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
import FullPrismaCommentType from "../comment/FullPrismaCommentType";

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
    likedBy: PrismaUser[];
  } & {
    savedBy: PrismaUser[];
  }&{
    recipeComments: FullPrismaCommentType[];
  }
  
export default FullPrismaRecipeType;