import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUser, FaBell } from 'react-icons/fa';

function MainNavBar({ upcomingTask, notificationCount }) {
  const [showTaskDropdown, setShowTaskDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    window.location.href = '/login';
  };

  const toggleTaskDropdown = () => {
    setShowTaskDropdown((prev) => !prev);
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" fixed="top"> {/* Fixed to the top */}
      <Navbar.Brand as={Link} to="/">Your Logo</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-collapse" />
      <Navbar.Collapse id="navbar-collapse">
        <Nav className="me-auto"> {/* Main navigation items */}
          <Nav.Link as={Link} to="/home">Home</Nav.Link>
          <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
        </Nav>
        <Nav className="justify-content-start"> {/* Adjusted Nav for left alignment */}
          <NavDropdown title={<FaBell />} id="task-dropdown"> {/* Notification dropdown */}
            <NavDropdown.Item onClick={toggleTaskDropdown}>
              {upcomingTask ? upcomingTask.name : "No upcoming task"}
            </NavDropdown.Item>
          </NavDropdown>
          {notificationCount > 0 && ( /* Notification badge */
            <Badge variant="danger">{notificationCount}</Badge>
          )}
          <NavDropdown title={<FaUser />} id="user-dropdown"> {/* User/Logout dropdown */}
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MainNavBar;
