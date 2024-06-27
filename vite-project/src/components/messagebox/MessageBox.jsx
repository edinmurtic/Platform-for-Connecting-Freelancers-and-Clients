import React from 'react'
import moment from "moment";
import { Link } from "react-router-dom";
import newRequest from '../../utils/newRequest';
import {useMutation,  useQuery, useQueryClient } from "@tanstack/react-query";

const MessageBox = ({item}) => {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const queryClient = useQueryClient();

   const myUser = currentUser.isSeller ? item.buyerId : item.sellerId
    const {
        isLoading: isLoadingUser,
        error: errorUser,
        data: dataUser,
      } = useQuery({
        queryKey: [myUser],
        queryFn: () =>
          newRequest.get(`/users/${myUser}`).then((res) => {
            return res.data;
          }),
      });
      console.log(dataUser)

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
  return (
   <tr
            className={
              ((currentUser.isSeller && !item.readBySeller) ||
                (!currentUser.isSeller && !item.readByBuyer)) &&
              "active"
            }
            key={item.id}
            // style={{borderBottom: "1px solid"}}
          >
            {isLoadingUser ? "loading" : errorUser ? "error" :  (<td> <img src={dataUser.img}   style={{ maxWidth: '55px', maxHeight: '55px', borderRadius:"25%", marginRight:"10px"}} />
          {dataUser.fullName}</td>)}
            <td>
              <Link to={`/message/${item.id}`} className="link">
                {item?.lastMessage?.substring(0, 23)}...
              </Link>
            </td>
            <td>{moment(item.updatedAt).fromNow()}</td>
            <td>
              {((currentUser.isSeller && !item.readBySeller) ||
                (!currentUser.isSeller && !item.readByBuyer)) && (
                <button onClick={() => handleRead(item.id)}>
                  Označi kao procitano
                </button>
              )}
            </td>

          </tr>
  )
}

export default MessageBox