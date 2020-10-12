import React, { Component } from "react";

class TableHeader extends Component {
  renderSortIcon = (column) => {
    const { sortColumn } = this.props;

    if (sortColumn.path !== column) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;

    return <i className="fa fa-sort-desc"></i>;
  };

  handleSorting = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (path === sortColumn.path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.raiseSort(sortColumn);
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columnHeaders.map((header) => (
            <th
              key={header.path || header.key}
              className="clickable"
              onClick={() => this.handleSorting(header.path)}
            >
              {header.label} {this.renderSortIcon(header.path)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
