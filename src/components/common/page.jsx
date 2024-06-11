import React from "react";
import ReactPaginate from "react-paginate";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import styles from "@/styles/common/page.module.css";

const Pagination = ({ pageCount, onPageChange, currentPage }) => {
  return (
    <ReactPaginate
      previousLabel={<FiChevronLeft />}
      nextLabel={<FiChevronRight />}
      pageCount={pageCount}
      onPageChange={onPageChange}
      containerClassName={styles.pagination}
      pageLinkClassName={styles.pagination__link}
      activeLinkClassName={styles.pagination__link__active}
    />
  );
};

export default Pagination;
