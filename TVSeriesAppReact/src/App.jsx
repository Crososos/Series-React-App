import "./App.css";
import React, { useState } from "react";
import MyTable from "./components/MyTable";
import SearchList from "./components/MySearch/SearchList";

function App() {
  const [showSearch, setShowSearch] = useState(true);

  const toggleView = () => {
    setShowSearch(!showSearch);
  };

  return (
    <div>
      <button className="selectButton" onClick={toggleView}>
        {showSearch ? "Dizi Listem" : "Dizi Ara"}
      </button>
      {showSearch ? <SearchList /> : <MyTable />}
    </div>
  );
}

export default App;
