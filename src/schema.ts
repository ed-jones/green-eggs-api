import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    id: String!
    firstName: String!
    lastName: String!
    email: String!
    avatarURI: String
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    avatarURI: String
  }

  type Recipe {
    id: String!
    title: String!
    description: String!
    submittedBy: User!
    commentCount: Int!
    likeCount: Int!
    createdAt: String!
    servingCount: Int!
    timeEstimate: String!
    previewURI: String!
  }

  type Query {
    recipes: [Recipe!]!
  }

  input RecipeInput {
    title: String!
    description: String!
    servingCount: Int!
    timeEstimate: String!
    previewURI: String!
  }

  type RecipeResult {
    data: Recipe!
  }

  type Mutation {
    addRecipe(recipe: RecipeInput!): RecipeResult!
  }
`;

export default typeDefs;
