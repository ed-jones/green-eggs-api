/**
 * Author: Edward Jones
 */
import fullRecipeArgs from '../recipe/fullRecipeArgs';

export default {
  include: {
    dietaryPreferences: true,
    allergyPreferences: true,
    following: true,
    followedBy: true,
    submittedRecipes: {
      ...fullRecipeArgs,
    },
  },
};
