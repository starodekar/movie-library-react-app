import React, { Component } from "react";

class GenreList extends Component {
  render() {
    const { items, onItemSelect, selectedItem } = this.props;

    return (
      <ul className="list-group">
        <li
          className={
            !selectedItem ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onItemSelect(null)}
        >
          All Genres
        </li>
        {items.map((genre) => (
          <li
            key={genre._id}
            className={
              genre === selectedItem
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => onItemSelect(genre)}
          >
            {genre.name}
          </li>
        ))}
      </ul>
    );
  }
}

export default GenreList;
