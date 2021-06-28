import prisma from '../prisma';

const recipes = (
) => prisma.recipe.findUnique({ where: { id: 'abc' }, include: { submittedBy: true } });

export default recipes;
