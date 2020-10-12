import React, { Component } from "react";
import PropType from "prop-types";
import _ from "lodash";

class Pagination extends Component {
  render() {
    const { itemsCount, pageSize, onPageChange, currentPage } = this.props;
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1) return null;

    const pages = _.range(1, pagesCount + 1);

    return (
      <nav>
        <ul className="pagination">
          {pages.map((page) => (
            <li
              className={
                page === currentPage ? "page-item active" : "page - item"
              }
              key={page}
              onClick={() => onPageChange(page)}
            >
              <a className="page-link">{page}</a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  itemsCount: PropType.number.isRequired,
  pageSize: PropType.number.isRequired,
  onPageChange: PropType.func.isRequired,
  currentPage: PropType.number.isRequired,
};

export default Pagination;
