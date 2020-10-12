import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  state = {};

  rendercell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  render() {
    const { items, columnHeaders } = this.props;
    return (
      <tbody>
        {items.map((item) => (
          <tr key={item._id}>
            {columnHeaders.map((header) => (
              <td key={header.path || header.key}>
                {this.rendercell(item, header)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
