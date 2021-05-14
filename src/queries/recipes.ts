import prisma from '../prisma';

const recipes = () => prisma.recipe.findMany({ include: { submittedBy: true } });

export default recipes;
