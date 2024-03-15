import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaTasks, FaBell, FaUser } from 'react-icons/fa'; // Import icons
import { useState } from 'react';
import Modal from 'react-modal'; // Import React Modal
import ReminderList from '../../Pages/Reminder/ReminderList'; // Import ReminderList component

import './Sidebar.css';

const Sidebar = ({ toggleReminderList, toggleStatus, profilePicture, onProfilePictureChange }) => {
  const [showReminderModal, setShowReminderModal] = useState(false);
  const userDetails = useSelector(state => state.user.userDetails);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleReminderList = () => {
    setShowReminderModal(!showReminderModal);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    onProfilePictureChange(file);
  };

  const handleMouseLeave = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`} onMouseLeave={handleMouseLeave}>
      <div className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="sidebar-content">
        <ul>
          <li className='list-item user-info'>
            <label htmlFor="profile-picture-input">
              {profilePicture ? (
                <img src={profilePicture} alt="Profile" className="profile-picture" />
              ) : (
                <FaUser className="profile-icon" />
              )}
              <input
                type="file"
                id="profile-picture-input"
                accept="image/*"
                onChange={handleProfilePictureChange}
                style={{ display: 'none' }}
              />
            </label>
            <div>
              <h5>{userDetails.fName}</h5>
              <h5>{userDetails.email}</h5>
            </div>
          </li>
          <li className='list-item'>
            <Link to='/dashboard'>Dashboard</Link>
          </li>
          <li className='list-item'>
            <Link to='/settings'>Settings</Link>
          </li>
          <li className='list-item'>
          <li className='list-item'>
  <span className="reminder-toggle" onClick={handleToggleReminderList}>Toggle Reminder List</span>
</li>
          </li>
          <li className='list-item'>
            <Link to='/my-recipes'>My Recipes</Link> {/* Link to My Recipes */}
          </li>
          <li className='list-item'>
            <Link to='/create-recipe'>Create Recipe</Link> {/* Link to Create Recipe */}
          </li>
        </ul>
      </div>

      {/* Reminder List Modal */}
      <Modal
        isOpen={showReminderModal}
        onRequestClose={handleToggleReminderList}
        overlayClassName="modal-overlay"
        className="modal-content"
     >
        <ReminderList recipientEmail={userDetails.email} /> {/* Pass recipientEmail prop */}
      </Modal>
    </div>
  );
};

export default Sidebar;