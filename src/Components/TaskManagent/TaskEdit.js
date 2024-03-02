// TaskEditModal.js
import React, { useState, useEffect } from 'react';

function TaskEditModal({ task, onUpdate, closeModal }) {
  const [editedTask, setEditedTask] = useState(task ?? { name: '', description: '', dueDate: '', priority: '', category: '' });
  console.log('Initial editedTask state:', editedTask);

  useEffect(() => {
    if (task) {
      setEditedTask(task);
    }
  }, [task]);
  
  useEffect(() => {
    console.log("Edited Task in TaskEditModal:", editedTask);
  }, [editedTask]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedTask);
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Task Name:</label>
            <input
              type="text"
              name="name"
              value={editedTask.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={editedTask.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Due Date:</label>
            <input
              type="date"
              name="dueDate"
              value={editedTask.dueDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Priority:</label>
            <select
              name="priority"
              value={editedTask.priority}
              onChange={handleInputChange}
            >
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="form-group">
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={editedTask.category}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

export default TaskEditModal;
