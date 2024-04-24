import "./TableList.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const TableList = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['orders'],
    queryFn: () =>
      newRequest.get(
        `/orders`

      ).then((res) => {
        return res.data
      })
  })
  console.log(data);

  const { isLoading: userIsLoading, error: isUserError, data: isUserData } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
     newRequest.get(`/users`).then((res) => {
        return res.data;
      }),
  });
console.log(isUserData);

  return (
    <TableContainer component={Paper} className="table">
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell className="tableCell"> ID</TableCell>
          <TableCell className="tableCell">Servis</TableCell>
          <TableCell className="tableCell">Kupac</TableCell>
          <TableCell className="tableCell">Prodavac</TableCell>
          <TableCell className="tableCell">Vrijeme</TableCell>
          <TableCell className="tableCell">Način plaćanja</TableCell>
          <TableCell className="tableCell">Cijena</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {isLoading ? ("loading") : error ? ("error"): (
          <TableRow key={data._id}>
          { data.map((row) => (
            <div>
            <TableCell className="tableCell">{row._id}</TableCell>
            <TableCell className="tableCell">
              <div className="cellWrapper">
                <img src={row.cover} alt="" className="image" />
                {row.title}
              </div>
            </TableCell>
            <TableCell className="tableCell">{row.customer}</TableCell>
            <TableCell className="tableCell">{row.date}</TableCell>
            <TableCell className="tableCell">{row.amount}</TableCell>
            <TableCell className="tableCell">{row.method}</TableCell>
            <TableCell className="tableCell">
              <span className={`status ${row.status}`}>{row.status}</span>
            </TableCell>
          </div>  ))}</TableRow>
        )}
      </TableBody>
    </Table>
  </TableContainer>
  );
};

export default TableList;