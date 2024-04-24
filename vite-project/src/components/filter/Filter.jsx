import { useState } from "react";
import "./Filter.css";

function Filter({ onFilterChange }) {
  const [query, setQuery] = useState({
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    maxDeliveryTime: "",
    starsNumber: "",
    revisionNumber: "",



  });

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    onFilterChange(query);
  };

  return (
    <div className="filter">
      <div className="top">
        <div className="item">
          <label htmlFor="search">Service</label>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="search name"
            onChange={handleChange}
            value={query.search}
          />
        </div>
      </div>
      <div className="bottom">
      <div className="item">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            onChange={handleChange}
            defaultValue={query.category}
          >
            <option value="">any</option>
            <option value="Web Application">Web Application</option>
            <option value="Mobile Application">Mobile Application</option>
            <option value="Logo dizajn">Logo dizajn</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="Min Price"
            onChange={handleChange}
            value={query.minPrice}
          />
          
        </div>
        <div className="item">
          <label htmlFor="maxPrice">Max Price</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            placeholder="Max Price"
            onChange={handleChange}
            value={query.maxPrice}
          />
        </div>
        <div className="item">
          <label htmlFor="maxDeliveryTime">maxDeliveryTime</label>
          <input
            type="number"
            id="maxDeliveryTime"
            name="maxDeliveryTime"
            placeholder="Max delivery time"
            onChange={handleChange}
            value={query.maxDeliveryTime}
          />
        </div>
        <div className="item">
          <label htmlFor="starsNumber">Stars</label>
          <input
            type="number"
            id="starsNumber"
            name="starsNumber"
            placeholder="Star number"
            onChange={handleChange}
            value={query.starsNumber}
            min="0"
            max="5"
          />
          
        </div>
        <div className="item">
          <label htmlFor="revisionNumber">revisionNumber</label>
          <input
            type="number"
            id="revisionNumber"
            name="revisionNumber"
            placeholder="revisionNumber"
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
