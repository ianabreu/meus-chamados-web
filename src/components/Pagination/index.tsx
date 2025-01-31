import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import "./styles-pagination.css";
import { ToggleButton } from "./ToggleButton";

type PaginationProps = {
  currentPage: number;
  lastPage: number;
  itemPerPage?: number;
  orderBy?: string;
  order: "asc" | "desc";
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onOrderingChange: (order_by: string) => void;
  onChangeOrder: (order: "asc" | "desc") => void;
};

function Pagination({
  currentPage,
  lastPage,
  itemPerPage,
  orderBy = "created_at",
  order = "asc",
  onPageChange,
  onLimitChange,
  onOrderingChange,
  onChangeOrder,
}: PaginationProps) {
  const maxVisiblePages = 3;

  const getPageNumbers = () => {
    const pages = [];
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(currentPage - half, 1);
    let end = Math.min(currentPage + half, lastPage);

    if (end - start + 1 < maxVisiblePages) {
      if (start === 1) {
        end = Math.min(start + maxVisiblePages - 1, lastPage);
      } else {
        start = Math.max(end - maxVisiblePages + 1, 1);
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination-container">
      <div className="pagination-nav left">
        <label htmlFor="orderBy" className="filter-label">
          Ordenar por
        </label>
        <div>
          <select
            id="orderBy"
            value={orderBy}
            onChange={(e) => onOrderingChange(e.target.value)}
          >
            <option value={"tradeName"} className="select-option">
              Cliente
            </option>
            <option value={"cnpj"} className="select-option">
              CNPJ
            </option>
            <option value={"topic"} className="select-option">
              Assunto
            </option>
            <option value={"status"} className="select-option">
              Status
            </option>
            <option value={"created_at"} className="select-option">
              Data
            </option>
          </select>
          <ToggleButton order={order} onChangeOrder={onChangeOrder} />
        </div>
      </div>

      <div className="pagination-nav center">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          <FiChevronsLeft />
        </button>

        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          <FiChevronLeft />
        </button>

        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`pagination-button number ${
              page === currentPage ? "active" : ""
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === lastPage}
          className="pagination-button"
        >
          <FiChevronRight />
        </button>

        <button
          onClick={() => onPageChange(lastPage)}
          disabled={currentPage === lastPage}
          className="pagination-button"
        >
          <FiChevronsRight />
        </button>
      </div>
      <div className="pagination-nav right">
        <label htmlFor="perPage" className="filter-label">
          Itens por página
        </label>
        <select
          id="perPage"
          value={itemPerPage}
          onChange={(e) => onLimitChange(Number(e.target.value))}
        >
          <option value={5} className="select-option">
            5
          </option>
          <option value={10} className="select-option">
            10
          </option>
          <option value={15} className="select-option">
            15
          </option>
        </select>
      </div>
    </div>
  );
}

export default Pagination;
