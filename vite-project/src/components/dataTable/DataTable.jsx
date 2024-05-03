import "./DataTable.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate, } from "react-router-dom";
import { useQuery, useQueryClient} from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";
import Button from "@mui/material/Button";
const Datatable = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleToggleActive = async (userId, isActive) => {
    try {
      const response = await newRequest.put(`/users/${userId}/toggle-active`, { isActive: !isActive });
      if (response.status === 200) {
        console.log("Status korisnika uspješno ažuriran.");
        queryClient.invalidateQueries("user");
      } else {
        console.error("Došlo je do greške prilikom ažuriranja statusa korisnika.");
      }
    } catch (error) {
      console.error("Došlo je do greške prilikom komunikacije sa serverom:", error);
    }
  };

  
  const handleDelete = async (userId) => {
    try {          

      const response = await newRequest.delete(`/users/${userId}`);
      
      if (response.status === 200) {
        console.log("Korisnik je uspešno obrisan.");
      } else {
        console.error("Došlo je do greške prilikom brisanja korisnika.");
      }
    } catch (error) {
      console.error("Došlo je do greške prilikom komunikacije sa serverom:", error);
    }
  };


  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { 
      field: 'isActive', 
      headerName: 'Active', 
      width: 130,
      renderCell: (params) => (
        <div>
          {params.row.isActive ? "Aktivan" : "Neaktivan"}
        </div>
      )
    },  {  field: 'username', 
    headerName: 'Username', 
    width: 150,
    renderCell: (params) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={params.row.img} alt="User" style={{ marginRight: 8, borderRadius: '50%', width: 24, height: 24 }} />
        {params.value}
      </div>
    )
  },    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'country', headerName: 'Country', width: 130 },
    { 
      field: 'role', 
      headerName: 'Role', 
      width: 130,
      renderCell: (params) => (
        <div>
          {params.row.isSeller ? "Prodavač" : "Kupac"}
        </div>
      )
    },
    { 
      field: 'Opcije', 
      headerName: 'Opcije', 
      width: 250,
      renderCell: (params) => (
        <div>
          <Button variant="contained" color="primary" onClick={() => ( navigate(`/updateUser/${params.row._id}`))}>Uredi</Button>
          {/* <Button variant="contained" color="error" onClick={() => handleDelete(params.row._id)}>Obriši</Button> */}
          <Button variant="contained" color={params.row.isActive ? "error" : "primary"} onClick={() => handleToggleActive(params.row._id, params.row.isActive)}>{params.row.isActive ? "Deaktiviraj" : "Aktiviraj"}</Button>

        </div>
      )
    },
 
  ];

  const { isLoading, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
     newRequest.get(`/users`).then((res) => {
      return res.data.map((user, index) => ({ ...user, id: index }));
      }),
  });
  return (
      <div className="datatable">
        <div className="datatableTitle">
          Add New User
         <Link to="/users/new" className="link">
           Add New
          </Link>
        </div>
       {isLoading ? ("Loading...") : error ? ("error") :(<DataGrid
  className="datagrid"
  rows={data}
  columns={columns}
  pagination
  pageSize={5}
  rowsPerPageOptions={[5]}
  initialState={{
    pagination: {
      paginationModel: {
        pageSize: 10,
      },
    },
  }}
  disableSelectionOnClick 
/>) } 
      </div>
  );
};

export default Datatable;