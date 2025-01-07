
import React, { useContext, useState, useEffect } from 'react';  // Import useState and useEffect
// import Sidebar from '../../Admin/Sidebar/Sidebar';  // Import the Sidebar
import { Outlet, useNavigate } from 'react-router-dom';  // Import Outlet for child routes
import classes from './Dashboard.module.scss';  // Import the SCSS file for styles
import { ProductContext } from '../../auth/Context/Context';  // Import ProductContext to access products
import axios from 'axios';  // Import axios for API calls

function Dashboard() {
  // const navigate = useNavigate();

  const { products } = useContext(ProductContext); // Access products from context
  const [userOrders, setUserOrders] = useState(0); // To store the number of user orders
  const [totalUsers, setTotalUsers] = useState(0); // To store the total number of users



  // Fetch the number of user orders
  useEffect(() => {
    axios.get('http://localhost:3000/orders') // Replace with your actual API endpoint for orders
      .then((response) => {
        setUserOrders(response.data.length); // Assuming response is an array of orders
      })
      .catch((error) => {
        console.error('Error fetching user orders:', error);
      });

    // Fetch the total number of users
    axios.get('http://localhost:3000/user') // Replace with your actual API endpoint for users
      .then((response) => {
        setTotalUsers(response.data.length); // Assuming response is an array of users
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);  // Empty dependency array to run only on component mount

  

  return (
    <div className={classes.dashboardcontainer}>
      <div className={classes.sidebarcontainer}>
        {/* <Sidebar /> */}
      </div>

      <div className={classes.maincontent}>
        <h2>Welcome to Admin Dashboard</h2>

        <div className={classes.cardscontainer}>
          {/* Total Products Card */}
          <div className={classes.card}>
            <h3>Total Products</h3>
            <p className={classes.cardnumber}>{products.length}</p> {/* Show the number of products */}
          </div>

          {/* Total Users Card */}
          <div className={classes.card}>
            <h3>Total Users</h3>
            <p className={classes.cardnumber}>{totalUsers}</p> {/* Display the total number of users */}
          </div>

      
         
        </div>

        {/* This renders child routes */}
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
