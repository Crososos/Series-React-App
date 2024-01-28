
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className='SearchBar-div'>
      <input
        type="text"
        placeholder="Arama yapın..."
        value={searchTerm}
        onChange={handleSearch}
        className='SearchBar'
      />
    </div>
  );
};

export default SearchBar;