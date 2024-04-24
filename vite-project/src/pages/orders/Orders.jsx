import { useQuery } from '@tanstack/react-query';
import SortTable from '../../components/sortTable/SortTable'
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
 
  const [sortedField, setSortedField] = useState(null);
  const [isAscending, setIsAscending] = useState(true);

  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => {
        return res.data;
      }),
  });

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await newRequest.post(`/conversations/`, {
          to: currentUser.seller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };


  const handleSort = (field) => {
    if (sortedField === field) {
      setIsAscending(!isAscending);
    } else {
      setSortedField(field);
      setIsAscending(true);
    }
  };
  const sortedData = sortedField
  ? data.slice().sort((a, b) => {
      if (a[sortedField] < b[sortedField]) {
        return isAscending ? -1 : 1;
      }
      if (a[sortedField] > b[sortedField]) {
        return isAscending ? 1 : -1;
      }
      return 0;
    })
  : data;


  return (
    <div className='container'>
    <p className="fs-1 text-start fw-bold">Narudžbe:</p>
    {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
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

        <tr key={item._id}>
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
            <button type="button" className="btn btn-link btn-sm btn-rounded" onClick={() => handleContact(item)}>
              Contact
            </button>
          </td>
        </tr>
        ))}
      </tbody>
    </table>
    </div>
    )}</div>
  )
}

export default Orders