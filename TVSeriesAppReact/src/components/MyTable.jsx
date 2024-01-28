import React, { useState, useEffect } from "react";
import TableSearch from "./TableSearch";
import EditModal from "./EditModal";

const MyTable = () => {
  const [tableData, setTableData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [filterData, setFilterData] = useState({ startDate: "", endDate: "" });
  const [selectedIdForEdit, setSelectedIdForEdit] = useState(null);

  useEffect(() => {
    const allKeys = Object.keys(localStorage);

    const dataFromLocalStorage = allKeys.map((key) => {
      const data = JSON.parse(localStorage.getItem(key));
      const episodes = data.episode || [];

      const episodeNumbers = episodes.map(
        (episode) => `${episode.seasonNumber}-${episode.episodeNumber}`
      );
      const seasonAndEpisodes = episodeNumbers.join(",");

      return {
        key,
        id: data.id,
        name: data.name,
        season: episodes.length > 0 ? episodes[0].seasonNumber : "",
        seasonAndEpisodes,
        date: data.date,
      };
    });

    //filtreleme
    const filteredData = dataFromLocalStorage.filter((item) => {
      // Dizi adına göre filtreleme
      const nameFilter = searchData
        ? item.name.toLowerCase().includes(searchData.toLowerCase())
        : true;

      // Tarih aralığına göre filtreleme
      const dateFilter =
        filterData.startDate && filterData.endDate
          ? new Date(item.date) >= new Date(filterData.startDate) &&
            new Date(item.date) <= new Date(filterData.endDate)
          : true;

      console.log(dateFilter);
      return nameFilter && dateFilter;
    });

    setTableData(filteredData);
  }, [searchData, filterData]);

  //Editeleme kismi

  const handleEditClick = (id) => {
    setSelectedIdForEdit(id);
  };

  const handleEditModalClose = () => {
    setSelectedIdForEdit(null);
  };

  const handleEditModalSave = (editedData) => {


  };

  return (
    <div>
      <h2 className="TableHead">Dizi Listem</h2>
      <TableSearch
        onSearch={(searchTerm) => setSearchData(searchTerm)}
        onFilter={(dateRange) => setFilterData(dateRange)}
      />
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Dizi Adi</th>
            <th>Izlenilen Bolumler</th>
            <th>Tarih</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((rowData, index) => (
            <tr key={rowData.id}>
              <td>{index + 1}</td>
              <td>{rowData.name}</td>
              <td>{rowData.seasonAndEpisodes}</td>
              <td>{rowData.date}</td>
              <td>
                <button
                  className="editButton"
                  onClick={() => handleEditClick(rowData.id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedIdForEdit && (
        <EditModal
          id={selectedIdForEdit}
          onClose={handleEditModalClose}
          onSave={handleEditModalSave}
        />
      )}
    </div>
  );
};

export default MyTable;
