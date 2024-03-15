import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa"; // Import heart icon from react-icons library
import './NavBar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    // Perform logout logic here
    // For example, clear authentication token or reset user session
    // After logout, navigate to the home page or login page
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/saved-recipes">Saved Recipes</Link>
      <span className="logout-text" onClick={logout}>Logout</span> {/* Use span for logout text */}
      <FaHeart className="heart-icon" /> {/* Use heart icon for likes */}
    </div>
  );
};

export default Navbar;
