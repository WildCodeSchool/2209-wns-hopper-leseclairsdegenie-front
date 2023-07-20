import { gql } from "@apollo/client";

export const CREATE_RESERVATION = gql`
  mutation createReservation($data: ReservationInput!) {
    item: createReservation(data: $data) {
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

export const GET_RESERVATIONS = gql`
  query Reservations($cartId: ID!) {
    reservationsByCart(cartId: $cartId) {
      endDate
      startDate
      price
      product {
        name
        image
        id
        price
      }
      quantity
      nbJours
    }
  }`


export const deleteReservation = gql`
  mutation DeleteReservation($id: ID!) {
    deleteReservation(Id: $id) {
      id
    }
  }
`;