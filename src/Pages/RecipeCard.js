import React from 'react';
import '../Pages/RecipeCard.css'
const RecipeCard = ({ recipe, showButtons, onEdit, onDelete }) => {
  // Ensure that recipe is not null or undefined before accessing its properties
  const imageUrl = recipe && recipe.imageUrl ? recipe.imageUrl : '';
  const recipeName = recipe && recipe.name ? recipe.name : '';
  const recipeId = recipe && recipe._id ? recipe._id : '';

  return (
    <div className="recipe-card">
      <div className="recipe-images">
        {imageUrl && <img src={imageUrl} alt="Recipe" />}
      </div>
      <div className="recipe-details">
        {/* Render recipe name */}
        <h3 className="recipe-name">{recipeName}</h3>
        
        {/* Conditionally render the edit and delete buttons based on showButtons prop */}
        {showButtons && (
          <div className="recipe-buttons">
            {/* Pass the recipe ID to the onEdit and onDelete functions */}
            <button onClick={() => onEdit(recipe)}>Edit</button>
            <button onClick={() => onDelete(recipeId)}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
