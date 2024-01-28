import React, { useEffect, useState } from "react";
import axios from "axios";
import SeasonCard from "./SeasonCard";

const MySeriesModal = ({ item, onClose }) => {
  const modalStyle = {
    display: item ? "block" : "none",
  };

  const [modalValue, setModalValue] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [selectedEpisodes, setSelectedEpisodes] = useState([]);
  const [formName, setFormName] = useState("");
  const date = new Date();
  const myId = item.id;
  const [formData, setFormData] = useState({
    id: myId,
    name: formName,
    episode: selectedEpisodes,
    date: date,
  });
  const [uniqueKey, setUniqueKey] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/tv/${item.id}?api_key=a84c62f666715fed1a9181bf5a3104f5&language=tr-TR`
      );
      setModalValue(data);
      setSeasons(data.seasons);
    };

    fetchData();
  }, [item]);

  useEffect(() => {
    setFormName(modalValue.original_name);
  });

  const handleEpisodeSelect = (episodeInfo) => {
    const episodeKey = `${episodeInfo.seasonNumber}_${episodeInfo.episodeNumber}`;

    const isAlreadyAdded = selectedEpisodes.some(
      (ep) => `${ep.seasonNumber}_${ep.episodeNumber}` === episodeKey
    );

    if (!isAlreadyAdded) {
      setSelectedEpisodes((prevSelectedEpisodes) => [
        ...prevSelectedEpisodes,
        episodeInfo,
      ]);
    }
  };

  const handleSave = () => {
    if (!isSaving) {
      setIsSaving(true);
    }
  };

  useEffect(() => {
    setUniqueKey(formName);
  }, [formName]);

  useEffect(() => {
    if (isSaving) {
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let myDate = `${year}-${month}-${day}`;
      setFormData({
        id: myId,
        name: formName,
        episode: selectedEpisodes,
        date: myDate,
      });

      localStorage.setItem(uniqueKey, JSON.stringify(formData));

      setTimeout(() => {
        setIsSaving(false);
      }, 1000);
    }
  }, [isSaving, myId, date, formName, selectedEpisodes, uniqueKey]);

  return (
    <div className="modal" style={modalStyle}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div>
          <h2>{modalValue && modalValue.original_name}</h2>
          {item && (
            <div className="modal-details">
              <div className="modal-text">
                {modalValue.seasons &&
                  modalValue.seasons.map((season) => (
                    <SeasonCard
                      key={season.id}
                      season={season}
                      onEpisodeSelect={handleEpisodeSelect}
                      selectedEpisodes={selectedEpisodes}
                    />
                  ))}
              </div>
              <div>
                <button className="modal-button" onClick={handleSave}>
                  Kaydet
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MySeriesModal;
