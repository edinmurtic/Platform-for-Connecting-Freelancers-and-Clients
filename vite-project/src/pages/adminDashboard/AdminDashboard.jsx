import Sidebar from "../../components/sidebar/Sidebar";
import "./AdminDashboard.css";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import TableList from "../../components/tableList/TableList";
import Datatable from "../../components/dataTable/DataTable";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import newRequest from "../../utils/newRequest";
// import Featured from "../../components/featured/Featured";
// import Chart from "../../components/chart/Chart";
// import Table from "../../components/table/Table";
const AdminDashboard = () => {

  const [chartData, setChartData] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [earnLastMonth, setEarnLastMonth] = useState(0);
  const [earnlast7days, setEarnlast7days] = useState(0);
  const [earnToday, setEarnToday] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dohvat podataka za zaradu u posljednjih 7 dana
        const response = await newRequest.get('/orders/getTotalEarningsLast7DaysAndToday');
        setEarnlast7days(response.data.last7Days);
        setEarnToday(response.data.today);
        setEarnLastMonth(response.data.lastmonth);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
 console.log("earnlast7days:",earnlast7days)
  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await newRequest.get('/users/totalCount');
        setTotalUsers(response.data.totalCount);
      } catch (error) {
        console.error('Error fetching total users:', error);
      }
    };
  
    fetchTotalUsers();
  }, []);
// console.log(totalUsers)
  useEffect(() => {
    const fetchTotalOrders = async () => {
      try {
        const response = await newRequest.get('/orders/totalCount');
        setTotalOrders(response.data.totalCount);
      } catch (error) {
        console.error('Error fetching total orders:', error);
      }
    };
  
    fetchTotalOrders();
  }, []);
//  console.log("totalOrders:",totalOrders)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await newRequest.get('/orders/getTotalPricesByMonth');
        const adaptedData = response.data.map(item => {
          const monthNames = ["Januar", "Februar", "Mart", "April", "Maj", "Juni", "Juli", "August", "Septembar", "Oktobar", "Novembar", "Decembar"];
          return {
            name: monthNames[item._id - 1],
            Total: item.totalAmount
          };
        });
        setChartData(adaptedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
    return (
        <div className="home">
          <div className="homeContainer">
            <div className="widgets">
           <Link to={"/list"} style={{ textDecoration: 'none', color: "black", width:"100%" }}> <Widget type="user" amount={totalUsers} /></Link>
           <Link to={"/listServices"} style={{ textDecoration: 'none', color: "black", width:"100%" }}> <Widget type="order" amount={totalOrders} /></Link>
           <Link to={"/list"} style={{ textDecoration: 'none', color: "black", width:"100%" }}>  <Widget type="earning" /></Link>
              {/* <Widget type="balance" /> */}
            </div>
             <div className="charts">
              <Featured amountToday={earnToday} amountLast7day={earnlast7days} amountLastMonth={earnLastMonth} />
              <Chart title="Posljednjih 6 mjeseci (prihod)" aspect={2 / 1}  data={chartData} />
            </div>
          </div>
        </div>
      );
}

export default AdminDashboard