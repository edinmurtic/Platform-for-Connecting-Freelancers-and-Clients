import { DataGrid } from "@mui/x-data-grid";
import "../../components/dataTable/DataTable.css";

import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";
import Button from "@mui/material/Button";



const ListServices = () => {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
      {  field: 'title', 
        headerName: 'Title', 
        width: 200,
        renderCell: (params) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={params.row.cover} alt="cover" style={{ marginRight: 8, borderRadius: '50%', width: 24, height: 24 }} />
            {params.value}
          </div>
        )
      },    { field: 'category', headerName: 'Category', width: 130 },
        { field: 'price', headerName: 'Price', width: 130 },
       
        { 
          field: 'actions', 
          headerName: 'Actions', 
          width: 150,
          renderCell: (params) => (
            <div>
              <Button variant="contained" color="primary" onClick={() => handleEdit(params.row.id)}>Uredi</Button>
              <Button variant="contained" color="secondary" onClick={() => handleDelete(params.row.id)}>Obriši</Button>
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
             pageSize={9}
              rowsPerPageOptions={[9]}
              checkboxSelection
            />) } 
          </div>
      );
}

export default ListServices