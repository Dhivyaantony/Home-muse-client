import React, { useState } from 'react';
import './MealPlan.css';
import AxiosInstance from '../../Constants/constants';

const MealPlanner = () => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [mealPlan, setMealPlan] = useState({
    Monday: { breakfast: '', lunch: '', dinner: '', snack: '' },
    Tuesday: { breakfast: '', lunch: '', dinner: '', snack: '' },
    Wednesday: { breakfast: '', lunch: '', dinner: '', snack: '' },
    Thursday: { breakfast: '', lunch: '', dinner: '', snack: '' },
    Friday: { breakfast: '', lunch: '', dinner: '', snack: '' },
  });

  const handleMealSelection = (day, mealType, value) => {
    setMealPlan(prevMealPlan => ({
      ...prevMealPlan,
      [day]: {
        ...prevMealPlan[day],
        [mealType]: value
      }
    }));
  };

  const createMealPlan = async () => {
    try {
      const response = await AxiosInstance.post('/create-meal-plan', mealPlan);
      console.log('Meal plan created:', response.data);
      // Handle success or navigate to another page
    } catch (error) {
      console.error('Error creating meal plan:', error);
      // Handle error, show error message, or retry operation
    }
  };

  const clearMealPlan = () => {
    setMealPlan({
      Monday: { breakfast: '', lunch: '', dinner: '', snack: '' },
      Tuesday: { breakfast: '', lunch: '', dinner: '', snack: '' },
      Wednesday: { breakfast: '', lunch: '', dinner: '', snack: '' },
      Thursday: { breakfast: '', lunch: '', dinner: '', snack: '' },
      Friday: { breakfast: '', lunch: '', dinner: '', snack: '' },
    });
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
            <input
              type="text"
              value={mealPlan[selectedDay][mealType]}
              onChange={(e) => handleMealSelection(selectedDay, mealType, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="buttons">
        <button onClick={createMealPlan}>Save</button>
        <button onClick={clearMealPlan}>Clear</button>
      </div>
    </div>
  );
};

export default MealPlanner;
