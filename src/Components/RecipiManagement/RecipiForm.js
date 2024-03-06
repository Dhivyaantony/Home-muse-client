import React, { useState } from 'react';

const RecipeForm = ({ onSave, onCancel, initialRecipe }) => {
  const [recipe, setRecipe] = useState(initialRecipe || { title: '', ingredients: '', instructions: '' });

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(recipe);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" value={recipe.title} onChange={handleChange} />
      <textarea name="ingredients" placeholder="Ingredients" value={recipe.ingredients} onChange={handleChange} />
      <textarea name="instructions" placeholder="Instructions" value={recipe.instructions} onChange={handleChange} />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default RecipeForm;
