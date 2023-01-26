import { useQuery } from "@apollo/client";
import { getProducts } from "../graphql/productsQueries";
import { IProduct } from "../interfaces";
import ProductCard from "./ProductCard";


export default function Products() {
    const { loading, data, refetch } = useQuery<{ products: IProduct[] }>(
        getProducts
      );
    
      if (loading) return (<div>Loading...</div>);
      const products = data ? data.products : null;

      return (
        <div>
          <header>
            <div>
              <h1>Wild-rent</h1>
            </div>
          </header>
          <main>
            <h2>Produits</h2>
            <ProductCard products={products} />
          </main>
          <footer>
            <div>
              <p>&copy; 2022 Wild Code School</p>
            </div>
          </footer>
        </div>
      );
}