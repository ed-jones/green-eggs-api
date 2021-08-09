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
    likedBy: true,
    recipeComments: {
      include: {
        author: true,
        likedBy: true,
        replies: {
          include: {
            author: true,
            likedBy: true,
            replies: true,
          },
        },
      },
    },
  },
};
