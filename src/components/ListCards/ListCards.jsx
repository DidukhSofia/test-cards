import { useState, useEffect } from "react";
import { useCards } from "../../context/CardContext";
import Card from "../Card/Card";
import PaginationControls from "../Pagination/Pagination";
import styles from "./listCards.module.scss";
import Ordering from "../Ordering/Ordering";

function ListCards() {
  const { cards, priceRange, setFilteredCardsCount } = useCards();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [sortOrder, setSortOrder] = useState("asc");

  const [minPrice, maxPrice] = priceRange;

  const filteredCards = cards.filter((card) => {
    const price = Number(card.prize);
    return price >= minPrice && price <= maxPrice;
  });
  useEffect (() => {
    setFilteredCardsCount(filteredCards.length)
  }, [filteredCards.length, setFilteredCardsCount])


  const sortedCards = [...filteredCards].sort((a, b) => {
    if (sortOrder === "priceAsc") {
      return Number(a.prize) - Number(b.prize);
    } else if (sortOrder === "newest") {
      return b.createdAt?.toDate() - a.createdAt?.toDate();
    }
    return 0;
  });

  const totalPages = Math.ceil(filteredCards.length / pageSize);
  const paginatedCards = sortedCards.slice(
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
      <Ordering 
          sortOrder={sortOrder}
          onSortChange={(value) => {
            setSortOrder(value);
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
