import { prisma } from '..';

const recipes = () => {
    return prisma.recipe.findMany({include: {submittedBy: true}});
}

export default recipes;
