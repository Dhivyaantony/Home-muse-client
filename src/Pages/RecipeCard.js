import React from 'react';
import '../Pages/RecipeCard.css';
import { FaRegHeart, FaRegComment, FaRegBookmark } from 'react-icons/fa'; // Import Font Awesome icons

const RecipeCard = ({ recipe, showButtons, onEdit, onDelete }) => {
  // Check if recipe object exists
  if (!recipe) {
    return null; // If recipe is null or undefined, return null to render nothing
  }

  // Extract properties from the recipe object
  const { _id, name, imageUrl } = recipe;

  return (
    <div className="recipe-card">
      <div className="recipe-images">
        {imageUrl && <img src={imageUrl} alt="Recipe" />}
      </div>
      <div className="recipe-details">
        <h3 className="recipe-name">{name}</h3>

        {/* Check if showButtons is true and render buttons */}
        {showButtons && (
          <div className="recipe-buttons">
            <button onClick={() => onEdit(recipe)}>Edit</button>
            <button onClick={() => onDelete(_id)}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
