/**
 * Author: Edward Jones
 */
import fullCommentArgs from '../comment/fullCommentArgs';

/**
 * Arguments for a prisma operation that includes all recipe fields
 */
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
    savedBy: true,
    recipeComments: {
      ...fullCommentArgs,
    },
  },
};
