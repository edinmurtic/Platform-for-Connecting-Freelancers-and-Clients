import React, { useState } from 'react'
import moment from "moment";
import newRequest from '../../utils/newRequest';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Messages = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };



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
    <div className='table-responsive'>
   {isLoading ? "loading" : error ? "error": ( <table className=" container table align-middle mb-0 table-hover">
      <thead className="bg-light">
        <tr>
        <th >{currentUser.isSeller ? "Buyer" : "Seller"}</th>

        <th onClick={() => handleSort('title')}>Posljednja poruka</th>
          <th onClick={() => handleSort('price')}>Date</th>
          <th onClick={() => handleSort('first_name')}>Action</th>
        </tr>
      </thead>
      <tbody className="table-group-divider table-divider-color">
      {sortedData.map((item) => (

        <tr key={item.id}>
        <td>
            <p className="fw-normal mb-1">{currentUser.isSeller ? item.buyerId : item.sellerId}</p>
          </td>
          <td>
            <div className="d-flex align-items-center">
           
              <div className="ms-3">
              <Link to={`/message/${item.id}`} className="link">
                    {item?.lastMessage?.substring(0, 100)}...
                  </Link>              </div>
            </div>
          </td>
          <td>
            <p className="fw-normal mb-1">{moment(item.updatedAt).fromNow()}</p>
          </td>
          {/* <td>
            <span className="badge badge-success rounded-pill d-inline">Active</span>
          </td> */}
         <td>{((currentUser.isSeller && !item.readBySeller) ||
                    (!currentUser.isSeller && !item.readByBuyer)) && (
                    <button onClick={() => handleRead(item.id)}>
                      Mark as Read
                    </button>)}</td>
     
        </tr>
        ))}
      </tbody>
    </table>)}
    </div>  )
}

export default Messages