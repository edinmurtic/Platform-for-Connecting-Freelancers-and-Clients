
import './Search.css'
import { CiSearch } from "react-icons/ci";

const Search = () => {

  return ( 
    <div className="bar container">
    <div className="location">
      <p>Budget</p>
      <input type="text" placeholder="Where are you going?" />
    </div>
    <div className="check-in">
          <p>Check in</p>
      <input type="text" placeholder="Add dates" />
    </div>
    <div className="check-out">
          <p>Check out</p>
      <input type="text" placeholder="Add dates" />
    </div>
    <div className="guests">
          <p>Guests</p>
      <input type="text" placeholder="Add guests" />
      <span ><CiSearch  />
</span>
    </div>
  </div>
    )
};

export default Search;
