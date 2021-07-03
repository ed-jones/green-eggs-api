import {
  Recipe as PrismaRecipe,
  User as PrismaUser,
  Prisma,
  Category as PrismaCategory,
} from "@prisma/client";

import prisma from "../prisma";
import { unixToISO } from "../utils";
import {
  MutationAddRecipeArgs,
  RecipeResult,
  Recipe as ApolloRecipe,
  CategoryInput,
  Category as ApolloCategory,
} from "../generated/graphql";
import Errors from "../errors";

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

  // Create category if it doesn't exist, else create 
  const categories: Prisma.CategoryCreateNestedManyWithoutRecipesInput = { 
    connectOrCreate: recipe.categories.map((recipeCategory) => {
      const name = (recipeCategory as CategoryInput).name.replace(/\W/g, "").trim().toUpperCase();
      return {
        where: { name },
        create: { name },
      };
    })
  }

  // Create prisma object from apollo object and user found in previous step
  const recipeInput: Prisma.RecipeCreateInput = {
    ...recipe,
    submittedBy: {
      connect: {
        id: user.id,
      },
    },
    categories,
    timeEstimate: unixToISO(recipe.timeEstimate),
  };


  type CreatedRecipe = PrismaRecipe & {
    submittedBy: PrismaUser;
  } & {
    categories: PrismaCategory[];
  }
  // Add recipe to database and fetch this recipe once in the database
  const createdRecipe: CreatedRecipe = await prisma.recipe.create({
    data: recipeInput,
    include: { submittedBy: true, categories: true },
  });

  // Convert fetched recipe to apollo object
  const returnedRecipe: ApolloRecipe = {
    ...createdRecipe,
    createdAt: String(createdRecipe.createdAt.getUTCMilliseconds()),
    timeEstimate: String(createdRecipe.timeEstimate.getUTCMilliseconds()),
  };

  return { data: returnedRecipe };
};

export default addRecipe;
