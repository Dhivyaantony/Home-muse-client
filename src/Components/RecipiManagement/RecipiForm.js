import React, { useState } from 'react';
import axios from 'axios';
import '../Recipes/Recipi.css';
import AxiosInstance from '../../Constants/constants';
import { useSelector, useDispatch } from 'react-redux';

const RecipeForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [category, setCategory] = useState(''); // State for category
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.user.userDetails);
  const [videoUrl, setVideoUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        name,
        ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),
        instructions,
        imageUrl,
        cookingTime: parseInt(cookingTime),
        userOwner: userDetails.userId,
        videoUrl,
        category // Include category in the formData
      };

      const response = await AxiosInstance.post('recipes/addRecipe', formData);

      setMessage('Recipe added successfully!');

      setName('');
      setIngredients('');
      setInstructions('');
      setImageUrl('');
      setCookingTime('');
      setCategory('');
      setVideoUrl('');

      onAdd(response.data);
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  return (
    <div className='main'>
      <div className="form-container">
        <h2>Add Recipe</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="text" placeholder="Ingredients (comma-separated)" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
          <textarea placeholder="Instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
          <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
          <input type="number" placeholder="Cooking Time (minutes)" value={cookingTime} onChange={(e) => setCookingTime(e.target.value)} required />
          <label htmlFor="category">Category:</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select Category</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">snack</option>
            {/* Add more options as needed */}
          </select>
          <label htmlFor="videoUrl">YouTube Video URL:</label>
          <input type="text" id="videoUrl" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
          <button type="submit">Add Recipe</button>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;
