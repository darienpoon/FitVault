import React from 'react';
import EditButton from './EditButton.jsx';
import DeleteButton from './DeleteButton.jsx'

const Piece = ({ piece, index, handleEditButton, handleDeleteButton }) => {
  return (
    <tr>
      <td>{index+1}</td>
      <td>{piece.item}</td>
      <td>{piece.category}</td>
      <td>{piece.color}</td>
      <td>{piece.brand}</td>
      <td>{piece.occasion}</td>
    <td> <EditButton id = {piece.id} handleEditButton = {handleEditButton} />
    <DeleteButton id = {piece.id} handleDeleteButton = {handleDeleteButton} /> </td>
    </tr>
  );
};

export default Piece;