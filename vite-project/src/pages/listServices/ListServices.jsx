import { DataGrid } from "@mui/x-data-grid";
import "../../components/dataTable/DataTable.css";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";


const ListServices = () => {

  const queryClient = useQueryClient();
  const navigate = useNavigate();
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


  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'title', 
    headerName: 'Naziv', 
    width: 450,
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
      
      const { isLoading, error, data } = useQuery({
        queryKey: ["services"],
        queryFn: async () => {
            let res = await newRequest.get(`/services/`);
            let userIds = new Set();
            for (const element of res.data) {
              userIds.add(element.userId);
            }
            let nizPromise = [];
            for (const userId of userIds) {
              
              console.log('test', userId);
              
              let userDataPromise = newRequest.get(`/users/${userId}`);
              nizPromise.push(userDataPromise);
            }
            let userDatas = await Promise.all(nizPromise)
            console.log('userDatas', userDatas)
            for (const userData of userDatas) {
            //   if(userData.data._id != currentUser._id)
            //   {
            //     setNewUser(userData.data.username)
            //     console.log('drugi korisnik', userData.data)
      
            //   }
              for (const elementx of res.data) {
                if (elementx.userId === userData.data._id)
                  elementx.username = userData.data.username
              }
            }
          return res.data.map((service, index) => ({ ...service, id: index }));
          }
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

export default ListServices