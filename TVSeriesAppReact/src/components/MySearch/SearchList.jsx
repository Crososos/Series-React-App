import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Results from "./Results";
import axios from "axios";

const SearchList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [content, setContent] = useState([]);

  useEffect(() => {
    fetchSearch();
  }, [searchTerm]);

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/tv?api_key=a84c62f666715fed1a9181bf5a3104f5&language=tr-US&query=${searchTerm}&page=1&include_adult=false`
      );
      setContent(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div>
      
      <SearchBar onSearch={handleSearch} />
      <Results data={content} />
      {/* Diğer bileşenleri ve listeleme işlemlerini burada gerçekleştirin. */}
    </div>
  );
};

export default SearchList;
