import React, { useState, useEffect } from 'react';
import './MealPlan.css';
import AxiosInstance from '../../Constants/constants';

const MealPlanner = () => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [mealPlan, setMealPlan] = useState({
    Monday: { Breakfast: '', lunch: '', Dinner: '', Snack: '' },
    Tuesday: { Breakfast: '', lunch: '', Dinner: '', Snack: '' },
    Wednesday: { Breakfast: '', lunch: '', Dinner: '', Snack: '' },
    Thursday: { Breakfast: '', lunch: '', Dinner: '', Snack: '' },
    Friday: { Breakfast: '', lunch: '', Dinner: '', Snack: '' },
  });
  const [recipesByCategory, setRecipesByCategory] = useState({
    Breakfast: [],
    lunch: [],
    Dinner: [],
    Snack: []
  });
  const [selectedRecipeIngredients, setSelectedRecipeIngredients] = useState([]); // State to store selected recipe ingredients
  const [errorMessage, setErrorMessage] = useState('');
  const [disableSave, setDisableSave] = useState(true);
  const [userId, setUserId] = useState(''); // State to store the user ID

  useEffect(() => {
    const fetchRecipesByCategory = async () => {
      try {
        const response = await AxiosInstance.get('recipes/getRecipesByCategory');
        console.log('Response data:', response.data); // Log the response data
        setRecipesByCategory(response.data.recipes); // Assuming response.data contains recipes
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setErrorMessage('Failed to fetch recipes. Please try again later.');
      }
    };
  
    fetchRecipesByCategory();
  }, []);

  useEffect(() => {
    const isMealPlanValid = Object.values(mealPlan[selectedDay]).every(recipeId => recipeId !== '');
    setDisableSave(!isMealPlanValid);
  }, [mealPlan, selectedDay]);

  const handleMealSelection = async (day, mealType, recipeID) => {
    try {
      // Fetch ingredients of the selected recipe
      const response = await AxiosInstance.get(`/recipes/getRecipeIngredients/${recipeID}`);
      setSelectedRecipeIngredients(response.data.ingredients);
    } catch (error) {
      console.error('Error fetching recipe ingredients:', error);
      setErrorMessage('Failed to fetch recipe ingredients. Please try again later.');
    }

    setMealPlan(prevMealPlan => ({
      ...prevMealPlan,
      [day]: {
        ...prevMealPlan[day],
        [mealType]: recipeID
      }
    }));
  };

  const createMealPlan = async () => {
    try {
      const mealPlanData = Object.entries(mealPlan[selectedDay]).map(([mealType, recipeID]) => ({
        userID: userId, // Include the user ID in each meal plan object
        date: selectedDay,
        mealType,
        recipeID
      }));
      const response = await AxiosInstance.post('/meal/createMealPlan', mealPlanData);
      console.log('Meal plan created:', response.data);
      // Handle success or navigate to another page
    } catch (error) {
      console.error('Error creating meal plan:', error);
      // Handle error, show error message, or retry operation
    }
  };

  const clearMealPlan = () => {
    setMealPlan({
      Monday: { Breakfast: '', lunch: '', Dinner: '', Snack: '' },
      Tuesday: { Breakfast: '', lunch: '', Dinner: '', Snack: '' },
      Wednesday: { Breakfast: '', lunch: '', Dinner: '', Snack: '' },
      Thursday: { Breakfast: '', lunch: '', Dinner: '', Snack: '' },
      Friday: { Breakfast: '', lunch: '', Dinner: '', Snack: '' },
    });
    setSelectedRecipeIngredients([]); // Clear selected recipe ingredients
  };

  return (
    <div className="meal-planner">
      <h1>Meal Planner</h1>
      <div className="day-selector">
        <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
          {Object.keys(mealPlan).map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
      </div>
      <div className="meal-plan">
        <h2>Meal Plan for {selectedDay}</h2>
        {Object.keys(mealPlan[selectedDay]).map(mealType => (
          <div className="meal-type" key={mealType}>
            <label>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}:</label>
            <select
              value={mealPlan[selectedDay][mealType]}
              onChange={(e) => handleMealSelection(selectedDay, mealType, e.target.value)}
            >
              <option value="">Select Recipe</option>
              {recipesByCategory[mealType] && recipesByCategory[mealType].map(recipe => (
                <option key={recipe._id} value={recipe._id}>{recipe.name}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <div className="selected-recipe-ingredients">
        <h3>Selected Recipe Ingredients:</h3>
        <ul>
          {selectedRecipeIngredients.map(ingredient => (
            <li key={ingredient._id}>{ingredient.name}</li>
          ))}
        </ul>
      </div>
      <div className="buttons">
        <button onClick={createMealPlan} disabled={disableSave}>Save</button>
        <button onClick={clearMealPlan}>Clear</button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default MealPlanner;
