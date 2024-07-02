import React, { useEffect, useState } from 'react'
import './Message.css'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import getCurrentUser from '../../utils/getCurrentUser';
import { Link, useParams } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
const Message = () => {
  const { id } = useParams();
  const currentUser = getCurrentUser();
  const [nameOfOtherUser, setNewUser] = useState('Loading');
  const queryClient = useQueryClient();

  const { isLoading, error, data,refetch } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      let res = await newRequest.get(`/messages/${id}`);
      let userIds = new Set();
      for (const element of res.data) {
        userIds.add(element.userId);
      }
      let nizPromise = [];
      for (const userId of userIds) {
        
        
        let userDataPromise = newRequest.get(`/users/${userId}`);
        nizPromise.push(userDataPromise);
      }
      let userDatas = await Promise.all(nizPromise)
      for (const userData of userDatas) {
        if(userData.data._id != currentUser._id)
        {
          setNewUser(userData.data.username)

        }
        for (const elementx of res.data) {
          if (elementx.userId === userData.data._id)
            elementx._img = userData.data.img
        }
      }

      return res.data;
    }
  });

  // const { isLoadingUserPic, errorUserPic, dataUserPic } = useQuery({
  //   queryKey: ["userPic"],
  //   queryFn: () =>{
  //     let userIds = new Set();
  //     for (const element of data) {
  //       userIds.add(element.userId);
  //     }
  //     let userId = [...userIds][0];
  //     console.log('test', userId);
  //     return newRequest.get(`/users/${id}`).then((res) => {
  //       return res.data;
  //     }),
  //   }
  // });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 3000);

    return () => clearInterval(interval);
  }, [refetch]);
  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Poruka</Link> { nameOfOtherUser }
        </span>
        {isLoading ? (
          "loading"
        ) : error ? (
          "error"
        ) : (
          <div className="messages">
            {data.map((m) => (
              <div className={m.userId === currentUser._id ? "owner item" : "item"} key={m._id}>
                <img
                  src={m._img}
                  alt=""
                />
                <p>{m.desc}</p>
                
              </div>
            ))}
          </div>
        )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea type="text" placeholder="Napiši poruku" />
          <button type="submit">Pošalji</button>
        </form>
      </div>
    </div>
  );
};

export default Message;