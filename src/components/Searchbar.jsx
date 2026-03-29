import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Optional: Install react-icons
import "../css/searchbar.css";
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Passes the string up to the parent component
  };

  return (
    <div className="search-box">
      <input 
        type="text" 
        placeholder="Search electronics (e.g. iPhone, Laptop...)" 
        value={query}
        onChange={handleInputChange}
      />
      <button type="submit"><FaSearch /></button>
    </div>
  );
};
export default SearchBar;