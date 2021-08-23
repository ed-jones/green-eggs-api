
import prisma from '../prisma';
import {
    CategoriesResult,
  QueryRecipesArgs, Recipe as ApolloRecipe, Sort,
} from '../generated/graphql';

const categories = async (): Promise<CategoriesResult> => {

  const data = await prisma.category.findMany();

  if (data.length == 0) {
    return ({
      error: {
        message: "No categories found"
      },
      data
    })
  }

  return { data };
};

export default categories;
