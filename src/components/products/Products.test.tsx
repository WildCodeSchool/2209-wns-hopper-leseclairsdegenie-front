// import { render, screen } from "@testing-library/react";
// // import userEvent from '@testing-library/user-event'
// import "@testing-library/jest-dom";
// import ProductCard from "./ProductCard";


// test("loads and displays price's product", async () => {
//   // ARRANGE
//   render(
//     <ProductCard
//       item ={
//         {
//           image: "https://cdn.pixabay.com/photo/2020/09/13/09/50/mountain-bike-5567847_960_720.jpg",
//           price: 35,
//           description: "Partez à l'aventure où vous le souhaitez avec ce vtt électrique",
//           id:49,
//           name: "VTT électrique",
//         }
//       }
//     />
//   );

//   // ACT
//   //   await userEvent.click(screen.getByText('Load Greeting'))
//   //   await screen.findByRole('heading')

//   // ASSERT
//   expect(screen.getByTestId("product-price")).toHaveTextContent(
//     "35€ / jour"
//   );
//   //   expect(screen.getByRole('button')).toBeDisabled()
// });

import sum from './sum'

describe('sum', () => {
    it('adds two numbers', () => {
        expect(sum(2, 3)).toBe(5)
    })
})