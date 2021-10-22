/**
 * Author: Edward Jones
 */
import fullRecipeArgs from '../recipe/fullRecipeArgs';

/**
 * Arguments for a prisma operation that includes all user fields
 */
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
