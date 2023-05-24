import { IProduct } from "../../interfaces";
import "./Products.css";

export interface IProductProps {
  item: IProduct;
}
const ProductCard = ({ item }: {item:IProduct}) => {

  if (item !== null) {
    return (
      <article key={item.id} className="card">
        <img src={item.image} alt={item.description} />
        <div className="card-body">
          <h3>{item.name}</h3>
          <h4>{item.description}</h4>
          <a className="product-details" href={"product/details"}>+ Détails</a>
        </div>
        <div className="card-foot">
        <span data-testid="product-price"><p>{item.price}€ / jour</p></span>
          <button  className="button" title="Réserver">Réserver</button>
        </div>
      </article>
    ); 
  } else {
    return null;
  }     
}


export default ProductCard;
