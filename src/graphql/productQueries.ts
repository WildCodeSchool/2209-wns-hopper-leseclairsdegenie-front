
import { gql } from "@apollo/client";


export const getProducts = gql`
    query Products {
        products {
            # category {
            #     name
            # }
            id
            description
            image
            name
            price
            # ajouter réservations
        }
}
`

export const getProduct = gql`
    query Product($id: ID!, $startDate: DateTime!, $endDate: DateTime!) {
        product(Id: $id) {
            # category {
            #     name
            # }
            id
            description
            availability(startDate: $startDate, endDate: $endDate) {
                date
                quantity
              }
            image
            name
            price
        }
    }
`

export const createProduct = gql`
    mutation createProduct($data: ProductInput!) {
        createProduct(data: $data) {
            category {
                id
                name
            }
            description
            image
            name
            price
        }
    }
`

export const updateProduct = gql`
    mutation UpdateProduct($data: ProductInput!, $id: ID!) {
        updateProduct(data: $data, Id: $id) {
            category {
                id
                name
            }
            description
            image
            name
            price
        }
}
`

export const deleteProduct = gql`
    mutation DeleteProduct($id: ID!) {
        deleteProduct(Id: $id) {
            name
        }
}
`