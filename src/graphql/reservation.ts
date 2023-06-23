import { gql } from "@apollo/client";

export const CREATE_RESERVATION = gql`
    mutation createReservation($data: ReservationInput!) {
        createReservation(data: $data) {
            cart {
              id
            }
            product {
              name
            }
            quantity
            endDate
            startDate
          }
    }
`

export const deleteReservation = gql`
  mutation DeleteReservation($id: ID!) {
    deleteReservation(Id: $id) {
      id
    }
  }
`;