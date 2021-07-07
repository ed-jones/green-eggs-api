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
  },
};
