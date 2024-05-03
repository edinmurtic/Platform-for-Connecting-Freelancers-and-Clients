import Sidebar from "../../components/sidebar/Sidebar";
import "./AdminDashboard.css";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import TableList from "../../components/tableList/TableList";
import Datatable from "../../components/dataTable/DataTable";
import { Link } from "react-router-dom";
// import Featured from "../../components/featured/Featured";
// import Chart from "../../components/chart/Chart";
// import Table from "../../components/table/Table";
const AdminDashboard = () => {

    return (
        <div className="home">
          <div className="homeContainer">
            <div className="widgets">
           <Link to={"/list"} style={{ textDecoration: 'none', color: "black", width:"100%" }}> <Widget type="user" /></Link>
           <Link to={"/listServices"} style={{ textDecoration: 'none', color: "black", width:"100%" }}> <Widget type="order" /></Link>
           <Link to={"/list"} style={{ textDecoration: 'none', color: "black", width:"100%" }}>  <Widget type="earning" /></Link>
              {/* <Widget type="balance" /> */}
            </div>
             <div className="charts">
              <Featured />
              <Chart title="Posljednjih 6 mjeseci (prihod)" aspect={2 / 1} />
            </div>
          </div>
        </div>
      );
}

export default AdminDashboard