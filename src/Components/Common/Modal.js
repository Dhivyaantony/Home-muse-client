import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './Modal.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    width: '40%',
    height: '60%'
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
};

Modal.setAppElement('#root');

function ModalView({ children, modalOpen, setModalOpen }) {
  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
      style={customStyles}
      contentLabel="Modal"
    >
      {children}
    </Modal>
  );
}

export default ModalView;
