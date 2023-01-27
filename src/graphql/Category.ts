import { gql } from "@apollo/client";

export const getOneCategory = gql`
  query GetOneCategory($categoryName: String!) {
    getOneCategory(categoryName: $categoryName) {
      name
      products {
        image
        price
        disponibility
        description
        id
        name
      }
    }
  }
`;
