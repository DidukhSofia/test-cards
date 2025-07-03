import { useState } from "react";
import { useCards } from "../../context/CardContext";
import Card from "../Card/Card";
import PaginationControls from "../Pagination/Pagination";
import styles from "./listCards.module.scss";

function ListCards() {
  const { cards, priceRange, loading } = useCards();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const [minPrice, maxPrice] = priceRange;

  if (loading) return <p>Завантаження карток...</p>;

  const filteredCards = cards.filter((card) => {
    const price = Number(card.prize);
    return price >= minPrice && price <= maxPrice;
  });

  const totalPages = Math.ceil(filteredCards.length / pageSize);
  const paginatedCards = filteredCards.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
    <PaginationControls
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(_, page) => setCurrentPage(page)}
        pageSize={pageSize}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setCurrentPage(1);
        }}
      />
      <ul className={styles.list}>
        {paginatedCards.map((card) => (
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

      
    </>
  );
}

export default ListCards;
