import React, { useState, useEffect } from 'react';
import AxiosInstance from '../../Constants/constants';
import PropTypes from 'prop-types';

function ReminderList({ recipientEmail }) {
    const [reminders, setReminders] = useState([]);
    const [editedReminder, setEditedReminder] = useState(null);
    const [editedValues, setEditedValues] = useState({});
    const [reminderTime, setReminderTime] = useState(new Date()); // State for reminder time

    useEffect(() => {
        fetchReminders();
    }, []);

    async function fetchReminders() {
        try {
            const response = await AxiosInstance.get(`reminders/getRemindersByRecipientEmail/${recipientEmail}`);
            const parsedReminders = response.data.reminders.map(reminder => ({
                ...reminder,
                time: new Date(Date.parse(reminder.time)).toLocaleString(),
                dueDate: new Date(reminder.dueDate).toLocaleDateString(),
                createdAt: new Date(reminder.createdAt).toLocaleString()
            }));
            setReminders(parsedReminders);
        } catch (error) {
            console.error('Error fetching reminders:', error);
        }
    }

    async function handleDeleteReminder(id) {
        try {
            await AxiosInstance.delete(`reminders/deleteReminder/${id}`);
            setReminders(prevReminders => prevReminders.filter(reminder => reminder._id !== id));
        } catch (error) {
            console.error('Error deleting reminder:', error);
        }
    }

   

    async function handleSaveReminder() {
        try {
            const updatedReminder = { ...editedValues, time: reminderTime }; // Include reminderTime in updated reminder
            await AxiosInstance.put(`reminders/updateReminder/${editedReminder._id}`, updatedReminder);
            setReminders(prevReminders =>
                prevReminders.map(reminder =>
                    reminder._id === editedReminder._id ? updatedReminder : reminder
                )
            );
            setEditedReminder(null);
            setEditedValues({});
        } catch (error) {
            console.error('Error updating reminder:', error);
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setEditedValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    }

    function handleCancelEdit() {
        setEditedReminder(null);
        setEditedValues({});
    }

    function handleReminderTimeChange(date) {
        setReminderTime(date);
    }
    async function handleEditReminder(id) {
      try {
          // Find the reminder to edit from the reminders array
          const reminderToEdit = reminders.find(reminder => reminder._id === id);
          // Send a PUT request to update the reminder
          await AxiosInstance.put(`reminders/updateReminder/${id}`, reminderToEdit);
          // Update the local state with the edited reminder
          setReminders(prevReminders =>
              prevReminders.map(reminder =>
                  reminder._id === id ? reminderToEdit : reminder
              )
          );
      } catch (error) {
          console.error('Error editing reminder:', error);
      }
  }
  

    return (
        <div className="reminder-list">
            <h2>Reminder List</h2>
            <ul>
                {reminders.map((reminder) => (
                    <li key={reminder._id}>
                        {editedReminder && editedReminder._id === reminder._id ? (
                            <>
                                <input
                                    type="text"
                                    name="taskName"
                                    value={editedValues.taskName || ''}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="message"
                                    value={editedValues.message || ''}
                                    onChange={handleChange}
                                />
                                <input
                                    type="datetime-local"
                                    value={reminderTime.toISOString().slice(0, -8)} // Convert reminderTime to ISO string for input value
                                    onChange={(e) => handleReminderTimeChange(new Date(e.target.value))}
                                />
                                <button onClick={handleSaveReminder}>Save</button>
                                <button onClick={handleCancelEdit}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <div>Task: {reminder.taskName}</div>
                                <div>Message: {reminder.message}</div>
                                <div>Time: {reminder.createdAt}</div>
                                <div>Time: {reminder.dueDate}</div>
                                <button onClick={() => handleDeleteReminder(reminder._id)}>Delete</button>
                                <button onClick={() => handleEditReminder(reminder._id)}>Edit</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

ReminderList.propTypes = {
    recipientEmail: PropTypes.string.isRequired,
};

export default ReminderList;
