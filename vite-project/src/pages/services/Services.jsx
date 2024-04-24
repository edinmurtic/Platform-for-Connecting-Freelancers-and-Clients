import { useEffect, useMemo, useRef, useState } from "react";
import ServiceCard from '../../components/serviceCard/ServiceCard.jsx';
import newRequest from '../../utils/newRequest.js';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import SearchComponent from "../../components/searchComponent/SearchComponent.jsx";
import Filter from "../../components/filter/Filter.jsx";
import ServiceC from "../../components/serviceC/ServiceC.jsx";


function Services() {
  const [selectedCategories, setSelectedCategories] = useState([]);
console.log(selectedCategories)
  const [sort, setSort] = useState('sales');
  const {search} = useLocation();
  const [searchValue,setSearchValue]=useState(search);

  // const {search} = useLocation();
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['services'],
    queryFn: () =>
      newRequest.get(
        `/services${searchValue}&min=${filterValues.minPrice}&max=${filterValues
          .maxPrice}&sort=${sort}&category=${filterValues.category}&deliveryTime=${filterValues.maxDeliveryTime}&stars=${filterValues
            .starsNumber}&revisionNumber=${filterValues.revisionNumber}`

      ).then((res) => {
        return res.data
      })
  })
  const [filterValues, setFilterValues] = useState({
    service: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    maxDeliveryTime:"",
    starsNumber: "",
    revisionNumber: "" // Postavljamo podrazumevanu vrednost za revisionNumber ako nije definisan
  });
    useEffect(() => {
      setSearchValue("?search=" + filterValues.search)
      refetch();
    }, [filterValues]);


   const reSort = (type) => {
     setSort(type);
    setOpen(false);
   };

   useEffect(() => {
     refetch();
   }, [sort,selectedCategories]);

  const apply = () => {
    refetch();
  };
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(item => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
 
  const handleFilterChange = (newFilterValues) => {
    setFilterValues(newFilterValues);
      refetch();
  
  };

  return (
    <div className="container">
      <Filter onFilterChange={handleFilterChange} />
      <div className="row">
        {/* <div className="col-md-3">
        <SearchComponent/>
          <label htmlFor="minBudget">Budžet</label>
          <input
            type="number"
            id="minBudget"
            className="form-control"
            placeholder="Min"
            ref={minRef}
          />
          <input
            type="number"
            id="maxBudget"
            className="form-control"
            placeholder="Max"
            ref={maxRef}
          />
          <button className="btn btn-primary mt-2" onClick={apply} >Pronađite</button>
       <div><select id="sort-by">
  <option onClick={() => reSort("createdAt")} value="najnovije" selected>Najnovije</option>
  <option onClick={() => reSort("sales")} value="najprodavanije">Najprodavanije</option>
  <option onClick={() => reSort("sales")} value="popularno">Popularno</option>
  </select></div>    

  <div>
            <label>Kategorije:</label><br />
            <input type="checkbox" id="web" value="Web Application" checked={selectedCategories.includes('Web Application')} onChange={handleCategoryChange} />
            <label htmlFor="web"> Web Application</label><br />
            <input type="checkbox" id="mobile" value="Mobile Application" checked={selectedCategories.includes('Mobile Application')} onChange={handleCategoryChange} />
            <label htmlFor="mobile"> Mobile Application</label><br />
            <input type="checkbox" id="design" value="Logo dizajn" checked={selectedCategories.includes('Logo dizajn')} onChange={handleCategoryChange} />
            <label htmlFor="design"> Logo dizajn</label><br />
        
          </div>
        </div> */}
        <div className="col-md-12">
          <div className="row">
          {isLoading ? ("loading") : error ? ("Something went wrong!") : (data && data.map((service) => (
      <div className="col-md-4 mb-5 " key={service._id}>
        <ServiceCard
          item={service}
        />
      </div>
    )))}
          </div>
        </div>
      </div>
    </div>
             );

}

export default Services;
