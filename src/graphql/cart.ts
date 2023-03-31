import { gql } from "@apollo/client";

export const updateCart = gql`
  mutation UpdateCart($data: CartInput!, $id: ID!) {
    updateCart(data: $data, Id: $id) {
      id
    }
  }
`;

export const verifyReservationsList = gql`
  mutation VerifyReservationsList($id: ID!) {
    verifyReservationsList(Id: $id)
  }
`;

export const createOrder = gql`
  mutation CreateOrder {
    createOrder {
      id
    }
  }
`;

export const addPriceCart = gql`
  mutation AddPriceCart($price: Float!) {
    addPriceCart(price: $price) {
      id
    }
  }
`;
