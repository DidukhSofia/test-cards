import styles from "./ordering.module.scss";

function Ordering({ sortOrder, onSortChange }) {
  return (
    <div className={styles.ordering}>
      <div className={styles.ordering__container}>
      <span className={styles.ordering__text}>Order by:</span>
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
