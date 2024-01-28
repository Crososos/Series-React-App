import React, { useState } from "react";

const SeasonCard = ({ season, onEpisodeSelect }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleEpisodeSelect = (episodeNumber) => {
    const episodeInfo = {
      seasonNumber: season.season_number + 1,
      episodeNumber: episodeNumber,
    };

    onEpisodeSelect(episodeInfo);
  };

  return (
    <div className="season-card">
      <h3 onClick={toggleExpand} style={{ cursor: "pointer" }}>
        Sezon {season.season_number +1 }
      </h3>
      {expanded && (
        <div>
          {[...Array(season.episode_count)].map((_, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`episode_${index + 1}`}
                onChange={() => handleEpisodeSelect(index + 1)}
              />
              <label htmlFor={`episode_${index + 1}`}>{`Bolum ${
                index + 1
              }`}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SeasonCard;
