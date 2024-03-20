import React, { useState, useEffect } from 'react';
import AxiosInstance from '../../Constants/constants';
import PropTypes from 'prop-types';

function ReminderList({ recipientEmail }) {
    const [reminders, setReminders] = useState([]);
    const [editedReminder, setEditedReminder] = useState(null);
    const [editedValues, setEditedValues] = useState({});
    const [reminderTime, setReminderTime] = useState(new Date());
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        fetchReminders();
    }, []);

    async function fetchReminders() {
        try {
            const response = await AxiosInstance.get(`/reminders/getRemindersByRecipientEmail/${recipientEmail}`);
            const parsedReminders = response.data.reminders.map(parseReminder);
            setReminders(parsedReminders);
        } catch (error) {
            console.error('Error fetching reminders:', error);
        }
    }

    const parseReminder = (reminder) => ({
        ...reminder,
        time: new Date(Date.parse(reminder.time)).toLocaleString(),
        dueDate: new Date(reminder.dueDate).toLocaleDateString(),
        createdAt: new Date(reminder.createdAt).toLocaleString()
    });

    const handleDeleteReminder = async (id) => {
        try {
            await AxiosInstance.delete(`/reminders/deleteReminder/${id}`);
            setReminders(prevReminders => prevReminders.filter(reminder => reminder._id !== id));
        } catch (error) {
            console.error('Error deleting reminder:', error);
        }
    }

    const handleSaveReminder = async () => {
        try {
            const updatedReminder = { ...editedValues, time: reminderTime };
            const url = `/reminders/updateReminder/${editedReminder._id}`;
            const response = await AxiosInstance.put(url, updatedReminder, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Response Data:', response.data);
            setReminders(prevReminders =>
                prevReminders.map(reminder =>
                    reminder._id === editedReminder._id ? updatedReminder : reminder
                )
            );
            handleCloseModal();
        } catch (error) {
            console.error('Error updating reminder:', error);
        }
    }

    const handleCloseModal = () => {
        setEditedReminder(null);
        setEditedValues({});
        setShowEditModal(false);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditedValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    }

    const handleReminderTimeChange = (date) => {
        setReminderTime(date);
    }

    const handleEditReminder = (id) => {
        const reminderToEdit = reminders.find(reminder => reminder._id === id);
        setEditedReminder(reminderToEdit);
        setShowEditModal(true);
    }

    return (
        <div className="reminder-list">
            <h2>Reminder List</h2>
            <ul>
                {reminders.map((reminder) => (
                    <li key={reminder._id}>
                        <div>
                            <div>Task: {reminder.taskName}</div>
                            <div>Message: {reminder.message}</div>
                            <div>Time: {reminder.createdAt}</div>
                            <div>dueDate: {reminder.dueDate}</div>
                            <button onClick={() => handleDeleteReminder(reminder._id)}>Delete</button>
                            <button onClick={() => handleEditReminder(reminder._id)}>Edit</button>
                        </div>
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
                        onChange={(e) => handleReminderTimeChange(new Date(e.target.value))}
                    />
                    <button onClick={handleSaveReminder}>Save</button>
                    <button onClick={handleCloseModal}>Cancel</button>
                </div>
            )}
        </div>
    );
}

ReminderList.propTypes = {
    recipientEmail: PropTypes.string.isRequired,
};

export default ReminderList;
