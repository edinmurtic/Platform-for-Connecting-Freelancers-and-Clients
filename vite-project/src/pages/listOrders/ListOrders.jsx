import { DataGrid } from "@mui/x-data-grid";
import "../../components/dataTable/DataTable.css";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";


const ListOrders = () => {

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleServiceClick = (serviceId) => {
    console.log("Kliknuli ste na servis sa ID:", serviceId);
    navigate(`/service/${serviceId}`);
  
  };
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


  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'title', 
    headerName: 'Naziv', 
    width: 520,
    renderCell: (params) => (
      <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleServiceClick(params.row.serviceId)}>
        <img src={params.row.img} alt="User" style={{ marginRight: 8, width: 30, height: 25 }} />
        {params.value}
      </div>
    )
  },     
    {
        field: 'sellerId',
        headerName: 'Prodavac',
        width: 150,
        renderCell: (params) => {
          const userId =  params.row.sellerId;
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
        field: 'buyerId',
        headerName: 'Kupac',
        width: 150,
        renderCell: (params) => {
          const userId =  params.row.buyerId;
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
        width: 110,
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
     { field: 'date', headerName: 'Datum narudžbe', width: 155, renderCell:(params) => {
      const date = new Date(params.row.updatedAt);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return <div>{`${day}/${month}/${year}`}</div>;
    }},
    { field: 'price', headerName: 'Cijena(KM)', width: 100 }

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
      
  const { isLoading, error, data } = useQuery({
    queryKey: ["order"],
    queryFn: () =>
      newRequest.get(`/orders/adminOrders`).then((res) => {
        return res.data.map((order, index) => ({ ...order, id: index }));
    }),
  });

console.log(data);   
      return (
          <div className="datatable">
         
           {isLoading ? ("Loading...") : error ? ("error") :(<DataGrid
              className="datagrid"
            rows={data}
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
              checkboxSelection
            />) } 
          </div>
      );
}

export default ListOrders