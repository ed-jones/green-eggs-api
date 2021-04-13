import { gql } from 'apollo-server';

const typeDefs = gql`
  fragment RecipeFragment on Recipe {
    title
    description
  }

  type Recipe {
    title: String!
    description: String!
  }

  type Query {
    allRecipes: [Recipe!]!
  }

  input AddRecipeInput {
    title: String!
    description: String!
  }

  type AddRecipeResult {
    data: Recipe!
  }

  type Mutation {
    addRecipe(recipe: AddRecipeInput!): AddRecipeResult!
  }
`;

export default typeDefs;
