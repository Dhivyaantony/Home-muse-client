import React from 'react';
import { Link } from 'react-router-dom';
import './sideBarRecipe.css'
const SideBaar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Menu</h3>
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/create-recipe">Create Recipe</Link>
        </li>
        <li>
          <Link to="/my-recipes">My Recipes</Link>
        </li>
        <li>
          <Link to="/saved-recipes">Saved Recipes</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBaar;
