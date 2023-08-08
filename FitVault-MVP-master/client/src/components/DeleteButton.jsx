import React from 'react';

const DeleteButton = ({id,handleDeleteButton}) => {
  return (
    <button onClick={() => {handleDeleteButton(id)}}>DELETE</button>
  );
};

export default DeleteButton;