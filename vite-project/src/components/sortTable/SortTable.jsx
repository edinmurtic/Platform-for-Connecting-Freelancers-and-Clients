import { useState } from 'react';
import './SortTable.css'
const SortTable = ({newData}) => {

    const [sortedField, setSortedField] = useState(null);
    const [isAscending, setIsAscending] = useState(true);
  
    const handleSort = (field) => {
      if (sortedField === field) {
        setIsAscending(!isAscending);
      } else {
        setSortedField(field);
        setIsAscending(true);
      }
    };
    const sortedData = sortedField
    ? newData.slice().sort((a, b) => {
        if (a[sortedField] < b[sortedField]) {
          return isAscending ? -1 : 1;
        }
        if (a[sortedField] > b[sortedField]) {
          return isAscending ? 1 : -1;
        }
        return 0;
      })
    : newData;
  return (
    <div className='table-responsive'>
    <table className=" container table align-middle mb-0 table-hover">
      <thead className="bg-light">
        <tr>
        <th onClick={() => handleSort('title')}>Title</th>
          <th onClick={() => handleSort('price')}>Price</th>
          <th onClick={() => handleSort('first_name')}>First Name</th>
          <th >Contact me</th>
        </tr>
      </thead>
      <tbody className="table-group-divider table-divider-color">
      {sortedData.map((item) => (

        <tr key={item.id}>
          <td>
            <div className="d-flex align-items-center">
              <img
                src={item.img}
                alt=""
                style={{ width: '45px', height: '45px' }}
                className="rounded-circle"
              />
              <div className="ms-3">
                <p className="fw-bold mb-1">{item.title}</p>
              </div>
            </div>
          </td>
          <td>
            <p className="fw-normal mb-1">{item.price}</p>
          </td>
          {/* <td>
            <span className="badge badge-success rounded-pill d-inline">Active</span>
          </td> */}
          <td>{item.sellerId}</td>
          <td>
            <button type="button" className="btn btn-link btn-sm btn-rounded">
              Contact
            </button>
          </td>
        </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default SortTable;
