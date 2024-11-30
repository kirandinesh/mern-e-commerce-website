import React, { useEffect, useState } from "react";
import "../CSS/admin-view/AdminDashboard.css";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import graph from "../../assets/adminIcons/graph.png";
import group from "../../assets/adminIcons/Group.png";
import recent from "../../assets/adminIcons/recent.png";
import square from "../../assets/adminIcons/sqaure.png";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useDispatch, useSelector } from "react-redux";
import { getUsersWithRole } from "../../features/authSlice";
import { getAllOrdersOfAllUser } from "../../features/admin/orders-slice";
import { LineChart } from "@mui/x-charts/LineChart";

function AdminDashboard() {
  const dispatch = useDispatch();
  const { usersList = [], isLoading } = useSelector((state) => state.auth);
  const { orderList, orderDetail } = useSelector((state) => state.adminOrder);
  const [selectedMonth, setSelectedMonth] = useState("");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    if (usersList.length === 0) {
      dispatch(getUsersWithRole());
    }
  }, [dispatch, usersList]);

  useEffect(() => {
    dispatch(getAllOrdersOfAllUser());
  }, [dispatch]);

  const selectedMonthIndex = months.indexOf(selectedMonth);

  const filteredOrdersByMonth = orderList.filter((order) => {
    const orderDate = new Date(order.orderDate);
    const orderMonthIndex = orderDate.getMonth();

    if (selectedMonth === "") return true;

    return orderMonthIndex === selectedMonthIndex;
  });

  const usersListLength = usersList.length;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const deliveredOrders = orderList.filter(
    (order) => order.orderStatus === "confirmed"
  );
  const totalPrice = orderList.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );

  const pendingOrders = orderList.filter(
    (order) => order.orderStatus === "pending"
  );
  const handleChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
    console.log(month);
  };
  console.log(
    filteredOrdersByMonth,
    "filteredOrdersByMonthfilteredOrdersByMonth"
  );

  const cardsData = [
    {
      title: "Total Users",
      value: usersListLength,
      icon: group,
      backgroundColor: "#8280ff",
    },
    {
      title: "Total Order",
      value: deliveredOrders.length,
      icon: square,
      backgroundColor: "#FEC53D",
    },
    {
      title: "Total Sales",
      value: `$${Number(totalPrice).toLocaleString()}`,
      icon: graph,
      backgroundColor: "#4AD991",
    },
    {
      title: "Total Pending",
      value: pendingOrders.length,
      icon: recent,
      backgroundColor: "#FF9066",
    },
  ];

  return (
    <div className="dashboard-main-container">
      <h1>ADMIN DASHBOARD</h1>
      <section className="dashboard-card-container">
        {cardsData.map((card, index) => (
          <Card className="dashboard-card" key={index}>
            <CardContent className="dashboard-card-content">
              <div className="card-details">
                <div className="card-details-left">
                  <span>{card.title}</span>
                  <h3>{card.value}</h3>
                </div>
                <div className="card-details-right">
                  <div
                    style={{
                      backgroundColor: card.backgroundColor,
                      width: "100%",
                      height: "100%",
                      borderRadius: "23px",
                      position: "absolute",
                      opacity: "0.2",
                    }}
                  ></div>
                  <img
                    src={card.icon}
                    alt={`${card.title} icon`}
                    style={{
                      position: "relative",
                      zIndex: 1,
                      width: "32px",
                      height: "29px",
                    }}
                  />
                </div>
              </div>
            </CardContent>
            <CardActions className="card-actions">
              <TrendingUpIcon />
              <Typography>1.8% Up from yesterday</Typography>
            </CardActions>
          </Card>
        ))}
      </section>
      <section>
        <Card className="chart-container">
          <CardContent>
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
              ]}
              height={400}
            />
          </CardContent>
        </Card>
      </section>
      <section>
        <Card className="deal-main-container">
          <div className="deal-header">
            <CardHeader title="Deals Details" />
            <select
              name="months"
              id="months"
              onChange={handleChange}
              value={selectedMonth}
            >
              <option value="">Select a month</option>
              {months.map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <CardContent>
            <table className="deal-container">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Location</th>
                  <th>Date-Time</th>
                  <th>Piece</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrdersByMonth.map((order, index) => (
                  <tr key={index}></tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

export default AdminDashboard;
