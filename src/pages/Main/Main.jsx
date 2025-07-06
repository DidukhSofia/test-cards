import ListCards from "../../components/ListCards/ListCards";
import Filter from "../../components/Filter/Filter";
import styles from "./main.module.scss";
import CloseIcon from '@mui/icons-material/Close';
import { FormControlLabel } from "@mui/material";
import { useThemeContext } from "../../context/ThemeContext";
import CustomSwitch from "../../components/Switch/Switch";
import { useCards } from "../../context/CardContext"; 


function MainPage() {
    const { isDarkMode, toggleTheme } = useThemeContext();
    const { cards, filteredCardsCount } = useCards(); 

    const averagePrice =
    cards && cards.length > 0
      ? (cards.reduce((sum, card) => sum + (card.prize || 0), 0) / cards.length).toFixed(2)
      : "0";
    return (
    <>
        <div className={styles.main__heading}>
            <h2 className={styles.main__title} style={{color: isDarkMode ? "white" : "black"}}>Filters</h2>
            <button className={styles.main__close}><CloseIcon /></button>
        </div>
        <div>
        <div className={styles.main__switch}>
            <div className={styles.main__switch_heading}>
                <h2 className={styles.main__switch_title} style={{color: isDarkMode ? "white" : "black"}}>Price Range</h2>
                <p className={styles.main__switch_average} style={{color: isDarkMode ? "lightgray" : "rgba(128, 128, 128, 0.69)"}}>The average nightly price is {averagePrice}$</p>
            </div>
            <FormControlLabel
            control={
            <CustomSwitch
              checked={isDarkMode}
              onChange={toggleTheme}
              sx={{ m: 1 }}
            />
            }
            label="Dark mode"
            labelPlacement="start"
            />
      </div>
        </div>
      <Filter />
      <p className={styles.main__title_count} style={{color: isDarkMode ? "white" : "black"}}>{filteredCardsCount} bikes found</p>
      <ListCards />
    </>
  );
}

export default MainPage;