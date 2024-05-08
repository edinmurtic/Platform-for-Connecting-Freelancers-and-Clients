import "./User.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Chart from "../../components/chart/Chart";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom"; 
import { useEffect, useState } from "react";
const User = () => {

    const currentUser = getCurrentUser();
    const queryClient = useQueryClient();
    const navigate = useNavigate(); 
    const [chartData, setChartData] = useState([]);

    const { data: userdata } = useQuery({
      queryKey: ["user"],
       queryFn: () =>
        newRequest.get(`/users`).then((res) => {
          return res.data.map((user, index) => ({ ...user, id: index }));
        }),
     });

     useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await newRequest.get('/orders/getOrdersByMonth');
          const adaptedData = response.data.map(item => {
            const monthNames = ["Januar", "Februar", "Mart", "April", "Maj", "Juni", "Juli", "August", "Septembar", "Oktobar", "Novembar", "Decembar"];
            return {
              name: monthNames[item._id - 1],
              Total: item.count
            };
          });
          setChartData(adaptedData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchData();
    }, []);
    console.log("chartData",chartData)
    const findUserById = (id) => {
      if (userdata) {
        const user = userdata.find(user => user._id === id);
        if (user) {
          return { username: user.username, img: user.img };
        }
      }
      // Ako ne pronađemo odgovarajući ID, vraćamo null ili neku drugu vrednost po potrebi
      return null;
    };

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
    const { isLoading, error, data } = useQuery({
     queryKey: ["users"],
      queryFn: () =>
       newRequest.get(`/users/${currentUser._id}`).then((res) => {
          return res.data;
      }),
    });

  const { isLoading: servicesIsLoading, error: servicesError, data: servicesData } = useQuery({
    queryKey: ["services"],
    queryFn: () =>
      newRequest.get(`/services?userId=${currentUser._id}`).then((res) => {
        return res.data.map((services, index) => ({ ...services, id: index }));
      }),
  });

  const { isLoading: orderIsLoading, error: orderError, data: orderData } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders?userId=${currentUser._id}`).then((res) => {
        return res.data.map((orders, index) => ({ ...orders, id: index }));
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
      width: 650,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleServiceClick(params.row._id)}>
          <img src={params.row.cover} alt="User" style={{ marginRight: 8, width: 30, height: 25 }} />
          {params.value}
        </div>
      )
    },     { field: 'category', headerName: 'Kategorija', width: 200 },
      { field: 'price', headerName: 'Cijena', width: 75 },
      { field: 'sales', headerName: 'Prodanih', width: 75 },

      // { 
      //   field: 'Opcije', 
      //   headerName: 'Opcije', 
      //   width: 350,
      //   renderCell: (params) => (
         
      //      <div>
      //     <Button style={{marginRight: "15px"}} variant="outlined" color="primary" onClick={() => ( navigate(`/updateService/${params.row._id}`))}>Uredi</Button>
      //        <Button style={{marginRight: "15px"}} variant="outlined" color="secondary" onClick={() => handleDeleteService(params.row._id)}>Obriši</Button>
      //        <Button variant="outlined" color={params.row.isActive ? "error" : "primary"} onClick={() => handleToggleActive(params.row._id, params.row.isActive)}>{params.row.isActive ? "Deaktiviraj" : "Aktiviraj"}</Button>

      //      </div>
      //   )
      // },
   
    ];

    const columns2 = [
      { field: 'id', headerName: 'ID', width: 50 },
    {  field: 'title', 
      headerName: 'Naziv', 
      width: 450,
      renderCell: (params) => (
        
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleServiceClick(params.row._id)}>
          <img src={params.row.img} alt="User" style={{ marginRight: 8, width: 35, height: 31 }} />
          {params.value}
        </div>
      )
    }, 
    {
      field: 'sellerId',
      headerName: 'Prodavac',
      width: 150,
      renderCell: (params) => {
        const user = findUserById(params.row.sellerId);
        return user ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={user.img} alt="User" style={{ marginRight: 8, borderRadius: '50%', width: 33, height: 33 }} />
            {user.username}
          </div>
        ) : null;
      },
    },
    { 
      field: 'isFinished', 
      headerName: 'Stanje', 
      width: 100,
      renderCell: (params) => (
        <div>
          {params.row.isFinished ? "Završeno" : "Nedovršeno"}
          {console.log("isFinished:",params.row.isFinished)}      </div>
      )
   },
      { field: 'price', headerName: 'Cijena(KM)', width: 100 },
      { 
        field: 'Opcije', 
        headerName: 'Opcije', 
        width: 300,
        renderCell: (params) => (
         
          <div>
          <Button style={{marginRight: "15px"}} variant="outlined" color="primary" onClick={() => handleContact(params.row)}>kontaktiraj</Button>
          {!params.row.isFinished && (
  <Button style={{marginRight: "15px"}} variant="outlined" color="primary" onClick={() => handleFinish(params.row._id)}>
    Završi
  </Button>
)}
    {console.log(params.row)} 
         </div>
        )
      },
     
   
    ];

    




    const getRowId = (row) => row._id;


  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <div className="top">
          <div className="left">
            <div className="editButton"><Link to={`/updateUser/${currentUser._id}`}>Uredi</Link></div>
            <h1 className="title">Informacije</h1>
{  isLoading ? ("loading") : error ? ("something went wrong") :(          <div className="item">
              <img
                src={data.img}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{data.fullName}</h1>
                <div className="detailItem">
                  <span className="itemKey">Korisnicko ime:</span>
                  <span className="itemValue">{data.username}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{data.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Mobitel:</span>
                  <span className="itemValue">{data.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Država:</span>
                  <span className="itemValue">{data.country}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Pozicija:</span>
                  <span className="itemValue">
                  {data.isSeller ? "Prodavac" : "Kupac"}
                  </span>
                </div>
               
              </div> 
            </div>)}
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="Broj završenih narudžbi (Posljednjih 6 mjeseci)" data={chartData} />
          </div>
        </div>
        {currentUser.isSeller ? (
  <div className="bottom datatable">
    <h1 className="title">Servisi</h1>
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
) : (
  <div className="bottom datatable">
    <h1 className="title">Narudžbe</h1>
    {orderIsLoading ? (
      "Loading..."
    ) : orderError ? (
      "Error"
    ) : (
      <DataGrid
        className="datagrid"
        rows={orderData}
        columns={columns2}
        getRowId={getRowId}

        pageSize={9}
        rowsPerPageOptions={[9]}
        initialState={{
    pagination: {
      paginationModel: {
        pageSize: 5,
      },
    },
  }}
      />
    )}
  </div>
)}

      </div>
    </div>
  );
};

export default User;