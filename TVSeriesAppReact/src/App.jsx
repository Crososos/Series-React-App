// App.jsx
import React, { useEffect, useState } from "react";
import MyTable from "./components/MyTable";
import SearchList from "./components/MySearch/SearchList";
import LoginModal from "./components/LoginPage/LoginModal";
import ErrorBoundary from "./components/ErrorBaoundary/ErrorBoundary";
import "./App.css";

function App() {
  const [showSearch, setShowSearch] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const someCondition = true;

  useEffect(() => {
    if (someCondition) {
      setModalOpen(true);
    }
  }, []);

  const toggleView = () => {
    setShowSearch(!showSearch);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <ErrorBoundary>
      <div>
        {isModalOpen && <LoginModal onClose={handleCloseModal} />}
        <button className="selectButton" onClick={toggleView}>
          {showSearch ? "Dizi Listem" : "Dizi Ara"}
        </button>
        {showSearch ? <SearchList /> : <MyTable />}
      </div>
    </ErrorBoundary>
  );
}

export default App;
