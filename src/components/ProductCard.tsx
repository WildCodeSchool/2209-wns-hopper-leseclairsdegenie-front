import { IProduct } from "../interfaces";
import styles from "./ProductCard.module.css";

export interface IProductsProps {
  products: IProduct[] | null;
}

const ProductCard = ({ products }: IProductsProps) => (
  <section className={styles.sectionProduct}>
    {products?.map((product) => {
      return (
        <article key={product.id}>
          <img src={product.image} alt={product.description} />
          <h3>{product.name}</h3>
          <h4>{product.description}</h4>
          <h4>{product.price}€ / jour</h4>
          <button title="Réserver" />
        </article>
      );
    })}
  </section>
);

export default ProductCard;
