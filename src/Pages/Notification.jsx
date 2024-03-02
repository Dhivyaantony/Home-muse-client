import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaBell } from 'react-icons/fa'; // Import bell icon

function NotificationIcon() {
  const tasks = useSelector(state => state.tasks.tasks); // Get tasks from Redux store
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Filter tasks that are high priority and approaching due dates
  const filteredTasks = tasks.filter(task => {
    const isHighPriority = task.priority === 'high';
    const isApproachingDueDate = (dueDate) => {
        const today = new Date();
        const taskDueDate = new Date(dueDate);
      
        // Check if the task due date is today
        return taskDueDate.toDateString() === today.toDateString();
      };
          return isHighPriority && isApproachingDueDate;
  });

  return (
    <div>
      <FaBell className="notification-icon" onClick={toggleDropdown} />
      {isOpen && (
        <div className="notification-dropdown">
          <ul>
            {filteredTasks.map(task => (
              <li key={task._id}>{task.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default NotificationIcon;
