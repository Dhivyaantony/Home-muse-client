import React, { useState, useEffect } from 'react';
import AxiosInstance from '../Constants/constants';
import MainNavBar from '../Components/Common/NavBar';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await AxiosInstance.get('/tasks/getAllTasks');
      setTasks(response.data);
      setLoading(false); // Set loading to false once tasks are fetched
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  return (
    <>
      <MainNavBar />
      <div>
        <h2>Task Management</h2>
        {loading ? (
          <p>Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                <h3>{task.name}</h3>
                <p>Description: {task.description}</p>
                <p>Due Date: {task.dueDate}</p>
                <p>Priority: {task.priority}</p>
                {/* Add more details as needed */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default TaskList;
