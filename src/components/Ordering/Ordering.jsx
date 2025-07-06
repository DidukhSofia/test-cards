import styles from "./ordering.module.scss";
import { useThemeContext } from "../../context/ThemeContext";


function Ordering({ sortOrder, onSortChange }) {
  const { isDarkMode } = useThemeContext();
  
  return (
    <div className={styles.ordering}>
      <div className={styles.ordering__container}>
      <span className={styles.ordering__text} style={{color: isDarkMode ? "lightgray" : "rgba(128, 128, 128, 0.69)"}}>Order by:</span>
      <div className={styles.ordering__btns}>
      <button
        className={`${styles.ordering__button} ${sortOrder === "priceAsc" ? styles.ordering__active : ""}`}        onClick={() => onSortChange("priceAsc")}
      >
        Lowest price
      </button>
      <button
        className={`${styles.ordering__button} ${sortOrder === "newest" ? styles.ordering__active : ""}`}
        onClick={() => onSortChange("newest")}
      >
        Newest Listings
      </button>
      </div>
      </div>
    </div>
  );
}

export default Ordering;
