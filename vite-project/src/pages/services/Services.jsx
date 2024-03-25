import { useEffect, useRef, useState } from "react";
import ServiceCard from '../../components/serviceCard/ServiceCard.jsx';
import newRequest from '../../utils/newRequest.js';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import Search from "../../components/search/Search.jsx";


function Services() {

  const [sort, setSort] = useState('sales');
  const [open, setOpen] = useState('false');
  const minRef = useRef();
  const maxRef = useRef();

  const {search} = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['services'],
    queryFn: () =>
      newRequest.get(
        `/services?min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}${search}`

      ).then((res) => {
        return res.data
      })
  })

   const reSort = (type) => {
     setSort(type);
    setOpen(false);
   };

   useEffect(() => {
     refetch();
   }, [sort]);

  const apply = () => {
    refetch();
  };
  console.log(error)

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <label htmlFor="minBudget">Budget</label>
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
          <button className="btn btn-primary mt-2" onClick={apply} >Apply</button>
       <div><select id="sort-by">
  <option onClick={() => reSort("createdAt")} value="najnovije" selected>Najnovije</option>
  <option onClick={() => reSort("sales")} value="najprodavanije">Najprodavanije</option>
  <option onClick={() => reSort("sales")} value="popularno">Popularno</option>
  </select></div>   
        </div>
        <div className="col-md-9">
          <div className="row">
            {isLoading ? ("loading") : error ? ("Something went wrong!") : data.map((service) => (
              <div className="col-md-4" key={service._id} >
              
                <ServiceCard
                  item={service}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
             );

}

export default Services;
