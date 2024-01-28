import axios from "axios";
import React, { useState, useEffect } from "react";
import EditCard from "./EditCard";

const EditModal = ({ id, onClose, onSave }) => {
  const [myEditValue, setMyEditValue] = useState([]);
  const [selectedEpisodes, setSelectedEpisodes] = useState([]);
  const [formName, setFormName] = useState("");
  const [mylocalValue, setMylocalValue] = useState("");
  var date = new Date();
  const [editedData, setEditedData] = useState({
    id: id,
    name: formName,
    episode: selectedEpisodes,
    date: date,
  });
  const modalStyle = {
    display: myEditValue ? "block" : "none",
  };
  const [uniqueKey, setUniqueKey] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  //apiden cekme
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=a84c62f666715fed1a9181bf5a3104f5&language=tr-TR`
      );
      setMyEditValue(data);
      setMylocalValue(data.original_name);
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const storedData = localStorage.getItem(`${mylocalValue}`);

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setSelectedEpisodes(parsedData.episode);
    }
  }, [mylocalValue]);

  useEffect(() => {
    setFormName(myEditValue.original_name);
    setUniqueKey(formName);
  }, [myEditValue.original_name]);

  useEffect(() => {
    setUniqueKey(formName);
  }, [formName]);

  const handleSave = () => {
    if (!isSaving) {
      setIsSaving(true);
    }
  };

  useEffect(() => {
    if (isSaving) {
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let myDate = `${year}-${month}-${day}`;
      setEditedData({
        id: id,
        name: formName,
        episode: selectedEpisodes,
        date: myDate,
      });

      localStorage.setItem(uniqueKey, JSON.stringify(editedData));

      //window.location.reload();

      setTimeout(() => {
        setIsSaving(false);
      }, 1000);
    }
  }, [isSaving, id, date, formName, selectedEpisodes, uniqueKey]);

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

  return (
    <div className="editmodal" style={modalStyle}>
      <div className="editmodal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div>
          <h2>{myEditValue && myEditValue.original_name}</h2>
          {myEditValue && (
            <div className="editmodal-details">
              <div className="editmodal-text"></div>
              {myEditValue.seasons &&
                myEditValue.seasons.map((season) => (
                  <EditCard
                    key={season.id}
                    season={season}
                    onEpisodeSelect={handleEpisodeSelect}
                    selectedEpisodes={selectedEpisodes}
                  />
                ))}
              <div>
                <button className="editmodal-button" onClick={handleSave}>
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

export default EditModal;
