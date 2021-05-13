import { prisma } from '..';
import UnixToISO from '../utils';

const addRecipe = async (_: any, {recipe}: any) => {
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