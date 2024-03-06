import React from 'react';

const RecipeList = ({ recipes, onEdit, onDelete }) => {
  return (
    <ul>
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <h3>{recipe.title}</h3>
          <button onClick={() => onEdit(recipe)}>Edit</button>
          <button onClick={() => onDelete(recipe.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default RecipeList;
