import React, { useState, useEffect, useRef } from 'react';
import RecipeForm from '../Components/Recipes/RecipiForm';
import RecipeList from '../Components/Recipes/RecipeList';
import Navbar from '../Components/Recipes/NavBar'
const RecipePage = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setIsFormVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCreateRecipeClick = () => {
    setIsFormVisible(true);
  };
  return (
    <div className="recipe-page">
     <Navbar/>
      <main>
        <section className="recipe-list-section">
          <RecipeList />
        </section>
       
      </main>
      <footer>
        {/* Footer content here */}
      </footer>
    </div>
  );
};

export default RecipePage;
