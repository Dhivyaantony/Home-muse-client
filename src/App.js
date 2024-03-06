import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './Pages/Home';
import Login from './Pages/Login';
import HomeOrganizationDashboard from './Pages/DashBoard';
import HomePage from './Pages/Home';
import TaskCreationForm from './Components/TaskManagent/TaskCreation';
import RecipeForm from './Components/RecipiManagement/RecipiForm';
import RecipeManagement from './Components/RecipiManagement/RecipiManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
    <Route path="/Home" element={<HomePage/>}/>
        <Route path="/DashBoard" element={<HomeOrganizationDashboard />} />
<Route path="/create-task"element={<TaskCreationForm/>}/>
<Route path="/recipiHome"element={<RecipeManagement/>}/>
<Route path="/add-recipi"element={<RecipeForm/>}/>
      </Routes>
    </Router>
  );
}

export default App;
