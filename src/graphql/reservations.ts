import { gql } from "@apollo/client";

export const deleteReservation = gql`
  mutation DeleteReservation($id: ID!) {
    deleteReservation(Id: $id) {
      id
    }
  }
`;
