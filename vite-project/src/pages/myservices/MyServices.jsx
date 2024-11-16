import React, { useState } from 'react'
import getCurrentUser from '../../utils/getCurrentUser';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

import './MyServices.css'
import { Link, useNavigate } from 'react-router-dom';
const MyServices = () => {
  const currentUser = getCurrentUser();
  const navigate = useNavigate(); 

  const queryClient = useQueryClient();


  const { data: userdata } = useQuery({
    queryKey: ["user"],
     queryFn: () =>
      newRequest.get(`/users`).then((res) => {
        return res.data.map((user, index) => ({ ...user, id: index }));
      }),
   });
   const { isLoading: servicesIsLoading, error: servicesError, data: servicesData } = useQuery({
    queryKey: ["services"],
    queryFn: () =>
      newRequest.get(`/services?userId=${currentUser._id}`).then((res) => {
        return res.data.map((services, index) => ({ ...services, id: index }));
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

  const handleFinish = async (orderId) => {
    console.log("orderId",orderId)
    try {
      const response = await newRequest.put(`/orders/${orderId}/toggle-finish`, { orderId });
      if (response.status === 200) {
        console.log("Status finish order uspješno ažuriran.");
        queryClient.invalidateQueries("orders");
      } else {
        console.error("Status finish order neuspješno ažuriran.");
      }
    } catch (error) {
      console.error("Došlo je do greške prilikom komunikacije sa serverom:", error);
    }
  };
    const columns = [
      { field: 'id', headerName: 'ID', width: 50 },
      { field: 'title', 
      headerName: 'Naziv', 
      width: 350,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleServiceClick(params.row._id)}>
          <img src={params.row.cover} alt="User" style={{ marginRight: 8, width: 30, height: 25 }} />
          {params.value}
        </div>
      )
    },     { field: 'category', headerName: 'Kategorija', width: 200 },
      { field: 'price', headerName: 'Cijena', width: 75 },
      { field: 'sales', headerName: 'Prodanih', width: 75 },
      { field: 'stars', headerName: 'Ocjena Klijenta', width: 165,
        renderCell: (params) => (
          !isNaN(params.row.totalStars / params.row.starNumber) ? (
            <div className="star">
              {Array(Math.round(params.row.totalStars / params.row.starNumber))
                .fill()
                .map((item, i) => (
                  <img src="../img/star.png" width="20px" alt="" key={i} style={{ paddingBottom: "7px" }} />
                ))}
             
            </div>
          ) : null
        )
      },
      { 
        field: 'Opcije', 
        headerName: 'Opcije', 
        width: 350,
        renderCell: (params) => (
         
           <div>
          <Button style={{marginRight: "15px"}} variant="outlined" color="primary" onClick={() => ( navigate(`/updateService/${params.row._id}`))}>Uredi</Button>
             <Button style={{marginRight: "15px"}} variant="outlined" color="secondary" onClick={() => handleDeleteService(params.row._id)}>Obriši</Button>
             <Button variant="outlined" color={params.row.isActive ? "error" : "primary"} onClick={() => handleToggleActive(params.row._id, params.row.isActive)}>{params.row.isActive ? "Deaktiviraj" : "Aktiviraj"}</Button>

           </div>
        )
      },
   
    ];
  // const { isLoading, error, data } = useQuery({
  //   queryKey: ["myServices"],
  //   queryFn: () =>
  //     newRequest.get(`/services?userId=${currentUser._id}`).then((res) => {
  //       return res.data;
  //     }),
  // });
  const handleToggleActive = async (serviceId, isActive) => {
    try {
      const response = await newRequest.post(`/services/toggle/${serviceId}`, { serviceId });
      if (response.status === 200) {
        console.log("Stanje servisa uspješno ažurirano.");
        queryClient.invalidateQueries("services");
      } else {
        console.error("Došlo je do greške prilikom ažuriranja statusa servisa.");
      }
    } catch (error) {
      console.error("Došlo je do greške prilikom komunikacije sa serverom:", error);
    }
  };
  const handleServiceClick = (serviceId) => {
    console.log("Kliknuli ste na servis sa ID:", serviceId);
    navigate(`/service/${serviceId}`);

  };
  const handleDeleteService = async (serviceId) => {
    try {          

      const response = await newRequest.delete(`/services/${serviceId}`);
      
      if (response.status === 200) {
        console.log("Servis je uspješno obrisan.");
        queryClient.invalidateQueries("services");

      } else {
        console.error("Došlo je do greške prilikom brisanja servisa.");
      }
    } catch (error) {
      console.error("Došlo je do greške prilikom komunikacije sa serverom:", error);
    }
  };

  return (
    <div className="bottom datatable">
    <div className="dataTableMyServices">
Servisi         <Link to="/addnew/" className="link">
           Dodaj novi
          </Link>
        </div>
    {servicesIsLoading ? (
      "Loading..."
    ) : servicesError ? (
      "Error"
    ) : (
      <DataGrid
        className="datagrid"
        rows={servicesData}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        initialState={{
    pagination: {
      paginationModel: {
        pageSize: 8,
      },
    },
  }}
      />
    )}
  </div>
  );
}

export default MyServices