import { gql } from "@apollo/client";

export const createUser = gql`
  mutation Mutation($data: UserInput!) {
    createUser(data: $data) {
      id
    }
  }
`;
