import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AxiosInstance from '../../Constants/constants';
import './RecipeDetail.css';

const RecipeDetailsPage = () => {
    const { recipeId } = useParams(); // Extract recipeId from URL
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const response = await AxiosInstance.get(`/recipes/getRecipeById/${recipeId}`);
                setRecipe(response.data);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setError('Recipe not found');
                } else {
                    setError('Error fetching recipe details');
                }
            } finally {
                setLoading(false);
            }
        };

        if (recipeId) {
            fetchRecipeDetails();
        }
    }, [recipeId]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!recipe) {
        return <div className="error">Recipe not found</div>;
    }

    const { title, imageUrl, description, ingredients, instructions, videoUrl } = recipe;

    return (
        <div className="recipe-details">
            <h1 className="recipe-title">{title}</h1>
            <img className="recipe-image" src={imageUrl} alt={title} />
            <p className="recipe-description">{description}</p>
            <h2 className="section-title">Ingredients:</h2>
            <ul className="ingredients-list">
                {ingredients.map((ingredient, index) => (
                    <li key={index} className="ingredient-item">{ingredient}</li>
                ))}
            </ul>
            <h2 className="section-title">Instructions:</h2>
            <ol className="instructions-list">
                {Array.isArray(instructions) ? (
                    instructions.map((instruction, index) => (
                        <li key={index} className="instruction-item">{instruction}</li>
                    ))
                ) : (
                    <li className="instruction-item">{instructions}</li>
                )}
            </ol>
            {videoUrl && (
                <div className="video-container">
                    <h2 className="section-title">Video:</h2>
                    <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${videoUrl}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default RecipeDetailsPage;
