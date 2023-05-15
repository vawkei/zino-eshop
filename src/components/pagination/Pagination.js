import { useState } from "react";
import classes from "./Pagination.module.scss";
import { current } from "@reduxjs/toolkit";

const Pagination = (props) => {
  const pageNumbers = [];
  const totalPages = props.totalProducts / props.productsPerPage;
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  //paginate
  const paginate = (pageNumber) => {
    props.setCurrentPage(pageNumber);
  };
  //go to next page
  const paginateNext = () => {
    props.setCurrentPage(props.currentPage + 1);
    //show next set of page numbers
    if (props.currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  //go to prev page
  const paginatePrev = () => {
    props.setCurrentPage(props.currentPage - 1);
    //show prev set of page numbers
    if (props.currentPage - 1 % pageNumberLimit ==0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  for (
    let i = 1;
    i <= Math.ceil(props.totalProducts / props.productsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <ul className={classes.pagination}>
      <li
        onClick={paginatePrev}
        className={
          props.currentPage === pageNumbers[0] ? `${classes.hidden}` : ""
        }>
        prev
      </li>
      {pageNumbers.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <li
              key={number}
              onClick={() => paginate(number)}
              className={
                props.currentPage === number ? `${classes.active}` : ""
              }>
              {number}
            </li>
          );
        }
      })}

      <li
        onClick={paginateNext}
        className={
          props.currentPage === pageNumbers[pageNumbers.length - 1]
            ? `${classes.hidden}`
            : ""
        }>
        next
      </li>
      <p>
        <b className={classes.page}>{`page ${props.currentPage}`}</b>
        <span>{` of `}</span>
        <b>{`${Math.ceil(totalPages)}`}</b>
      </p>
    </ul>
  );
};

export default Pagination;
