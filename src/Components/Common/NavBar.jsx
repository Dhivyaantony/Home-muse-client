import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUser, FaBell } from 'react-icons/fa'; // Import user and bell icons

function MainNavBar({ upcomingTask, notificationCount }) {
  const handleLogout = () => {
    // Clear authentication-related data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    // Redirect to the login page or perform any other action
    window.location.href = '/login'; // Redirect to the login page
  };

  const [showTaskDropdown, setShowTaskDropdown] = useState(false);

  const handleTaskDropdownToggle = () => {
    setShowTaskDropdown(!showTaskDropdown);
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">Your Logo</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/Home">Home</Nav.Link>
          <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown title={<FaBell />}>
            <NavDropdown.Item onClick={handleTaskDropdownToggle}>
              {upcomingTask ? upcomingTask.name : "No upcoming task"}
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title={<FaUser />} id="basic-nav-dropdown">
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        {notificationCount > 0 && (
          <div className="notification-badge">
            <Badge variant="danger">{notificationCount}</Badge>
          </div>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MainNavBar;
