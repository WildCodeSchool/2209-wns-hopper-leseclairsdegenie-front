import { useQuery } from "@apollo/client";
import { getProducts } from "../graphql/productQueries";
import { IProduct } from "../interfaces";
import ProductCard from "../components/products/ProductCard";
import "../components/products/Products.css";


export default function Products() {
    const { loading, data, refetch } = useQuery<{ products: IProduct[] }>(
        getProducts
      );
    
      if (loading) return (<div>Loading...</div>);
      const products = data ? data.products : null;

      return (
        <div>
          <header>
            <ul className="products-filters">
              <li>Catégorie</li>
              <li>Sport</li>
              <li>Genre</li>
              <li>Dates</li>
              <li>Prix</li>
            </ul>
          </header>
          <main>
            <h2>Produits</h2>
            <section className="card-row">
              {products?.map((product) => {
                return (
                  <ProductCard product={product}/>
                );
              })}
            </section>
          </main>
        </div>
      );
}