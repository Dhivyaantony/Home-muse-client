import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainNavBar from '../Components/Common/NavBar';
import './Hom.css'; // Import CSS for styling

function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Determine the target route for the "Get Your Task Done" card
  const taskDoneRoute = isAuthenticated ? '/dashboard' : '/login';
  const recipeManagementRoute = isAuthenticated ? '/recipiHome' : '/login';
const mealplanningRoute=isAuthenticated ? '/Meal' : '/login'

  return (
    <>
      <div className="background">
        <MainNavBar />
        <div className="home-page">
          <p>"Embark on a journey of productivity, creativity, and culinary delight with our all-in-one app. From managing your tasks to discovering delicious recipes and planning meals effortlessly, empower yourself to organize your life and unlock your full potential."</p>
          <h1>Discover Amazing Features</h1>
          <div className="feature-cards">
            {/* Feature Card: Get Your Task Done */}
            <div className="feature-card">
              <h2>Get Your Task Done</h2>
              <p>Manage your tasks efficiently.</p>
              <Link to={taskDoneRoute}>Explore</Link>
            </div>

            {/* Recipe Management */}
            <div className="feature-card">
              <h2>Recipe Management</h2>
              <p>Organize and save your favorite recipes for quick access.</p>
              <Link to={recipeManagementRoute}>Explore</Link>
            </div>

            {/* Meal Planning */}
            <div className="feature-card">
              <h2>Meal Planning</h2>
              <p>Plan meals for the week ahead and streamline your grocery shopping.</p>
              <Link to={mealplanningRoute}>Explore</Link>
            </div>
            <div className="cta">
            <p>Ready to simplify your home life?</p>
            <div className="cta-btns">
              <Link to="/signup" className="signup-btn">Sign Up</Link>
              <Link to="/login" className="login-btn">Log In</Link>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
