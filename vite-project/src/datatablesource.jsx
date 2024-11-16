export const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
{  field: 'username', 
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
        {params.row.isSeller ? "Honorarac" : "Klijent"}
      </div>
    )
  },
  { 
    field: 'Opcije', 
    headerName: 'Opcije', 
    width: 200,
    renderCell: (params) => (
      <div>
        <Button variant="contained" color="primary" onClick={() => handleEdit(params.row.id)}>Uredi</Button>
        <Button variant="contained" color="secondary" onClick={() => handleDelete(params.row._id)}>Obriši</Button>
      </div>
    )
  },

];
  
export const { isLoading, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
     newRequest.get(`/users`).then((res) => {
      return res.data.map((user, index) => ({ ...user, id: index }));
      }),
  });