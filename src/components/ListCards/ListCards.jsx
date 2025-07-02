import { useEffect, useState } from "react";
import { db } from "../../services/firebase"; 
import { collection, getDocs } from "firebase/firestore";
import Card from "../Card/Card";
import styles from "./listCards.module.scss"
function ListCards() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Cards"));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCards(data);
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    };

    fetchCards();
  }, []);

  return (
    <ul className={styles.list}>
      {cards.map(card => (
        <li key={card.id}>
            <Card name={card.name} prize={card.prize} field={card.field} description={card.description} />
        </li>
      ))}
    </ul>
  );
}

export default ListCards;
