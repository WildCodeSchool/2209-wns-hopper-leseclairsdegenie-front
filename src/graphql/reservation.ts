import gql from "graphql-tag";

export const createReservation = gql`
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