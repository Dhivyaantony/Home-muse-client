import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AxiosInstance from '../../Constants/constants';
import { FaHeart, FaRegHeart, FaComment, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { FaSave, FaRegSave } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Navbar from '../../Components/Recipes/NavBar';
import './RecipeDetail.css';

const RecipeDetailsPage = () => {
    const { recipeId } = useParams(); // Extract recipeId from URL
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [showCommentForm, setShowCommentForm] = useState(false); // State variable to toggle comment form
    const user = useSelector(state => state.user.userDetails);
const userId=user.userId;
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

    const handleComment = () => {
        if (newComment.trim() !== '') {
            const comment = { id: Date.now(), text: newComment };
            setComments([...comments, comment]);
            setNewComment('');
        }
    };

    const toggleLike = () => {
        setIsLiked(!isLiked);
    };
   
    const toggleSave = async () => {
        try {
            console.log(userId,recipeId)
          // Send a POST request to save the recipe
         const response= await AxiosInstance.post('/recipes/saveRecipe', { userId, recipeId });
         console.log(response)
          setIsSaved(true); // Update the state to indicate that the recipe is saved
        } catch (error) {
          console.error('Error saving recipe:', error);
          // Handle error
        }
      };

    const toggleCommentForm = () => {
        setShowCommentForm(!showCommentForm);
    };

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
        <>
        <Navbar/>
        <div className='containe'>
        <div className="recipe-details-container">
            <div className="recipe-header">
                <h1 className="recipe-title">{title}</h1>
                <img className="recipe-image1" src={imageUrl} alt={title} />
            </div>
            <div className="recipe-content">
                <div className="recipe-description">{description}</div>
                <div className="section">
                    <h2 className="section-title">Ingredients:</h2>
                    <ul className="ingredients-list">
                        {ingredients.map((ingredient, index) => (
                            <li key={index} className="ingredient-item">{ingredient}</li>
                        ))}
                    </ul>
                </div>
                <div className="section">
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
                </div>
                {videoUrl && (
                    <div className="section video-section">
                        <h2 className="section-title">Video:</h2>
                        <div className="video-container">
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
                    </div>
                )}
                <div className="comments-section">
                    <h2 className="section-title">Comments:</h2>
                    <ul className="comments-list">
                        {comments.map(comment => (
                            <li key={comment.id} className="comment-item">
                                <div className="comment-content">{comment.text}</div>
                            </li>
                        ))}
                    </ul>
                    <div className="recipe-details-container">
            {/* Your recipe details content */}
        </div>
                    {showCommentForm && (
                        <div className="comment-form">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add a comment..."
                                rows={4}
                            ></textarea>
                            <button onClick={handleComment}>Add Comment</button>
                        </div>
                    )}
                </div>
            </div>
            <div className="action-buttons">
                {isLiked ? (
                    <FaHeart className="like-icon liked" onClick={toggleLike} />
                ) : (
                    <FaRegHeart className="like-icon" onClick={toggleLike} />
                )}
                <FaComment className="comment-icon" onClick={toggleCommentForm} />
                {isSaved ? (
                <FaSave className="save-icon saved" onClick={toggleSave} />
            ) : (
                <FaRegSave className="save-icon" onClick={toggleSave} />
            )}
            </div>
        </div></div>
        </>
    );
};

export default RecipeDetailsPage;
