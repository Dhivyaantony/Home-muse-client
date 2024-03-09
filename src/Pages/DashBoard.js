import React, { useState, useEffect, useRef } from 'react'; // Importing useRef from react
import { useSelector, useDispatch } from 'react-redux';
import TaskCreationForm from '../Components/TaskManagent/TaskCreation';
import { createTask, fetchAllTasks, updateTask, deleteTask } from '../toolkit/taskSlice'; // Import deleteTask here
import './Dash.css';
import AxiosInstance from '../Constants/constants.js';
import  MainNavBar from '../Components/Common/NavBar.jsx'
import Sidebar from '../Components/sidebar/Sidebar.js';
//import ModalView from '../Components/Common/Modal.js';
//import TaskModal from '../Components/reminderModal.js'
//import ModalView from '../Components/Common/ModalView.js';
import Modal from 'react-modal'; // Import React Modal
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReminderList from '../Pages/Reminder/ReminderList.js' // Import the ReminderList component
import { FaCheckCircle ,FaBell} from 'react-icons/fa'; // Import applause icon
import NotificationIcon from '../Pages/Notification.jsx'; // Import the NotificationIcon component
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';


function HomeOrganizationDashboard() {
  const editFormRef = useRef(null); // Defining editFormRef using useRef

  const userDetails = useSelector(state => state.user.userDetails);
  const [showTaskCreationForm, setShowTaskCreationForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false); // State to toggle edit form

  const [editingTask, setEditingTask] = useState(null); // New state for editing task
  const [deletedTaskId, setDeletedTaskId] = useState(null); // State to track deleted task ID
  const [task, setTasks] = useState([1,2]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const status = useSelector(state => state.tasks.status);
  const err = useSelector(state => state.tasks.error);
  const userId = userDetails.userId
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks); // Assuming 'tasks' is the slice 
 
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [reminderMessage, setReminderMessage] = useState('');
  const [reminderTime, setReminderTime] = useState(new Date());
  const [showReminderList, setShowReminderList] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  
  const formRef = useRef(null); // Ref for the form element
  useEffect(() => {
    const scrollToEditForm = () => {
      if (showEditForm && editFormRef.current) {
        window.scrollTo({
          top: editFormRef.current.offsetTop,
          behavior: 'smooth',
        });
      }
    };
  
    scrollToEditForm(); // Call the function when the component mounts or when showEditForm changes
  }, [showEditForm]); // Include showEditForm in the dependency array
  

  const handleProfilePictureChange = (file) => {
    // Handle profile picture change logic here
    setProfilePicture(file);
  };


  useEffect(() => {
    dispatch(fetchAllTasks());
  }, [dispatch]);

  // Function to open modal
  const openModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle reminder time change
 
  // Function to handle saving reminder
 

  console.log(tasks)
  useEffect(() => {
    dispatch(fetchAllTasks()); // Dispatching fetchAllTasks action when component mounts
  }, [dispatch]);

  console.log("Tasks:", tasks);
  console.log("Status:", status);
  console.log("Error:", error);

  useEffect(() => {
    if (deletedTaskId) {
      const timer = setTimeout(() => {
        setDeletedTaskId(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [deletedTaskId]);


  useEffect(() => {
    if (selectedTask) {
      setEditingTask({ ...selectedTask });
    } else {
      setEditingTask(null);
    }
  }, [selectedTask]);
  const toggleTaskCreationForm = () => {
    setShowTaskCreationForm(!showTaskCreationForm);
  };
  const toggleEditForm = () => {
    setShowEditForm(!showEditForm);
  };
  const openEditForm = (task) => {
    setSelectedTask(task);
    setEditingTask({ ...task });
    setShowEditForm(true); // Show the edit form
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingTask({ ...editingTask, [name]: value });
  };
  const handleUpdateTask = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      await dispatch(updateTask(editingTask)); // Dispatch updateTask action with editingTask data
      setSelectedTask(null); // Reset selectedTask after update
      setEditingTask(null); // Reset editingTask after update
    } catch (error) {
      console.error('Error updating task:', error);
      // Handle error if necessary
    }
  };
  
  const handleDeleteTask = async (taskId) => {
    try {
      await dispatch(deleteTask(taskId));
      setDeletedTaskId(taskId); // Set deletedTaskId to trigger UI update
    } catch (error) {
      console.error('Error deleting task:', error);
      // Handle error
    }
  };
  const handleCreateTask = async (taskData) => {
    try {
      await dispatch(createTask(taskData));
      await dispatch(fetchAllTasks(userId)); // Fetch all tasks again after creating a new task
    } catch (error) {
      console.error('Error creating task:', error);
      // Handle error
    }
  };
  console.log("type",typeof tasks)
  //const filteredTasks = tasks.tasks.filter(task => task.userId === userId);
  const taskColors = ['#FF9999', '#99FF99', '#9999FF', '#FFFF99', '#FF99FF'];



  console.log("Selected Task (Before rendering TaskModal):", selectedTask); // Log selectedTask before rendering TaskModal
  const handleReminderTimeChange = (date) => {
    setReminderTime(date);
  };
  

  const handleSaveReminder = async () => {
    const recipientEmail = userDetails.email; // Assuming userDetails contains the user's information including email
    const reminderData = {
      task: selectedTask._id, // Assuming _id is the taskI
        recipient: recipientEmail,
        taskName: selectedTask.name, // Assuming selectedTask contains the selected task object
        message: reminderMessage,
        time: reminderTime,
        dueDate:selectedTask.dueDate
    };

    try {
        const response = await AxiosInstance.post('/reminders/saveReminder', reminderData);
        console.log('Reminder saved successfully:', response.data);
        closeModal();
    } catch (error) {
        console.error('Error saving reminder:', error);
        // Handle error
    }
};

// Function to toggle reminder list sidebar

const toggleReminderList = () => {
    setShowReminderList(!showReminderList);
};

// State to toggle status
const [showStatus, setShowStatus] = useState(false);

// Function to toggle status
const toggleStatus = () => {
  setShowStatus(!showStatus);
};

const isHighPriority = (priority) => {
  return priority === 'high';
};

const isToday = (someDate) => {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};
const upcomingTask = tasks.find(
  (task) => isHighPriority(task.priority) && isToday(new Date(task.dueDate))
);

  return (
    <>
    <div className='dashcontainer'>
      <MainNavBar upcomingTask={upcomingTask} />
<Sidebar 
  toggleReminderList={toggleReminderList} 
  toggleStatus={toggleStatus} 
  profilePicture={profilePicture} 
  onProfilePictureChange={handleProfilePictureChange} // Make sure to pass the function here
/>

    <div className="container">
      <div className="header">
        <h1>Home Organization Dashboard</h1>
        <p>Welcome, {userDetails.fName}!</p>
      </div>
      
      <div className='tasks'>
      <h2>Tasks</h2>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>No task yet {error}</p>}
      {status === 'succeeded' && tasks.length > 0 ? (
        <ul>
      {tasks.map((task, index) => (
        <li key={task._id} style={{ backgroundColor: taskColors[index % taskColors.length] }}>
          <div>Name: {task.name}</div>
          <div>Description: {task.description}</div>
          <div>Category: {task.category}</div>
          <div>Priority: {task.priority}</div>
          <div>Status: {task.status}</div>
          <div>Due Date: {task.dueDate}</div>
          
          <div className="task-actions">
  <span className="edit-link" onClick={() => openEditForm(task)}>
    <FaEdit /> Edit
  </span>
  <span className="delete-link" onClick={() => handleDeleteTask(task._id)}>
    <FaTrash /> Delete
  </span>
  <span className="reminder-link" onClick={() => openModal(task)}>
    <FaBell /> Set Reminder
  </span>
</div>

      
        </li>
        
      ))}
      
    </ul>
    
  ) : (
   <>
  <div className="create-task-container">
    <h3>No tasks yet. Let's get started!</h3>
    <Link to="/create-task" className="create-task-link">
      <span>Create Task</span>
      <span className="blinking-cursor">_</span>
    </Link>
  </div>
</>

    
    )}
    {tasks.length > 0 && <Link to="/create-task">Create Task</Link>}
    {showTaskCreationForm && <TaskCreationForm onCreateTask={handleCreateTask} />}
</div>
<NotificationIcon /> {/* Place the NotificationIcon component here */}

<Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          
          overlayClassName="modal-overlay"
        >
          <div className="modal-content">
            <h2>Set Reminder for Task: {selectedTask && selectedTask.name}</h2>
            <p>Due Date: {selectedTask && selectedTask.dueDate}</p> {/* Render due date here */}

            <label htmlFor="reminder-message">Message:</label>
            <textarea
              id="reminder-message"
              value={reminderMessage}
              onChange={(e) => setReminderMessage(e.target.value)}
            ></textarea>
            <label htmlFor="reminder-time">Reminder Time:</label>
            <DatePicker
              selected={reminderTime}
              onChange={handleReminderTimeChange}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            
            <button onClick={handleSaveReminder}>Save Reminder</button>
            <button onClick={closeModal}>Cancel</button>

          </div>
        </Modal>

       

{showEditForm && selectedTask && (
        <div ref={editFormRef}  className="edit-form">
          <h2>Edit Task</h2>
          <form onSubmit={handleUpdateTask}>
            <div className="form-group">
              <label>Task Name:</label>
              <input
                type="text"
                name="name"
                value={editingTask.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <input
                type="text"
                name="description"
                value={editingTask.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Category:</label>
              <input
                type="text"
                name="category"
                value={editingTask.category}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Priority:</label>
              <select
                name="priority"
                value={editingTask.priority}
                onChange={handleInputChange}
              >
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <label>Status:</label>
<div>
  <div>
  <label>
  <input
    type="checkbox"
    name="status"
    value="pending"
    checked={editingTask.status === 'pending'}
    onChange={handleInputChange}
  />
  Pending
</label>
<label>
  <input
    type="checkbox"
    name="status"
    value="doing"
    checked={editingTask.status === 'doing'}
    onChange={handleInputChange}
    disabled={editingTask.status === 'completed'}
  />
  Doing
</label>
<label>
  <input
    type="checkbox"
    name="status"
    value="completed"
    checked={editingTask.status === 'completed'}
    onChange={handleInputChange}
    disabled={editingTask.status === 'completed'}
  />
  {editingTask.status === 'completed' ? (
    <span>Completed <FaCheckCircle className="applause-icon" /></span>
  ) : (
    <span>Completed</span>
  )}
</label>

  </div>
</div>
<button type="submit">Save</button>
                <button onClick={toggleEditForm}>Cancel</button> {/* Add onClick event to cancel button */}

          </form>
        </div>
      )}
    </div>
    </div>
    </>
  );
}

export default HomeOrganizationDashboard;