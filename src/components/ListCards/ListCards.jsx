// import { useEffect, useState } from "react";
// import { db } from "../../services/firebase"; 
// import { collection, getDocs } from "firebase/firestore";
// import Card from "../Card/Card";
// import styles from "./listCards.module.scss"
// function ListCards() {
//   const [cards, setCards] = useState([]);

//   useEffect(() => {
//     const fetchCards = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "Cards"));
//         const data = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setCards(data);
//       } catch (error) {
//         console.error("Error retrieving data:", error);
//       }
//     };

//     fetchCards();
//   }, []);

//   return (
//     <ul className={styles.list}>
//       {cards.map(card => (
//         <li key={card.id}>
//             <Card name={card.name} prize={card.prize} field={card.field} description={card.description} />
//         </li>
//       ))}
//     </ul>
//   );
// }

// export default ListCards;


import { useCards } from "../../context/CardContext";
import Card from "../Card/Card";
import styles from "./listCards.module.scss";

function ListCards() {
  const { cards, priceRange, loading } = useCards();

  const [minPrice, maxPrice] = priceRange;

  if (loading) return <p>Завантаження карток...</p>;

  const filteredCards = cards.filter(card => {
    const price = Number(card.prize);
    return price >= minPrice && price <= maxPrice;
  });

  return (
    <ul className={styles.list}>
      {filteredCards.map((card) => (
        <li key={card.id}>
          <Card
            name={card.name}
            prize={card.prize}
            field={card.field}
            description={card.description}
          />
        </li>
      ))}
    </ul>
  );
}

export default ListCards;
