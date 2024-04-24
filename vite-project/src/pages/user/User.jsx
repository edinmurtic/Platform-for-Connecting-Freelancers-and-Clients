import "./User.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Chart from "../../components/chart/Chart";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom"; 
const User = () => {

    const currentUser = getCurrentUser();
    const queryClient = useQueryClient();
    const navigate = useNavigate(); 
    const { data: userdata } = useQuery({
      queryKey: ["user"],
       queryFn: () =>
        newRequest.get(`/users`).then((res) => {
          return res.data.map((user, index) => ({ ...user, id: index }));
        }),
     });

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
          // Osvježite podatke kako biste prikazali ažurirane informacije
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

    const columns = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'title', 
      headerName: 'Naziv', 
      width: 350,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleServiceClick(params.row._id)}>
          <img src={params.row.cover} alt="User" style={{ marginRight: 8, width: 30, height: 25 }} />
          {params.value}
        </div>
      )
    },     { field: 'category', headerName: 'Kategorija', width: 130 },
      { field: 'price', headerName: 'Cijena', width: 75 },
      { field: 'sales', headerName: 'Prodanih', width: 75 },

      { 
        field: 'actions', 
        headerName: 'Actions', 
        width: 300,
        renderCell: (params) => (
         
           <div>
            <Button variant="contained" color="primary" onClick={() => handleEdit(params.row.id)}>Uredi</Button>
             <Button variant="contained" color="secondary" onClick={() => handleDeleteService(params.row._id)}>Obriši</Button>
             <Button variant="contained" color={params.row.isActive ? "error" : "primary"} onClick={() => handleToggleActive(params.row._id, params.row.isActive)}>{params.row.isActive ? "Deaktiviraj" : "Aktiviraj"}</Button>

           </div>
        )
      },
   
    ];

    const columns2 = [
      { field: 'id', headerName: 'ID', width: 70 },
    {  field: 'title', 
      headerName: 'Naziv', 
      width: 350,
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
      field: 'isCompleted', 
      headerName: 'Stanje', 
      width: 130,
      renderCell: (params) => (
        <div>
          {params.row.isCompleted ? "Završeno" : "Nedovršeno"}
        </div>
      )
    },
      { field: 'price', headerName: 'Cijena', width: 75 },

     
   
    ];







  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <div className="top">
          <div className="left">
            <div className="editButton">Uredi</div>
            <h1 className="title">Informacije</h1>
{  isLoading ? ("loading") : error ? ("something went wrong") :(          <div className="item">
              <img
                src={data.img}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{data.username}</h1>
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
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
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
        pageSize={9}
        rowsPerPageOptions={[9]}
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
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    )}
  </div>
)}

      </div>
    </div>
  );
};

export default User;