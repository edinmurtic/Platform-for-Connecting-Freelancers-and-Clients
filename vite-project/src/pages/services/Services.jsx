import { useEffect, useMemo, useRef, useState } from "react";
import ServiceCard from '../../components/serviceCard/ServiceCard.jsx';
import newRequest from '../../utils/newRequest.js';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import SearchComponent from "../../components/searchComponent/SearchComponent.jsx";
import Filter from "../../components/filter/Filter.jsx";
import ServiceC from "../../components/serviceC/ServiceC.jsx";


function Services() {
  const {search} = useLocation();
  const [searchValue,setSearchValue]=useState(search);

  // const {search} = useLocation();
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['services'],
    queryFn: () =>
      newRequest.get(
        `/services${searchValue}&min=${filterValues.minPrice}&max=${filterValues
        .maxPrice}&category=${filterValues.category}&deliveryTime=${filterValues.maxDeliveryTime}&stars=${filterValues
            .starsNumber}&revisionNumber=${filterValues.revisionNumber}&isActive=true`

      ).then((res) => {
        return res.data
      })
  })
  const [filterValues, setFilterValues] = useState({
    search:"",
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
  

   



 
  const handleFilterChange = (newFilterValues) => {
    setFilterValues(newFilterValues);
      refetch();
  
  };

  return (
    <div className="container">
      <Filter onFilterChange={handleFilterChange} />
      <div className="row">
        <div className="col-md-12">
          <div className="row">
          <p className="highparagraph">Servisi </p>
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
