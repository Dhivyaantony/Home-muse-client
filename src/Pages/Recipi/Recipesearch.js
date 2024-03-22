import React, { useState, useEffect } from 'react';
import AxiosInstance from '../../Constants/constants';

const RecipeSearchPage = () => {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
            try {
                const response = await AxiosInstance.get(`/recipes/search?q=${query}`);
                setRecipes(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching recipes:', error);
                setLoading(false);
            }
        };

        fetchRecipes();
    }, [query]);

    const handleSearch = (event) => {
        setQuery(event.target.value);
    };

    return (
        <div className="recipe-search-page">
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search recipes..."
            />
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="recipe-list">
                    {recipes.map((recipe) => (
                        <div key={recipe.id} className="recipe-card">
                            <h2>{recipe.name}</h2>
                            <img src={recipe.imageUrl} alt={recipe.name} />
                            <p>{recipe.description}</p>
                            {/* Display other recipe details */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecipeSearchPage;
