import { IProduct } from "../../interfaces";
import "./Products.css";

export interface IProductProps {
  product: IProduct | null;
}

const ProductCard = ({ product }: IProductProps) => {
  if (product !== null) {
    return (
      <article key={product.id} className="card">
        <img src={product.image} alt={product.description} />
        <div className="card-body">
          <h3>{product.name}</h3>
          <h4>{product.description}</h4>
        </div>
        <div className="card-foot">
          <p>{product.price}€ / jour</p>
          <button  className="button" title="Réserver">Réserver</button>
        </div>
      </article>
    ); 
  } else {
    return null;
  }     
}


export default ProductCard;
