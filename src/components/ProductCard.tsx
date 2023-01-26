import { IProduct } from "../interfaces";


export interface IProductsProps {
    products: IProduct[] | null;
}

const ProductCard = ({ products}: IProductsProps) => (
    <section>
          {products?.map((product) => {
            return (
                <article >
                    <img src={product.image} alt={product.description} />
                    <h3>{product.name}</h3>
                    <h4>{product.description}</h4>
                    <h4>{product.price} / jour</h4>
                    <button title="Réserver"/>
                </article>
            );
          })}
        </section>
  );
  
export default ProductCard;