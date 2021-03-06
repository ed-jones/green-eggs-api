/**
 * Author: Edward Jones
 */
import {
  Prisma,
  User as PrismaUser,
} from '@prisma/client';

import prisma from '../prisma';
import { unixToISO } from '../utils';
import {
  Maybe,
  MutationAddRecipeArgs,
  RecipeResult,
  RecipeStepInput,
} from '../generated/graphql';
import Errors from '../errors';
import fileUpload from '../core/file-upload/fileUpload';
import fullRecipeArgs from '../core/recipe/fullRecipeArgs';
import FullPrismaRecipeType from '../core/recipe/FullPrismaRecipeType';
import prismaToApolloRecipe from '../core/recipe/prismaToApolloRecipe';

export function toTitleCase(input: string): string {
  return `${input.toUpperCase()[0]}${input.toLowerCase().slice(1)}`;
}

/**
 * Resolver that creates a new recipe, associated with the current logged in user
 */
const addRecipe = async (
  _parent: any,
  { recipe }: MutationAddRecipeArgs,
  context?: PrismaUser,
): Promise<RecipeResult> => {
  try {
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
    const { coverImage, ...recipeRest } = recipe;
    const { createReadStream, filename } = await coverImage;

    const fileURI = await fileUpload(filename, createReadStream);
    if (!fileURI) {
      throw new Error('Failed to upload image');
    }

    // Create category if it doesn't exist, else connect
    const categories: Prisma.CategoryCreateNestedManyWithoutRecipesInput = {
      connectOrCreate: recipeRest.categories?.map((recipeCategory) => {
        if (!recipeCategory) throw new Error('Missing recipe category field');
        const name = toTitleCase(recipeCategory.name);
        return {
          where: { name },
          create: { name },
        };
      }),
    };

    // Create diet if it doesn't exist, else connect
    const diets: Prisma.DietCreateNestedManyWithoutRecipesInput = {
      connectOrCreate: recipeRest.diets?.map((recipeDiets) => {
        if (!recipeDiets) throw new Error('Missing recipe diets field');
        const name = toTitleCase(recipeDiets.name);
        return {
          where: { name },
          create: { name },
        };
      }),
    };

    // Create allergy if it doesn't exist, else connect
    const allergies: Prisma.AllergiesCreateNestedManyWithoutRecipesInput = {
      connectOrCreate: recipeRest.allergies?.map((recipeAllergies) => {
        if (!recipeAllergies) throw new Error('Missing recipe allergies field');
        const name = toTitleCase(recipeAllergies.name);
        return {
          where: { name },
          create: { name },
        };
      }),
    };

    // Create ingredient if it doesn't exist, else connect
    const ingredients: Prisma.IngredientCreateNestedManyWithoutRecipeInput = {
      create: recipeRest.ingredients?.map((recipeIngredients) => {
        if (!recipeIngredients) throw new Error('Missing recipe ingredients field');
        const { name: wrongCaseName, ...rest } = recipeIngredients;
        const name = toTitleCase(wrongCaseName);
        return {
          ...rest,
          genericIngredient: {
            connectOrCreate: {
              where: { name },
              create: { name },
            },
          },
        };
      }),
    };

    // Create a step, including the description and image
    const steps: Prisma.RecipeStepCreateNestedManyWithoutRecipeInput = {
      create: recipeRest.steps && await Promise.all(recipeRest.steps?.map(async (step) => {
        if (!step) throw new Error('Missing recipe step field');
        const { image, ...stepRest } = step as RecipeStepInput;
        let imageURI: Maybe<string> | undefined = undefined;
        if (image) {
          const { filename: stepFilename, createReadStream: createStepReadStream } = await image;
          imageURI = await fileUpload(stepFilename, createStepReadStream);
          if (!imageURI) throw new Error('Failed to upload image');
        }
        return {
          ...stepRest,
          imageURI,
        };
      })) || undefined,
    };

    // Create prisma object from apollo object and user found in previous step
    const recipeInput: Prisma.RecipeCreateInput = {
      ...recipeRest,
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
      steps,
      timeEstimate: recipe.timeEstimate && unixToISO(recipe.timeEstimate),
    };

    // Add recipe to database and fetch this recipe once in the database
    const createdRecipe: FullPrismaRecipeType = await prisma.recipe.create({
      data: recipeInput,
      ...fullRecipeArgs,
    });

    return { data: prismaToApolloRecipe(createdRecipe, context.id) };
  } catch ({ message }) {
    return {
      error: {
        message: message as string,
      },
    };
  }
};

export default addRecipe;
