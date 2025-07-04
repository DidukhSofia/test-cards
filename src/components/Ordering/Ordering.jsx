import styles from "./ordering.module.scss";

function Ordering({ sortOrder, onSortChange }) {
  return (
    <div className={styles.ordering}>
      <span className={styles.ordering__text}>Сортувати:</span>
      <div className={styles.ordering__btns}>
      <button
        className={`${styles.ordering__button} ${sortOrder === "priceAsc" ? styles.ordering__active : ""}`}        onClick={() => onSortChange("priceAsc")}
      >
        За зростанням ціни
      </button>
      <button
        className={`${styles.ordering__button} ${sortOrder === "newest" ? styles.ordering__active : ""}`}
        onClick={() => onSortChange("newest")}
      >
        За новизною
      </button>
      </div>
    </div>
  );
}

export default Ordering;
