import ski from "../../assets/images/ski.jpg";
import plongee from "../../assets/images/plongee.jpg";
import cyclisme from "../../assets/images/cyclisme.jpg";
import musculation from "../../assets/images/musculation.jpg";
import styles from "./Category.module.css";
const CategoryHome = () => {
  return (
    <div className={styles.containerCategory}>
      <div className={styles.cardCategory}>
        <img src={ski} alt="Montagne" />
        <h2>Montagne</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
          molestiae in similique tempore officiis deserunt consectetur id sed?
          Vel ut hic iusto nisi ab nihil dolorum sit eos. Numquam, dolor.
        </p>
        <a href="http://localhost:3000/categorie/Montagne">
          <button>Découvrir nos produits</button>
        </a>
      </div>

      <div className={styles.cardCategory}>
        <img src={plongee} alt="Mer" />
        <h2>Mer</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor
          praesentium quisquam modi laudantium eaque ut, provident enim eos qui
          quaerat molestias cupiditate? Adipisci quia ducimus itaque officia
          nihil natus iste!
        </p>
        <button>Découvrir nos produits</button>
      </div>
      <div className={styles.cardCategory}>
        <img src={musculation} alt="alterre" />
        <h2>Remise en forme</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos, nihil
          totam ut, ullam odit quas a tempore laboriosam aspernatur in aut
          quaerat vel ipsa culpa tempora dicta, aliquid at quasi!
        </p>
        <button>Découvrir nos produits</button>
      </div>
      <div className={styles.cardCategory}>
        <img src={cyclisme} alt="cycliste" />
        <h2>Cycle</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet sequi
          pariatur tenetur eos deserunt, sunt consectetur rem odio ipsum quasi
          quidem dolorum provident impedit error! Quae iste impedit harum
          tempora.
        </p>
        <button>Découvrir nos produits</button>
      </div>
    </div>
  );
};

export default CategoryHome;
