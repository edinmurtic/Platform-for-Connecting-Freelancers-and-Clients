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
  const handleStateOrder = async (orderId, newState) => {
    try {
      const response = await newRequest.put(`/orders/handle-state-order`, { orderId, newState });
      if (response.status === 200) {
        console.log(`Status narudžbe uspješno ažuriran na ${newState}.`);
        queryClient.invalidateQueries("orders");
      } else {
        console.error("Ažuriranje statusa narudžbe nije uspjelo.");
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
    headerName: currentUser.isSeller ? 'Klijent' : 'Honorarac',
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
       {(params.row.isOrderApproved === "Neprocesirana" ) && ("Na čekanju") 
    }
    {(params.row.isOrderApproved === "Prihvaćena" ) && ((params.row.isFinishedBuyer && params.row.isFinishedSeller) ? "Završeno" : "Nedovršeno") 
    }
    {(params.row.isOrderApproved === "Odbijena" ) && ("Odbijena") 
    }
            </div>
    )
 },
    { field: 'price', headerName: 'Cijena(KM)', width: 100 },
    { 
      field: 'Opcije', 
      headerName: 'Opcije', 
      width: 400,
      renderCell: (params) => (
       
         <div>
          <Button style={{marginRight: "15px"}} variant="outlined" color="primary" onClick={() => handleContact(params.row)}>kontaktiraj</Button>
          {!currentUser.isSeller && !params.row.isFinishedBuyer && params.row.isOrderApproved === "Prihvaćena" && (
  <Button style={{marginRight: "15px"}} variant="outlined" color="success" onClick={() => handleFinish(params.row._id)}>
    Završi
  </Button>
)}
{console.log("Pokazi",params.row.title,)}
{currentUser.isSeller && params.row.isOrderApproved === "Neprocesirana" && (
          <>
          <Button
               style={{ marginRight: "15px",fontSize:"10px", paddingBottom:"0px", paddingTop:"0px" }}
               variant="outlined"
               color="success"
               onClick={() => handleStateOrder(params.row._id, "Prihvaćena")}
             >
               Prihvati <br/> narudžbu
             </Button>
             <Button
                            style={{fontSize:"10px",paddingBottom:"0px", paddingTop:"0px" }}

               variant="outlined"
               color="error"
              onClick={() => handleStateOrder(params.row._id, "Odbijena")}
             >
               Odbij <br/> narudžbu
             </Button>
           </>
         )}
         {currentUser.isSeller && params.row.isOrderApproved === "Prihvaćena" && !params.row.isFinishedSeller && (
           <Button
             style={{ marginRight: "15px" }}
             variant="outlined"
             color="success"
             onClick={() => handleFinish(params.row._id)}
           >
             Završi
           </Button>
         )}
     


         </div>
      )
    },
//     {
//       field: 'newOrder',
//       headerName: 'Narudžba', 
//       width: 300,
//     renderCell: (params) => 
//       (
//         <>
//         {currentUser.isSeller && params.row.isOrderApproved === "Neprocesirana" && (
//           <>
//             <Button
//               style={{ marginRight: "15px" }}
//               variant="outlined"
//               color="success"
//               onClick={() => handleStateOrder(params.row._id, "Prihvaćena")}
//             >
//               Prihvati narudžbu
//             </Button>
//             <Button
//               variant="outlined"
//               color="error"
//               onClick={() => handleStateOrder(params.row._id, "Odbijena")}
//             >
//               Odbij narudžbu
//             </Button>
//           </>
//         )}
//         {currentUser.isSeller && params.row.isOrderApproved === "Prihvaćena" && !params.row.isFinishedSeller && (
//           <Button
//             style={{ marginRight: "15px" }}
//             variant="outlined"
//             color="success"
//             onClick={() => handleFinish(params.row._id)}
//           >
//             Završi
//           </Button>
//         )}
//     </>
//   )
// }
      
   
 
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
        pageSize: 7,
      },
    },
  }}
      />
)}
</div>


)
 }

export default Orders