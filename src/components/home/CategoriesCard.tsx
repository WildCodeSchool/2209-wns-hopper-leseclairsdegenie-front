import { useQuery } from "@apollo/client";
import { ICategory } from "../../interfaces";
import styles from "./Category.module.css";
import { getCategories } from "../../graphql/Category";

export default function CategoriesCard() {
  const { loading, data } = useQuery<{ categories: ICategory[] }>(
    getCategories
  );

  if (loading) return <div>Loading...</div>;

  const categories = data ? data.categories : null;
  console.log(categories);

  return (
    <main className="categories-card-container">
      <section className={styles.card_category}>
        {categories?.map((item) => (
          <article key={item.id} className={styles.card}>
            <img src={item.image} alt="" />
            <div className={styles.card_body}>
              <h3>{item.name}</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
                molestiae in similique tempore officiis deserunt consectetur id
                sed? Vel ut hic iusto nisi ab nihil dolorum sit eos. Numquam,
                dolor.
              </p>
              <div className={styles.card_foot}>
                <a href="/products">
                  <button className={styles.button}>Découvrir nos produits</button>
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
