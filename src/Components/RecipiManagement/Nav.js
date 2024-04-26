import React from 'react';
import { Link } from 'react-router-dom';
import Autocomplete from '../Common/AutoComplete'; // Import the Autocomplete component
import './NavBar.css';

const Navbar = () => {
    // Function to handle selection of autocomplete suggestion
    const handleSelect = (selectedSuggestion) => {
        // Do something with the selected suggestion, such as navigating to the recipe page
        console.log('Selected Recipe:', selectedSuggestion);
    };

    return (
        <nav className='navbar'>
            <ul className="navbar-list">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/recipes">Recipes</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                {/* Add more links as needed */}
            </ul>
            <div className="search-container">
                {/* Integrate Autocomplete component into the search input field */}
                <Autocomplete onSelect={handleSelect} />
            </div>
        </nav>
    );
};

export default Navbar;
