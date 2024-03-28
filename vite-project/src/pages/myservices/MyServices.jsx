import React, { useState } from 'react'
import getCurrentUser from '../../utils/getCurrentUser';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import './MyServices.css'
const MyServices = () => {
  const currentUser = getCurrentUser();

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myServices"],
    queryFn: () =>
      newRequest.get(`/services?userId=${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });
console.log(data);
  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/services/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myServices"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  const [searchValue, setSearchValue] = useState('');
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value.toLowerCase());
  };

  const handleSort = (index) => {
    setSortedColumn(index);
    setSortAsc(!sortAsc);
  };

  const searchTable = () => {
    // Implement your search logic here
  };

  const sortTable = (column, sortAsc) => {
    // Implement your sort logic here
  };

  const toPDF = () => {
    // Implement your PDF export logic here
  };

  const toJSON = () => {
    // Implement your JSON export logic here
  };

  const toCSV = () => {
    // Implement your CSV export logic here
  };

  const toExcel = () => {
    // Implement your Excel export logic here
  };

  return (
    <main className="table container" id="customers_table">
      <section className="table__header">
        <h1>Customer's Orders</h1>
        <div className="input-group">
          <input type="search" placeholder="Search Data..." value={searchValue} onChange={handleSearchChange} />
          <img src="images/search.png" alt="" />
        </div>
        <div className="export__file">
          <label htmlFor="export-file" className="export__file-btn" title="Export File"></label>
          <input type="checkbox" id="export-file" />
        
        </div>
      </section>  {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
      <section className="table__body">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort(0)}> Id <span className="icon-arrow">{sortedColumn === 0 && (sortAsc ? '↑' : '↓')}</span></th>
              <th onClick={() => handleSort(1)}> Customer <span className="icon-arrow">{sortedColumn === 1 && (sortAsc ? '↑' : '↓')}</span></th>
              <th onClick={() => handleSort(2)}> Location <span className="icon-arrow">{sortedColumn === 2 && (sortAsc ? '↑' : '↓')}</span></th>
              <th onClick={() => handleSort(3)}> Order Date <span className="icon-arrow">{sortedColumn === 3 && (sortAsc ? '↑' : '↓')}</span></th>
              <th onClick={() => handleSort(4)}> Status <span className="icon-arrow">{sortedColumn === 4 && (sortAsc ? '↑' : '↓')}</span></th>
              <th onClick={() => handleSort(5)}> Amount <span className="icon-arrow">{sortedColumn === 5 && (sortAsc ? '↑' : '↓')}</span></th>
            </tr>
          </thead>
          <tbody>
          {data.map((service) =>(
            <tr key={service._id}>
            <td>{service.createdAt}</td>
            <td> <img src={service.cover}  alt="" /> {service.title} </td>
            <td> {service.category} </td>
            <td> {service.sales} </td>
            <td> <p className="status pending">Pending</p> </td>
                        <td> <strong>{service.price}</strong> </td>
          </tr>
          ))}
          </tbody>
        </table>
      </section>)}
    </main>
  );
}

export default MyServices