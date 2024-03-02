// ModalView.js
import React from 'react';
import Modal from 'react-modal';
import TaskModal from '../reminderModal'; // Adjust the import path if necessary

Modal.setAppElement('#root');

function ModalView({ modalOpen, setModalOpen, selectedTask }) {
  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
      className="modal"
      overlayClassName="modal-overlay"
    >
      {/* Render TaskModal with the selected task */}
      <TaskModal task={selectedTask} closeModal={() => setModalOpen(false)} />
    </Modal>
  );
}

export default ModalView;
