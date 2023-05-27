import { Link } from "react-router-dom";
import { IProduct } from "../../interfaces";
import "./Products.css";

export interface IProductProps {
  product: {
    image: string;
    price: number;
    description: string;
    id: number;
    name: string;
  }
}

const ProductCard = ({ product }: IProductProps) => {
  if (product !== null) {
    return (
      <article key={product.id} className="card">
        <img src={product.image} alt={product.description} />
        <div className="card-body">
          <h3>{product.name}</h3>
          <h4>{product.description}</h4>
          <Link className="product-details-link" to={`/products/product-details/${product.id}`}>+ Détails</Link>
        </div>
        <div className="card-foot">
        <span data-testid="product-price"><p>{product.price}€ / jour</p></span>
          <button  className="button" title="Réserver">Réserver</button>
        </div>
      </article>
    ); 
  } else {
    return null;
  }     
}


export default ProductCard;
