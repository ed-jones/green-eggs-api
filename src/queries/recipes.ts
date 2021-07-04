import prisma from '../prisma';

const recipes = () => prisma.recipe.findMany({ include: { submittedBy: true, categories: true } });

export default recipes;
