import { render, screen } from "@testing-library/react";
// import userEvent from '@testing-library/user-event'
import "@testing-library/jest-dom";
import ProductCard from "./ProductCard";

test('loads and displays price\'s product', async () => {
  // ARRANGE
  render(<ProductCard item={{
    image: "",
    price: 42.25,
    description: "Chaussures de randonnée",
    id: 2,
    name: "Chaussures de randonnée"
  }}/>)

  // ACT
//   await userEvent.click(screen.getByText('Load Greeting'))
//   await screen.findByRole('heading')

  // ASSERT
  expect(screen.getByTestId('product-price')).toHaveTextContent("42.25€ / jour")
//   expect(screen.getByRole('button')).toBeDisabled()
})
