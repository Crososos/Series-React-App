import React, { useState } from "react";
import MySeriesModal from "./MySeriesModal";

const Results = ({ data }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCardClick = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div>
      {data.map((item) => (
        <div
          key={item.id}
          className="result-card"
          onClick={() => handleCardClick(item)}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            alt={item.original_name}
            className="result-card__image"
          />
          <div className="result-card__content">
            <h2 className="result-card__title">{item.original_name}</h2>
            <p className="result-card__vote-average">
              IMDB: {item.vote_average}
            </p>
          </div>
        </div>
      ))}
      {selectedItem && <MySeriesModal item={selectedItem} onClose={closeModal} />}
    </div>
  );
};

export default Results;
