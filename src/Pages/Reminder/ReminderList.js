import React, { useState, useEffect } from 'react';
import AxiosInstance from '../../Constants/constants';
import PropTypes from 'prop-types';

function ReminderList({ recipientEmail }) {
    const [reminders, setReminders] = useState([]);
    const [editedReminder, setEditedReminder] = useState(null);
    const [editedValues, setEditedValues] = useState({});
    const [reminderTime, setReminderTime] = useState(new Date()); // State for reminder time
    const [showEditModal, setShowEditModal] = useState(false); // State for showing edit modal

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
            const updatedReminder = { ...editedValues, time: reminderTime };
            console.log('Updated Reminder:', updatedReminder); // Log updatedReminder data
    
            const url = `reminders/updateReminder/${editedReminder._id}`;
            console.log('Request URL:', url); // Log request URL
            console.log('Request Data:', updatedReminder); // Log request data
            const config = {
                headers: {
                    'Content-Type': 'application/json', // Example content type header
                    // Add any other headers as needed
                }}

                AxiosInstance.put(url, updatedReminder, config)
                .then(response => {
                    // Handle successful response
                    console.log('Response Data:', response.data);
                    // Perform actions based on the response, such as updating the UI
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            
                setReminders(prevReminders =>
                    prevReminders.map(reminder =>
                        reminder._id === editedReminder._id ? updatedReminder : reminder
                    )
                );
                
            // Reset the edited reminder and values
            setEditedReminder(null);
            setEditedValues({});
            setShowEditModal(false); // Close the edit modal after saving
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
        setShowEditModal(false); // Close the edit modal when canceling
    }

    function handleReminderTimeChange(date) {
        setReminderTime(date);
    }

    function handleEditReminder(id) {
        const reminderToEdit = reminders.find(reminder => reminder._id === id);
        setEditedReminder(reminderToEdit); // Set editedReminder
        setShowEditModal(true); // Open the edit modal
    }

    return (
        <div className="reminder-list">
            <h2>Reminder List</h2>
            <ul>
                {reminders.map((reminder) => (
                    <li key={reminder._id}>
                        {editedReminder && editedReminder._id === reminder._id ? (
                            <div>
                                <input
                                    type="text"
                                    name="taskName"
                                    value={editedValues.taskName || editedReminder.taskName}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="message"
                                    value={editedValues.message || editedReminder.message}
                                    onChange={handleChange}
                                />
                                <input
                                    type="datetime-local"
                                    value={reminderTime.toISOString().slice(0, -8)}
                                    onChange={(e) => setReminderTime(new Date(e.target.value))}
                                />
                                <button onClick={handleSaveReminder}>Save</button>
                                <button onClick={handleCancelEdit}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <div>Task: {reminder.taskName}</div>
                                <div>Message: {reminder.message}</div>
                                <div>Time: {reminder.createdAt}</div>
                                <div>dueDate: {reminder.dueDate}</div>
                                <button onClick={() => handleDeleteReminder(reminder._id)}>Delete</button>
                                <button onClick={() => handleEditReminder(reminder._id)}>Edit</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            {showEditModal && editedReminder && (
                <div className="edit-modal">
                    <h3>Edit Reminder</h3>
                    <input
                        type="text"
                        name="taskName"
                        value={editedValues.taskName || editedReminder.taskName}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="message"
                        value={editedValues.message || editedReminder.message}
                        onChange={handleChange}
                    />
                    <input
                        type="datetime-local"
                        value={reminderTime.toISOString().slice(0, -8)}
                        onChange={(e) => setReminderTime(new Date(e.target.value))}
                    />
                    <button onClick={handleSaveReminder}>Save</button>
                    <button onClick={() => setShowEditModal(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

ReminderList.propTypes = {
    recipientEmail: PropTypes.string.isRequired,
};

export default ReminderList;
