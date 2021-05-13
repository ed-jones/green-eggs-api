import { gql } from 'apollo-server-core';
import { prisma } from '..';
import UnixToISO from '../utils';
import { MutationAddRecipeArgs } from '../generated/graphql';

const addRecipe = async (_: any, {recipe}: MutationAddRecipeArgs) => {
  const firstUser = await prisma.user.findFirst();
  const recipeInput = {
    ...recipe,
    submittedBy: {
      connect: {
        id: firstUser?.id,
      }
    },
    timeEstimate: UnixToISO(recipe.timeEstimate),
  }
  const submittedRecipe = await prisma.recipe.create({data: recipeInput, include: {submittedBy: true}});
  return {data: submittedRecipe};
}

export default addRecipe;