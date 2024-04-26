import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from '../../Pages/RecipeCard';
import AxiosInstance from '../../Constants/constants';
import './RecipeList.css'; // Import your CSS file for styling
import Sidebar from '../sidebar/Sider';
import { Link } from 'react-router-dom'; // Import Link component
import Navbar from './Nav'

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

  const handleLike = async (recipeId) => {
    try {
      await AxiosInstance.put(`/recipes/like/${recipeId}`);
      // Update the state to reflect the change in likes
      setRecipes(recipes.map(recipe => {
        if (recipe._id === recipeId) {
          return { ...recipe, likes: recipe.likes + 1 };
        }
        return recipe;
      }));
    } catch (error) {
      console.error('Error liking recipe:', error);
    }
  };

  const handleComment = async (recipeId, comment) => {
    try {
      await AxiosInstance.post(`/recipes/comment/${recipeId}`, { comment });
      // Refresh recipes after adding comment
      fetchRecipes();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleSave = async (recipeId) => {
    try {
      await AxiosInstance.put(`/recipes/save/${recipeId}`);
      // Refresh recipes after saving recipe
      fetchRecipes();
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
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
                  <RecipeCard
                    recipe={recipe}
                    
                  />
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
