import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const groupSize = 5;
  const groupStart = Math.floor((currentPage - 1) / groupSize) * groupSize + 1;
  const groupEnd = Math.min(groupStart + groupSize - 1, totalPages);

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const handlePrevGroup = () => {
    if (groupStart > 1) {
      onPageChange(groupStart - 1);
    }
  };

  const handleNextGroup = () => {
    if (groupEnd < totalPages) {
      onPageChange(groupEnd + 1);
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5 mb-5">
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              onClick={handlePrevGroup}
              disabled={groupStart === 1}
            >
              &laquo;
            </button>
          </li>
          {[...Array(groupEnd - groupStart + 1).keys()].map((index) => {
            const pageNumber = groupStart + index;
            return (
              <li
                key={pageNumber}
                className={`page-item ${
                  pageNumber === currentPage ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageClick(pageNumber)}
                >
                  {pageNumber}
                </button>
              </li>
            );
          })}
          <li className="page-item">
            <button
              className="page-link"
              onClick={handleNextGroup}
              disabled={groupEnd === totalPages}
            >
              &raquo;
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
