import { useState } from "react";
import "./Filter.css";
import Search from "@mui/icons-material/Search";

function Filter({ onFilterChange }) {
  const [query, setQuery] = useState({
    search:"",
    category: "",
    minPrice: "",
    maxPrice: "",
    maxDeliveryTime: "",
    starsNumber: "",
    revisionNumber: "",



  });

  const handleChange = (e) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFilter = () => {
    console.log("Query before:", query); 
    onFilterChange(query);
  };

  return (
    <div className="filter">
      <div className="top">
      <div className="item">
          <label htmlFor="search">Naziv servisa</label>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Pretraži"
            onChange={handleChange}
            value={query.search}
          />
        </div>
      </div>
      <div className="bottom">
      <div className="item">
          <label htmlFor="category">Kategorija</label>
          <select
            name="category"
            id="category"
            onChange={handleChange}
            defaultValue={query.category}
          >
            <option value="">Sve</option>
            <option value="Grafika i dizajn">Grafika i dizajn</option>
            <option value="Razvoj aplikacija">Razvoj aplikacija</option>
            <option value="IT konsalting">IT konsalting</option>
            <option value="Razvoj video igara">Razvoj video igara</option>
            <option value="Video i animacija">Video i animacija</option>

          </select>
        </div>
        <div className="item">
          <label htmlFor="minPrice">Najniža cijena</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder=""
            onChange={handleChange}
            value={query.minPrice}
          />
          
        </div>
        <div className="item">
          <label htmlFor="maxPrice">Najviša cijena</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            placeholder=""
            onChange={handleChange}
            value={query.maxPrice}
          />
        </div>
        <div className="item">
          <label htmlFor="maxDeliveryTime">Vrijeme isporuke</label>
          <input
            type="number"
            id="maxDeliveryTime"
            name="maxDeliveryTime"
            placeholder=""
            onChange={handleChange}
            value={query.maxDeliveryTime}
          />
        </div>
        <div className="item">
          <label htmlFor="starsNumber">Ocjena korisnika</label>
          <input
            type="number"
            id="starsNumber"
            name="starsNumber"
            placeholder=""
            onChange={handleChange}
            value={query.starsNumber}
            min="0"
            max="5"
          />
          
        </div>
        <div className="item">
          <label htmlFor="revisionNumber">Besplatne revizije</label>
          <input
            type="number"
            id="revisionNumber"
            name="revisionNumber"
            placeholder=""
            onChange={handleChange}
            value={query.revisionNumber}
          />
        </div> 
        <button onClick={handleFilter}>
        <img src="/img/search.png" alt="" />        </button>
      </div>

    </div>
  );
}

export default Filter;
