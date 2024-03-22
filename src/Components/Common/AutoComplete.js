
//const response = await AxiosInstance.get(`/recipes/autocompleteRecipes?q=${value}`);

import React, { useState } from 'react';
import AxiosInstance from '../../Constants/constants';

import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom

import { Link } from 'react-router-dom';

const Autocomplete = ({ onSelect }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleChange = async (event) => {
        const value = event.target.value;
        setQuery(value);

        try {
const response = await AxiosInstance.get(`/recipes/autocompleteRecipes?q=${value}`);
setSuggestions(response.data);
        } catch (error) {
            console.error('Error fetching autocomplete suggestions:', error);
        }
    };

    const handleSelect = (selectedOption) => {
        onSelect(selectedOption);
        setQuery(selectedOption);
        setSuggestions([]);
    };

    return (
        <div className="autocomplete">
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search recipes..."
            />
            <ul>
                {suggestions.map((suggestion, index) => (
                    <li key={index} onClick={() => handleSelect(suggestion)}>
                        <Link to={`/recipes/${suggestion._id}`}>{suggestion.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Autocomplete;
