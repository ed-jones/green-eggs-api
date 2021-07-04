import prisma from '../prisma';

const recipes = () => prisma.recipe.findMany(
  {
    include: {
      submittedBy: true, categories: true, diets: true, allergies: true,
    },
  },
);

export default recipes;
