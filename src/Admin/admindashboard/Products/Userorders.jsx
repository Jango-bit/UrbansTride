import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './Useroders.module.scss'

function UserOrders() {
  const [orders, setOrders] = useState([]);  // State to store user orders
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state

  useEffect(() => {
    const userId = localStorage.getItem('id');  // Get user ID from localStorage

    if (!userId) {
      setError('User ID not found');
      setLoading(false);
      return;
    }

    // Fetch user orders from API
    axios.get(`http://localhost:3000/orders/user/${userId}`)
      .then((response) => {
        setOrders(response.data);  // Set the fetched orders in state
        setLoading(false);  // Set loading to false
      })
      .catch((error) => {
        setError('Failed to load orders');
        setLoading(false);
      });
  }, []);  // Empty array means this will run once when the component mounts

  if (loading) {
    return <div className={classes.loading}>Loading orders...</div>;  // Display while loading
  }

  if (error) {
    return <div className={classes.error}>{error}</div>;  // Display error if there is an issue
  }

  return (
    <div className={classes.userOrdersContainer}>
      <h2>User Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>  // Display message if there are no orders
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order.id} className={classes.orderCard}>
              <h3>Order #{order.id}</h3>
              <p><strong>Status:</strong> <span className={classes.orderStatus}>{order.status}</span></p>
              <p><strong>Date:</strong> <span className={classes.orderDate}>{new Date(order.date).toLocaleDateString()}</span></p>
              <div className={classes.orderedItems}>
                <h4>Ordered Items:</h4>
                {order.items && order.items.length > 0 ? (
                  <ul>
                    {order.items.map((item) => (
                      <li key={item.id}>
                        <strong>{item.name}</strong> - {item.quantity} x ${item.price} <span className={classes.itemPrice}>${item.quantity * item.price}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={classes.noItems}>No items in this order</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserOrders;
