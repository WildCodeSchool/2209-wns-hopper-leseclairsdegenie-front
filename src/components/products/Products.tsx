import { useQuery } from "@apollo/client";
import { getProducts } from "../../graphql/productQueries";
import { IProduct } from "../../interfaces";
import ProductCard from "./ProductCard";
import "./Products.css";
import { useState } from "react";

export default function Products() {
  const { loading, data } = useQuery<{ products: IProduct[] }>(
    getProducts
  );

  const [filteredList, setFilteredList] = useState< IProduct[]>();

  const products = data ? data.products : null;

  const search = (event: any) => {
    const query = event.target.value;
    let updatedList = [...(products || [])];
    updatedList = updatedList.filter((item) => {
      return (
        item.name.toLowerCase().toLowerCase().includes(query) ||
        item.description.toLowerCase().toLowerCase().includes(query) ||
        item.category.name.toLowerCase().toLowerCase().includes(query)
      );
    });
    setFilteredList(updatedList);
    console.log(filteredList);
  };

  //autre possibilite de recherche mais avec typescript on est trop limité
  //
  // const keys:(keyof IProduct)[] = ["name", "description", "category"];
  // const search = (products: IProduct[]) => {
  //   return products.filter((item) =>
  //     keys.some((key) => item[key].toLowerCase().includes(query))
  //   );
  // };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="products-page">
      <header>
        <ul className="products-filters">
          <li>
            <input
              type="text"
              placeholder="recherche..."
              className="search"
              // onChange={(e) => setQuery(e.target.value.toLowerCase())}
              onChange={search}
            />
          </li>
        </ul>
      </header>
      <main>
        <section className="card-row">
          {filteredList ? filteredList.map((item)=>(
           <ProductCard item={item} />
            )): 
            <section className="card-row">
            {products?.map((product) => {
              return (
                <ProductCard item={product}/>
              );
            })}
          </section>

          }
        </section>
      </main>
    </div>
  );
}
