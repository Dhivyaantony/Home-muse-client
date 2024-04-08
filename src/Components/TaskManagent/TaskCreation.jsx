// TaskCreationForm.js
import { useSelector, useDispatch } from 'react-redux';
import { setUserDetails } from '../../toolkit/userSlice';
import AxiosInstance from '../../Constants/constants';
import '../../Components/TaskManagent/TaskCreation.css';
import React, { useState, useEffect } from 'react'; // Import useEffect
import { fetchAllTasks } from '../../toolkit/taskSlice';
import MainNavBar from '../Common/NavBar';

function TaskCreationForm() {
  const [taskData, setTaskData] = useState({
    name: '',
    description: '',
    dueDate: '',
    priority: '',
    category: '',
    userId: '',
  });
  const [tasks, setTasks] = useState([]); // State to store all tasks
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.user.userDetails);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setTaskData({ ...taskData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!taskData.name.trim()) {
      newErrors.name = 'Task Name is required';
    }

    if (!taskData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!taskData.dueDate) {
      newErrors.dueDate = 'Due Date is required';
    }

    if (!taskData.priority) {
      newErrors.priority = 'Priority is required';
    }

    if (!taskData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Make POST request to backend API endpoint
        const response = await AxiosInstance.post('/tasks/addTask', {
          ...taskData,
          userId: userDetails.userId,
        });
        console.log('Task creation successful:', response.data);

        // Fetch all tasks after successfully creating a new task
        dispatch(fetchAllTasks());

        // Clear form fields after successful submission
        setTaskData({
          name: '',
          description: '',
          dueDate: '',
          priority: '',
          category: '',
        });
      } catch (error) {
        console.error('Error creating task:', error);
      }
    }
  };

  const getAllTasks = async () => {
    try {
      const response = await AxiosInstance.get('/tasks/getAllTasks');
      setTasks(response.data); // Update tasks state with fetched tasks
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Fetch all tasks when component mounts
  useEffect(() => {
    getAllTasks();
  }, []); // Empty dependency array to ensure useEffect runs only once

  return (
    <>
    <MainNavBar/>

    <div className='background'>
    <div className="task-creation-container">
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Task Name:</label>
          <input
            type="text"
            name="name"
            value={taskData.name}
            onChange={handleInputChange}
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleInputChange}
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
          />
          {errors.description && <div className="invalid-feedback">{errors.description}</div>}
        </div>
        <div className="form-group">
          <label>Due Date:</label>
          <input
            type="date"
            name="dueDate"
            value={taskData.dueDate}
            onChange={handleInputChange}
            className={`form-control ${errors.dueDate ? 'is-invalid' : ''}`}
          />
          {errors.dueDate && <div className="invalid-feedback">{errors.dueDate}</div>}
        </div>
        <div className="form-group">
          <label>Priority:</label>
          <select
            name="priority"
            value={taskData.priority}
            onChange={handleInputChange}
            className={`form-control ${errors.priority ? 'is-invalid' : ''}`}
          >
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && <div className="invalid-feedback">{errors.priority}</div>}
        </div>
        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={taskData.category}
            onChange={handleInputChange}
            className={`form-control ${errors.category ? 'is-invalid' : ''}`}
          />
          {errors.category && <div className="invalid-feedback">{errors.category}</div>}
        </div>

        
        <button type="submit" className="btn btn-primary">Create Task</button>
      </form>
    </div>
    </div>
    </>
  );
}

export default TaskCreationForm;