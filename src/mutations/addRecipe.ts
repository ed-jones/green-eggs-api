import {
  Recipe as PrismaRecipe,
  User as PrismaUser,
  Prisma,
  Category as PrismaCategory,
  Diet as PrismaDiet,
  Allergies as PrismaAllergy,
  Ingredient as PrismaIngredient,
  GenericIngredient as PrismaGenericIngredient,
} from "@prisma/client";

import prisma from "../prisma";
import { unixToISO } from "../utils";
import {
  MutationAddRecipeArgs,
  RecipeResult,
  Recipe as ApolloRecipe,
  CategoryInput,
  DietInput,
  AllergyInput,
  IngredientInput,
} from "../generated/graphql";
import Errors from "../errors";
import fileUpload from "../core/file-upload/fileUpload";

const addRecipe = async (
  _parent: any,
  { recipe }: MutationAddRecipeArgs,
  context?: PrismaUser
): Promise<RecipeResult> => {
  // Find user to connect to this recipe
  if (!context?.id) {
    return {
      error: {
        message: Errors.NO_CONTEXT,
      },
    };
  }
  const user = await prisma.user.findUnique({
    where: {
      id: context.id,
    },
  });
  if (!user?.id) {
    return {
      error: {
        message: Errors.NO_USER,
      },
    };
  }

  const { createReadStream, filename } = await recipe.coverImage;

  const fileURI = await fileUpload(filename, createReadStream());
  if (!fileURI) {
    return {
      error: {
        message: "Failed to upload image"
      }
    }
  }

  // Create category if it doesn't exist, else create 
  const categories: Prisma.CategoryCreateNestedManyWithoutRecipesInput = { 
    connectOrCreate: recipe.categories.map((recipeCategory) => {
      const name = (recipeCategory as CategoryInput).name.replace(/\W/g, "").trim().toUpperCase();
      return {
        where: { name },
        create: { name },
      };
    })
  };

  const diets: Prisma.DietCreateNestedManyWithoutRecipesInput = { 
    connectOrCreate: recipe.diets.map((recipeDiets) => {
      const name = (recipeDiets as DietInput).name.replace(/\W/g, "").trim().toUpperCase();
      return {
        where: { name },
        create: { name },
      };
    })
  };

  const allergies: Prisma.AllergiesCreateNestedManyWithoutRecipesInput = { 
    connectOrCreate: recipe.allergies.map((recipeAllergies) => {
      const name = (recipeAllergies as AllergyInput).name.replace(/\W/g, "").trim().toUpperCase();
      return {
        where: { name },
        create: { name },
      };
    })
  };

  const ingredients: Prisma.IngredientCreateNestedManyWithoutRecipeInput = { 
    create: recipe.ingredients.map((recipeIngredients) => {
      let { name, ...rest } = recipeIngredients as IngredientInput;
      name = name.replace(/\W/g, "").trim().toUpperCase();
      return {
        ...rest,
        genericIngredient: {
          connectOrCreate: {
            where: { name },
            create: { name }
          }
        }
      };
    })
  };

  // Create prisma object from apollo object and user found in previous step
  const recipeInput: Prisma.RecipeCreateInput = {
    ...recipe,
    previewURI: fileURI,
    submittedBy: {
      connect: {
        id: user.id,
      },
    },
    categories,
    diets,
    allergies,
    ingredients,
    timeEstimate: unixToISO(recipe.timeEstimate),
  };

  type CreatedRecipe = PrismaRecipe & {
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
  }

  // Add recipe to database and fetch this recipe once in the database
  const createdRecipe: CreatedRecipe = await prisma.recipe.create({
    data: recipeInput,
    include: {
      submittedBy: true,
      categories: true,
      diets: true,
      allergies: true,
      ingredients: {
        include: {
          genericIngredient: true,
        },
      },
    },
  });

  // Convert fetched recipe to apollo object
  const returnedRecipe: ApolloRecipe = {
    ...createdRecipe,
    coverImage: createdRecipe.previewURI,
    ingredients: createdRecipe.ingredients.map((createdRecipeIngredient) => ({
      ...createdRecipeIngredient,
      name: createdRecipeIngredient.genericIngredient.name
    })),
    createdAt: String(createdRecipe.createdAt.getUTCMilliseconds()),
    timeEstimate: String(createdRecipe.timeEstimate.getUTCMilliseconds()),
  };

  return { data: returnedRecipe };
};

export default addRecipe;
