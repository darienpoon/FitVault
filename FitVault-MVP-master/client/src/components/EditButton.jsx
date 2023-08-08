import React from 'react';
import axios from 'axios';

const EditButton = ({id, handleEditButton}) => {
  return (
    <button onClick={() => {handleEditButton(id)}}>EDIT</button>
  );
};


export default EditButton;