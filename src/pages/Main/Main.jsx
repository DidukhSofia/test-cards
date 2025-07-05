import ListCards from "../../components/ListCards/ListCards";
import Filter from "../../components/Filter/Filter";
import styles from "./main.module.scss";
import CloseIcon from '@mui/icons-material/Close';

function MainPage() {
  return (
    <>
        <div className={styles.main__heading}>
            <h2 className={styles.main__title}>Filters</h2>
            <button className={styles.main__close}><CloseIcon /></button>
        </div>
      <Filter />
      <ListCards />
    </>
  );
}

export default MainPage;