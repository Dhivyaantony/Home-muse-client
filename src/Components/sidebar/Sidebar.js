import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaTasks, FaBell, FaUser } from 'react-icons/fa';
import Modal from 'react-modal';
import ReminderList from '../../Pages/Reminder/ReminderList';
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
        <div className="user-info">
          <label htmlFor="profile-picture-input" className="profile-picture-label">
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
          <div className="user-details">
            <h5>{userDetails.fName}</h5>
            <h5>{userDetails.email}</h5>
          </div>
        </div>
        <ul className="sidebar-menu">
          <li className="menu-item">
            <Link to='/dashboard'><FaTasks /> Dashboard</Link>
          </li>
          <li className="menu-item">
            <Link to='/settings'><FaUser /> Settings</Link>
          </li>
          <li className="menu-item">
            <span className="reminder-toggle" onClick={handleToggleReminderList}><FaBell /> Toggle Reminder List</span>
          </li>
          <li className="menu-item">
            <Link to='/my-recipes'><FaTasks /> My Recipes</Link>
          </li>
          <li className="menu-item">
            <Link to='/create-recipe'><FaTasks /> Create Recipe</Link>
          </li>
        </ul>
      </div>
      <Modal
        isOpen={showReminderModal}
        onRequestClose={handleToggleReminderList}
        overlayClassName="modal-overlay"
        className="modal-content"
      >
        <ReminderList recipientEmail={userDetails.email} />
      </Modal>
    </div>
  );
};

export default Sidebar;
