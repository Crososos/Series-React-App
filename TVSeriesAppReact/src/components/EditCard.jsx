import React, { useState, useEffect } from "react";

const EditCard = ({ season, onEpisodeSelect, selectedEpisodes }) => {
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

  useEffect(() => {
    // Season ve episode numarasına göre seçilmiş bölümleri kontrol et
    const isChecked = selectedEpisodes.some(
      (ep) =>
        ep.seasonNumber === season.season_number + 1 &&
        ep.episodeNumber <= season.episode_count
    );

    // Eğer seçilmişse, checkbox'ı otomatik olarak işaretle
    setExpanded(isChecked);
  }, [selectedEpisodes, season]);

  return (
    <div className="season-card">
      <h3 onClick={toggleExpand} style={{ cursor: "pointer" }}>
        Sezon {season.season_number + 1}
      </h3>
      {expanded && (
        <div>
          {[...Array(season.episode_count)].map((_, index) => {
            const episodeNumber = index + 1;
            const checkboxId = `episode_${episodeNumber}`;
            const isChecked = selectedEpisodes.some(
              (ep) =>
                ep.seasonNumber === season.season_number + 1 &&
                ep.episodeNumber === episodeNumber
            );

            return (
              <div key={index}>
                <input
                  type="checkbox"
                  id={checkboxId}
                  checked={isChecked}
                  onChange={() => handleEpisodeSelect(episodeNumber)}
                />
                <label htmlFor={checkboxId}>{`Bolum ${episodeNumber}`}</label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EditCard;
