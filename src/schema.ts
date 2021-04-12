import { gql } from 'apollo-server';

const typeDefs = gql`
  type Recipe {
    title: String!
    description: String!
  }

  type Query {
    allRecipes: [Recipe!]!
  }
`;

export default typeDefs;
