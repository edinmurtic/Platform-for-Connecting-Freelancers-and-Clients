import React, { useState } from 'react';
import newRequest from '../../utils/newRequest';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./Messages.css";
import MessageBox from '../../components/messageBox/MessageBox';

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="messages">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Poruke</h1>
          </div>
          {data.length === 0 ? (
            <div className="row rowmessage">
            <div className='col-6'><img src="https://firebasestorage.googleapis.com/v0/b/myjob-c95a8.appspot.com/o/emptyInbox.png?alt=media&token=2eeecb38-28ab-4ba2-998e-54f09a4465d0" className="imgMessage" alt="Slika"  /></div>
              <div class="text col-6"><strong>Vaš inbox je prazan</strong><br/>Još niste započeli nijedan razgovor, ali kada to učinite, naći ćete ih ovdje.</div>
            </div>
          ) : ( 
          <div className='row'>
          <div className='col-5'><img src="https://firebasestorage.googleapis.com/v0/b/myjob-c95a8.appspot.com/o/emptyInbox.png?alt=media&token=2eeecb38-28ab-4ba2-998e-54f09a4465d0" className="imgMessage" alt="Slika"  /></div>

            <div className='col-7'>  <table>
              <tr>
                <th>{currentUser.isSeller ? "Klijent" : "Honorarac"}</th>
                <th>Posljednja poruka</th>
                <th>Vrijeme</th>
                <th>Opcije</th>
              </tr>
              {data.map((item) => (
                <MessageBox key={item._id} item={item}/>
              ))}
            </table></div>
          </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Messages;
