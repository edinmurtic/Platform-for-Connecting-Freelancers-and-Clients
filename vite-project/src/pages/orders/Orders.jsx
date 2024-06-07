import { useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import "./Orders.css"
const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const isSeller =currentUser.isSeller;
  const queryClient = useQueryClient();
  const { data: userdata } = useQuery({
    queryKey: ["user"],
     queryFn: () =>
      newRequest.get(`/users`).then((res) => {
        return res.data.map((user, index) => ({ ...user, id: index }));
      }),
   });
   const handleServiceClick = (serviceId) => {
    console.log("Kliknuli ste na servis sa ID:", serviceId);
    navigate(`/service/${serviceId}`);
  
  };
   const handleFinish = async (orderId) => {
    try {
      const response = await newRequest.put(`/orders/${orderId}/toggle-finish`, { orderId,isSeller});
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


  const { isLoading: orderIsLoading, error: orderError, data: orderData } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders?userId=${currentUser._id}`).then((res) => {
        return res.data.map((orders, index) => ({ ...orders, id: index }));
      }),
  });

  const columns2 = [
    { field: 'id', headerName: 'ID', width: 50 },
  {  field: 'title', 
    headerName: 'Naziv', 
    width: 450,
    renderCell: (params) => (
      
      <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleServiceClick(params.row.serviceId)}>
        <img src={params.row.img} alt="User" style={{ marginRight: 8, width: 35, height: 31 }} />
        {params.value}
      </div>
    )
  }, 
  {
    field: currentUser.isSeller ? 'buyerId' : 'sellerId',
    headerName: currentUser.isSeller ? 'Kupac' : 'Prodavac',
    width: 150,
    renderCell: (params) => {
      const userId = currentUser.isSeller ? params.row.buyerId : params.row.sellerId;
      const user = findUserById(userId);
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
    width: 120,
    renderCell: (params) => (
      <div>
        {(params.row.isFinishedBuyer && params.row.isFinishedSeller) ? "Završeno" : "Nedovršeno"}
            </div>
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
          {!currentUser.isSeller && !params.row.isFinishedBuyer && (
  <Button style={{marginRight: "15px"}} variant="outlined" color="success" onClick={() => handleFinish(params.row._id)}>
    Završi
  </Button>
)}
{currentUser.isSeller && !params.row.isFinishedSeller && (
  <Button style={{marginRight: "15px"}} variant="outlined" color="success" onClick={() => handleFinish(params.row._id)}>
    Završi
  </Button>
)}
         </div>
      )
    },
   
 
  ];
  

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


  
  const getRowId = (row) => row._id;


  return (
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


)
 }

export default Orders