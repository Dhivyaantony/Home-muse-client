import React, { useState, useEffect } from 'react';
import axiosInstance from "../../Constants/constants";

const RecipeManagement = () => {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({ title: '', ingredients: '', instructions: '' });

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axiosInstance.get('/recipi');
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const addRecipe = async () => {
    try {
      await axiosInstance.post('/recipi', newRecipe);
      fetchRecipes();
      setNewRecipe({ title: '', ingredients: '', instructions: '' });
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  return (
    <div>
      <h2>Recipe Management</h2>
      {recipes.length === 0 && (
        <div>
          <h3>Add New Recipe</h3>
          <input
            type="text"
            placeholder="Title"
            value={newRecipe.title}
            onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Ingredients"
            value={newRecipe.ingredients}
            onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })}
          />
          <input
            type="text"
            placeholder="Instructions"
            value={newRecipe.instructions}
            onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })}
          />
          <button onClick={addRecipe}>Add Recipe</button>
        </div>
      )}
      <div>
        <h3>Recipes</h3>
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <strong>{recipe.title}</strong>
              <p>Ingredients: {recipe.ingredients}</p>
              <p>Instructions: {recipe.instructions}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeManagement;
