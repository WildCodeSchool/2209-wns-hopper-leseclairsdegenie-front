
import { gql } from "@apollo/client";


export const getProducts = gql`
    query Products {
        products {
            # category {
            #     name
            # }
            id
            description
            disponibility
            image
            name
            price
            # ajouter réservations
        }
}
`

export const getProduct = gql`
    query Product($id: ID!) {
        product(Id: $id) {
            # category {
            #     name
            # }
            id
            description
            disponibility
            image
            name
            price
            # ajouter réservations
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
            disponibility
            image
            name
            price
        }
    }
`

export const updateWilder = gql`
    mutation UpdateProduct($data: ProductInput!, $id: ID!) {
        updateProduct(data: $data, Id: $id) {
            category {
                id
                name
            }
            description
            disponibility
            image
            name
            price
        }
}
`

export const deleteWilder = gql`
    mutation DeleteProduct($id: ID!) {
        deleteProduct(Id: $id) {
            name
        }
}
`