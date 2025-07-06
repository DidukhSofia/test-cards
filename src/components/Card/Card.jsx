import styles from "./card.module.scss"
import { useThemeContext } from "../../context/ThemeContext";

function Card ({name, prize, field, description}) {
    const { isDarkMode } = useThemeContext();
    
    return(
        <div className={styles.card}>
            <div className="card__text-container">
                <p className={styles.card__field} style={{color: isDarkMode ? "lightgray" : "rgba(128, 128, 128, 0.69)"}}>{field}</p>
                <h3 className={styles.card__name}>{name}</h3>
                <p className={styles.card__description} style={{color: isDarkMode ? "lightgray" : "rgba(128, 128, 128, 0.69)"}}>{description}</p>
            </div>
            <p className={styles.card__prize}>{prize}$</p>
        </div>
    )
}
export default Card;