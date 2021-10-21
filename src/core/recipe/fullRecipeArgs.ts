/**
 * Author: Edward Jones
 */
import fullCommentArgs from '../comment/fullCommentArgs';

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
