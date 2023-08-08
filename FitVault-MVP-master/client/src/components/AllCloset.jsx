import React from 'react';
import Piece from './Piece.jsx'

const AllCloset = ({closetData, handleDeleteButton, handleEditButton}) => {
  return (
    <div className ="table">
      {closetData.length > 0 ? (
        <table>
          <thead> <h2>MY VAULT </h2>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Category</th>
              <th>Color</th>
              <th>Brand</th>
              <th>Occasion</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {closetData.map((piece, index) => (
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

export default AllCloset;