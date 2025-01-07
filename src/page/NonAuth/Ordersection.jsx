// OrderSection.js
import React, { useEffect, useState } from 'react';
import classes from './Ordersection.module.scss' 

const OrderSection = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem('order');
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder)); // Load the order from localStorage
    } else {
      console.log("No order found.");
    }
  }, []);

  return (
    <div className={classes.orderContainer}>
      <h2 className={classes.orderTitle}>Order Summary</h2>

      {order ? (
        <>
          <p><strong>Order Date:</strong> {order.orderDate}</p>
          <p><strong>Status:</strong> {order.status}</p>

          <div className={classes.orderItems}>
            {order.items.map((item) => (
              <div key={item.id} className={classes.orderItem}>
                <img
                  src={item.image_url}
                  alt={item.name}
                  className={classes.orderItemImage}
                />
                <h3 className={classes.orderItemName}>{item.name}</h3>
                <p className={classes.orderItemPrice}>Price: ₹{item.price}</p>
                <p className={classes.orderItemQuantity}>Quantity: {item.quantity}</p>
                <p className={classes.orderItemTotal}>Total: ₹{item.quantity * item.price}</p>
              </div>
            ))}
          </div>

          <div className={classes.orderSummary}>
            <h3>Total Products: {order.totalItems}</h3>
            <h3>Total Price: ₹{order.totalPrice}</h3>
          </div>
        </>
      ) : (
        <p>No order details available.</p>
      )}
    </div>
  );
} 

export default OrderSection;
