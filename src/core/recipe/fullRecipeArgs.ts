// import { Prisma } from '@prisma/client';

export default {
  include: {
    submittedBy: true,
    categories: true,
    diets: true,
    allergies: true,
    steps: true,
    ingredients: {
      include: {
        genericIngredient: true,
      },
    },
    recipeComments: {
      include: {
        author: true,
        replies: {
          include: {
            author: true,
          },
        },
        // _count: {
        //   replies: true,
        // },
      },
    },
  },
};
