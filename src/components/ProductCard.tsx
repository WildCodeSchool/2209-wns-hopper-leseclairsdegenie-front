import { IProduct } from "../interface";
import styles from "../assets/CSS/ProductCard.module.css";
import cyclisme from "../assets/images/cyclisme.jpg";

export interface IProductsProps {
  products: IProduct[] | null;
}

const ProductCard = ({ products }: IProductsProps) => (
  <section className={styles.sectionProduct}>
    {products?.map((product) => {
      return (
        <article key={product.id} className={styles.articleProduct}>
          <img src={cyclisme} alt={product.description} />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <h4>{product.price}€ / jour</h4>
          <button className="button">Réserver</button>
        </article>
      );
    })}
  </section>
);

export default ProductCard;
