import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import TextField from "@mui/material/TextField";
import styles from "./pagination.module.scss"

function PaginationControls({
  totalPages,
  currentPage,
  onPageChange,
  pageSize,
  onPageSizeChange,
}) {
 const maxResultsOfPage = 10;
  const handleInputChange = (e) => {
    let value = Number(e.target.value);
    if (isNaN(value)) return;
    if (value < 1) value = 1;
    if (value > maxResultsOfPage) value = maxResultsOfPage;
    onPageSizeChange(value);
  };

  return (
    <div className={styles.pagination}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
        variant="outlined"
        shape="rounded"
        showFirstButton
        showLastButton
        renderItem={(item) => (
          <PaginationItem
            {...item}
            components={{
              first: () => <span>First</span>,
              last: () => <span>Last</span>,
              previous: () => <span>Prev</span>,
              next: () => <span>Next</span>,
            }}
          />
        )}
      />

      <div className={styles.pagination__counter}>
        <p className={styles.pagination__counter_text}>Results per page:</p>
        <TextField
          type="number"
          value={pageSize}
          size="small"
          inputProps={{
            min: 1,
            max: maxResultsOfPage,
          }}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

export default PaginationControls;
