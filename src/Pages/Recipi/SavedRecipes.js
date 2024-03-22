import React, { useState, useEffect } from 'react';
import AxiosInstance from '../../Constants/constants';
import './SavedRecipes.css';
const SavedRecipesPage = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch saved recipes from the backend when the component mounts
        const fetchSavedRecipes = async () => {
            try {
                const response = await AxiosInstance.get('/recipes/savedRecipes');
                setSavedRecipes(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching saved recipes:', error);
                setLoading(false);
            }
        };

        fetchSavedRecipes();
    }, []);

    return (
        <div className="saved-recipes-page">
            <h1>Saved Recipes</h1>
            {loading ? (
                <div>Loading...</div>
            ) : savedRecipes.length === 0 ? (
                <div>No saved recipes found.</div>
            ) : (
                <div className="saved-recipes-list">
                    {savedRecipes.map(recipe => (
                        <div key={recipe._id} className="saved-recipe">
                            <h2>{recipe.name}</h2>
                            <img src={recipe.imageUrl} alt={recipe.name} />
                            <p>{recipe.description}</p>
                            {/* Render other details of the recipe as needed */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedRecipesPage;
