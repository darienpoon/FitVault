import React from 'react';
import Modal from 'react-modal';
import Form from './Form.jsx';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '400px',
  },
};

const ModalForm = ({ isOpen, closeModal, handleSubmitButtonClick, id}) => {

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Modal"
      ariaHideApp={false}
    >
      <Form  handleSubmitButtonClick = {handleSubmitButtonClick} id = {id} />
    </Modal>
  );
};

export default ModalForm;