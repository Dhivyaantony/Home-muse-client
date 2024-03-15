import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from '../../Pages/RecipeCard';
import AxiosInstance from '../../Constants/constants';
import './RecipeList.css'; // Import your CSS file for styling
import Sidebar from '../sidebar/Sidebar';
import { Link } from 'react-router-dom'; // Import Link component
import Navbar from '../Recipes/NavBar'
const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    fetchRecipes(); // Fetch recipes when component mounts
  }, []); // Fetch recipes only once when component mounts

  const fetchRecipes = () => {
    setLoading(true); // Set loading to true while fetching recipes

    // Fetch all recipes
    AxiosInstance.get('/recipes/getRecipes')
      .then(response => {
        setRecipes(response.data);
        setLoading(false); // Set loading to false after fetching recipes
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
        setLoading(false); // Set loading to false even if there's an error
      });
  };

  return (
    <>
    <Navbar/>
      <Sidebar />
      <div className="recipe-list-container">
        <h2 className="recipe-list-title">All Recipes</h2>
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <div className="recipe-list">
            {recipes.map(recipe => (
              <div key={recipe._id} className="recipe-card-link">
                <Link to={`/getRecipeById/${recipe._id}`}>
                  <RecipeCard recipe={recipe} showButtons={false} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default RecipeList;
