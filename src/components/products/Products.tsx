import { useQuery } from "@apollo/client";
import { getProducts } from "../../graphql/productQueries";
import { IProduct } from "../../interfaces";
import ProductCard from "./ProductCard";
import "./Products.css";
import CategoryFilter from "./CategoryFilter";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

export default function Products() {
  const { loading, data, refetch } = useQuery<{ products: IProduct[] }>(
      getProducts
    );

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  
  if (loading) return (<div>Loading...</div>);
  const products = data ? data.products : null;

  return (
    <div className="products-page">
      <header>
        <ul className="products-filters">
          <li><CategoryFilter/></li>
          <li>            
            <select className="custom-select">
              <option selected>Genre</option>
              <option value="">Homme</option>
              <option value="">Femme</option>
              <option value="">Enfant</option>
            </select>
          </li>
          <li className="custom-select date-select">
          <label>du :
            <DatePicker selected={startDate} onChange={(date) => {if(date !== null) setStartDate(date)}}/>
          </label>
          <label>au : 
            <DatePicker selected={endDate} onChange={(date) => {if(date !== null) setEndDate(date)}}/>
          </label>          
          </li>
          <li>
            <select className="custom-select">
              <option selected>Prix</option>
              <option value=""> - de 15 €/jour</option>
              <option value="">Entre 15 et 30 €/jour</option>
              <option value="">Plus de 30 €/jour</option>
            </select>
          </li>
        </ul>
      </header>
      <main>
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