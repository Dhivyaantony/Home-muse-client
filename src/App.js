import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './Pages/Home';
import Login from './Pages/Login';
import HomeOrganizationDashboard from './Pages/DashBoard';
import HomePage from './Pages/Home';
import TaskCreationForm from './Components/TaskManagent/TaskCreation';
import RecipeForm from './Components/RecipiManagement/RecipiForm';
import RecipeList from './Components/RecipiManagement/RecipeList';
import MyRecipes from './Components/RecipiManagement/MyRecipe';
import RecipeDetailsPage from './Pages/Recipi/RecipeDetails';
import MealPlanner from './Components/MealPlanner/MealPlan';
import SavedRecipesPage from './Pages/Recipi/SavedRecipes';

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/DashBoard" element={<HomeOrganizationDashboard />} />
        <Route path="/create-task" element={<TaskCreationForm />} />
        <Route path="/recipiHome" element={<RecipeList />} />
        <Route path="/create-recipe" element={<RecipeForm />} />
        <Route path="/my-recipes" element={<MyRecipes />} />
        <Route path="/getRecipeById/:recipeId" element={<RecipeDetailsPage />} />
        <Route path="/Meal" element={<MealPlanner />} />
        <Route path="/saved-recipes" element={<SavedRecipesPage />} />
        <Route path="/recipes/:id" element={<RecipeDetailsPage/>} />


      </Routes>
    </Router>
  );
}

export default App;
