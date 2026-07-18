import React from 'react';
import '../styles/Pagination.css';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  showRowsPerPage?: boolean;
  rowsPerPageOptions?: number[];
  rowsPerPage?: number;
  onRowsPerPageChange?: (rows: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  showRowsPerPage = true,
  rowsPerPageOptions = [5, 10, 15, 20, 25],
  rowsPerPage = 5,
  onRowsPerPageChange
}) => {

  /* -------------------------------------------------------------------------- */
  /*                            DYNAMIC BUTTON GENERATOR                        */
  /* -------------------------------------------------------------------------- */
  const getPageNumbers = (): (number | string)[] => {
    if (totalPages <= 0) return [1];

    const pages: (number | string)[] = [];

    // Always render page 1
    pages.push(1);

    // Compute dynamic range boundaries around the active selection view index
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    // Handle viewing windows close to the early structural bounds
    if (currentPage <= 3) {
      endPage = Math.min(totalPages - 1, 4);
    }

    // Handle viewing windows close to the late structural bounds
    if (currentPage >= totalPages - 2) {
      startPage = Math.max(2, totalPages - 3);
    }

    // Append preceding structural separator if an index gap is detected
    if (startPage > 2) {
      pages.push('...');
    }

    // Loop through evaluated center active values chunks safely
    for (let i = startPage; i <= endPage; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }

    // Append succeeding structural separator if an index gap is detected
    if (endPage < totalPages - 1) {
      pages.push('...');
    }

    // Securely append the closing terminal marker if it scales greater than 1
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  /* -------------------------------------------------------------------------- */
  /*                               EVENT HANDLERS                               */
  /* -------------------------------------------------------------------------- */

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRows = Number(event.target.value);
    if (onRowsPerPageChange) {
      onRowsPerPageChange(selectedRows);
    }
  };

  return (
    <div className="pagination-container">

      {/* Controls Segment Block */}
      <div className="pagination-controls">

        {/* Previous Nav Control */}
        <button
          className="pagination-btn pagination-btn-arrow"
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1 || totalPages <= 1}
          aria-label="Previous page"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Dynamic Mapping Matrix evaluation wrapper loop */}
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>;
          }
          return (
            <button
              key={`page-${page}`}
              className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => handlePageClick(page as number)}
              disabled={totalPages <= 1}
            >
              {page}
            </button>
          );
        })}

        {/* Next Nav Control */}
        <button
          className="pagination-btn pagination-btn-arrow"
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages <= 1}
          aria-label="Next page"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {showRowsPerPage && (
          <div className="pagination-select-wrapper border-2 border-start border-secondary ps-2">
            <span className="pagination-info small">Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={handleDropdownChange}
              className="shadow-none cursor-pointer pagination-select-input"
            >
              {rowsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Analytics Metas Meta Data Elements Section Group */}
      <div className="pagination-right-group">

        <div className="pagination-info">
          {totalPages === 0 ? 0 : currentPage} of {totalPages || 1} pages
        </div>



      </div>

    </div>
  );
};

export default Pagination;
