import styles from "./card.module.scss"
function Card ({name, prize, field, description}) {
    return(
        <div className={styles.card}>
            <div className="card__text-container">
                <p className={styles.card__field}>{field}</p>
                <h3 className={styles.card__name}>{name}</h3>
                <p className={styles.card__description}>{description}</p>
            </div>
            <p className={styles.card__prize}>{prize}$</p>
        </div>
    )
}
export default Card;