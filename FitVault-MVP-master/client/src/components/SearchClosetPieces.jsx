import React from 'react';
import Piece from './Piece.jsx'

const SearchClosetPieces= ({ searchedClosetData, handleEditButton, handleDeleteButton }) => {
  const tableClass = searchedClosetData.length > 0 ? 'table' : 'empty';

  return (
    <div className = {tableClass}>
      {searchedClosetData.length > 0 ? (
        <table>
          <thead> <h3>Search Results </h3>
            <tr>
              <th>ID</th>
              <th>Item</th>
              <th>Category</th>
              <th>Color</th>
              <th>Brand</th>
              <th>Occasion</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {searchedClosetData.map((piece, index) => (
              <Piece key={index} index = {index} piece={piece} handleEditButton = {handleEditButton} handleDeleteButton = {handleDeleteButton}/>
            ))}
          </tbody>
        </table>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchClosetPieces;