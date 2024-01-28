import React, { useState } from "react";

const TableSearch = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleFilter = () => {
    onFilter({ startDate, endDate });
  };

  return (
    <div className="TableSearch">
      <div className="TableSearch-DiziAra">
        <label>Dizi Adı Ara:</label>
        <input
          className="TableSearch-DiziAra-input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Ara</button>
      </div>

      <div className="TableSearch-Date">
        <label>Tarih Filtrele:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={handleFilter}>Filtrele</button>
      </div>
    </div>
  );
};

export default TableSearch;
