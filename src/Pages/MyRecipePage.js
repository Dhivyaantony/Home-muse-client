// MyRecipesPage.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import AxiosInstance from '../Constants/constants';
import ModalView from '../Components/Common/Modal';
import '../Components/Common/Modal.css'
const MyRecipesPage = () => {
  const user = useSelector(state => state.user.userDetails);
  const [userRecipes, setUserRecipes] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [editedRecipe, setEditedRecipe] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    imageUrl: '',
    cookingTime: ''
  });

  useEffect(() => {
    const fetchUserRecipes = async () => {
      if (user && user.userId) {
        try {
          const response = await AxiosInstance.get(`/recipes/getUserRecipes/${user.userId}`);
          setUserRecipes(response.data);
          console.log("User Recipes:", response.data);
        } catch (error) {
          console.error('Error fetching user recipes:', error);
        }
      }
    };

    fetchUserRecipes();

  }, [user]);

  const handleDelete = async (recipeId) => {
    try {
      await AxiosInstance.delete(`/recipes/deleteRecipe/${recipeId}`);
      setUserRecipes(userRecipes.filter(recipe => recipe._id !== recipeId));
      console.log(`Deleted recipe with ID: ${recipeId}`);
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

 
  const handleEdit = (recipe) => {
    setSelectedRecipe(recipe);
    console.log('Editing Recipe:', recipe);
    setEditedRecipe({
      name: recipe.name,
      ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients.join(', ') : '',
      instructions: recipe.instructions,
      imageUrl: recipe.imageUrl,
      cookingTime: recipe.cookingTime != null ? recipe.cookingTime.toString() : '' // Ensure cookingTime is defined before converting to string
    });
    setEditModalOpen(true);
  };
  
  
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedRecipe(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (selectedRecipe) {
      setEditedRecipe(prevState => ({
        ...prevState,
        [name]: name === 'ingredients' ? value.split(',').map(ingredient => ingredient.trim()) : value
      }));
    }
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Edited Recipe:', editedRecipe);
      console.log('Edited Recipe Ingredients:', editedRecipe.ingredients);
      const formData = {
        ...editedRecipe,
        ingredients: editedRecipe.ingredients.split(',').map(ingredient => ingredient.trim()),
        cookingTime: parseInt(editedRecipe.cookingTime)
      };
      await AxiosInstance.put(`/recipes/editRecipe/${selectedRecipe._id}`, formData);
      setEditModalOpen(false);
      setSelectedRecipe(null);
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  return (
    <div className="my-recipes-page">
      <h2>My Recipes</h2>
      <div className="recipe-list">
        {userRecipes.map(recipe => (
         <div key={recipe._id} className="recipe-card">
         <h3 style={{ color: 'white' }}>{recipe.name}</h3>
         <p style={{ color: 'white' }}>{recipe.ingredients}</p>
         
         <p style={{ color: 'white' }}>{recipe.instructions}</p>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p style={{ color: 'white' }}> {recipe.cookingTime} minutes</p>
            <button onClick={() => handleDelete(recipe._id)}>Delete</button>
            <button onClick={() => handleEdit(recipe)}>Edit</button>
            
          </div>
          
        ))}
      </div>
      {selectedRecipe && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Recipe</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" value={editedRecipe.name} onChange={handleChange} />
              <input type="text" name="ingredients" value={editedRecipe.ingredients} onChange={handleChange} />
              <textarea name="instructions" value={editedRecipe.instructions} onChange={handleChange}></textarea>
              <input type="text" name="imageUrl" value={editedRecipe.imageUrl} onChange={handleChange} />
              <input type="text" name="cookingTime" value={editedRecipe.cookingTime} onChange={handleChange} />
              <button type="submit">Save Changes</button>
              <button type="button" onClick={handleCloseEditModal}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRecipesPage;






