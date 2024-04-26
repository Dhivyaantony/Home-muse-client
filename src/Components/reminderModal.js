import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './reminder.css';

function TaskModal({ reminder, closeModal }) {
  const [message, setMessage] = useState('');
  const [reminderTime, setReminderTime] = useState(new Date());

  useEffect(() => {
    console.log('Selected Reminder (TaskModal):', reminder);
    // Update component state when the reminder prop changes
    if (reminder) {
      // Initialize fields based on the reminder data
      setMessage(reminder.message || '');
      setReminderTime(reminder.dueDate || new Date());
    }
  }, [reminder]);

  const handleReminderTimeChange = (date) => {
    setReminderTime(date);
  };

  const handleSaveReminder = () => {
    // Logic to update the reminder with new message and reminderTime
    console.log('Reminder:', reminder);
    console.log('Message:', message);
    console.log('Reminder Time:', reminderTime);

    // Call the backend API to update the reminder with the new data
    // Make sure to include all necessary fields in the request body
    const updatedReminderData = {
      task: reminder.task,
      recipient: reminder.recipient,
      taskName: reminder.taskName,
      message: message,
      time: reminderTime, // Assuming this is the correct field for reminder time
      dueDate: reminderTime // Use reminderTime as dueDate
    };

    // Example fetch request to update the reminder
    fetch(`/reminders/updateReminder/${reminder._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedReminderData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Reminder updated successfully:', data);
      // Close the modal after successfully updating the reminder
      closeModal();
    })
    .catch(error => {
      console.error('Error updating reminder:', error);
      // Handle error if necessary
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        {reminder ? (
          <>
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Update Reminder for Task: {reminder.taskName}</h2>
            <p>Task ID: {reminder.task}</p>
            {/* Render other reminder details here */}
          </>
        ) : (
          <p>No reminder selected.</p>
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
