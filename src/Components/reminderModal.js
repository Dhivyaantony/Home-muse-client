// TaskModal.js
import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './reminder.css';

function TaskModal({ task, closeModal }) {
  const [message, setMessage] = useState('');
  const [reminderTime, setReminderTime] = useState(new Date());

  useEffect(() => {
    console.log('Selected Task (TaskModal):', task);
    // Update component state when the task prop changes
    if (task) {
      // Example initialization based on the task data
      setMessage(task.defaultMessage || '');
      setReminderTime(task.defaultReminderTime || new Date());
    }
  }, [task]);

  const handleReminderTimeChange = (date) => {
    setReminderTime(date);
  };

  const handleSaveReminder = () => {
    // Logic to save the reminder with message and reminderTime
    console.log('Task:', task);
    console.log('Message:', message);
    console.log('Reminder Time:', reminderTime);
  
    // Close the modal after saving the reminder
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        {task ? (
          <>
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Set Reminder for Task: {task.name}</h2>
            <p>Task ID: {task.id}</p>
            {/* Render other task details here */}
          </>
        ) : (
          <p>No task selected.</p>
        )}
        {/* Your reminder form elements */}
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <label htmlFor="reminder-time">Reminder Time:</label>
        <DatePicker
          selected={reminderTime}
          onChange={handleReminderTimeChange}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
        />
        <button onClick={handleSaveReminder}>Save Reminder</button>
      </div>
    </div>
  );
}

export default TaskModal;
