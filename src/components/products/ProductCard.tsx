import { Link } from "react-router-dom";
import "./Products.css";

export interface IProductProps {
  item: {
    image: string;
    price: number;
    description: string;
    id: number;
    name: string;
  };
}

const ProductCard = ({ item }: IProductProps) => {

  if (item !== null) {
    return (
      <article key={item.id} className="card">
        <img src={item.image} alt={item.description} />
        <div className="card-body">
          <h3>{item.name}</h3>
          <h4>{item.description}</h4>
          <Link className="product-details-link" to={`/products/details/${item.id}`}>+ Détails</Link>
        </div>
        <div className="card-foot">
          <span data-testid="product-price"><p>{item.price}€ / jour</p></span>
          <button className="button" title="Réserver">Réserver</button>
        </div>
      </article>
    );
  } else {
    return null;
  }
}


export default ProductCard;
