


import React, { useEffect, useState, useContext } from 'react';
import { ProductContext } from '../../auth/Context/context';
import axios from 'axios';
import classes from './Addtocart.module.scss';
import { useNavigate } from 'react-router-dom';

function Addtocart() {
  const { cart, setCart } = useContext(ProductContext);  // Get cart from context
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();

  const userId = localStorage.getItem('id');

  useEffect(() => {
    // Only proceed if cart is defined
    if (cart && Array.isArray(cart)) {
      // Calculate total price and item count
      const calculateTotals = () => {
        let itemsCount = 0;
        let price = 0;
        cart.forEach(item => {
          itemsCount += item.quantity;
          price += item.price * item.quantity;
        });
        setTotalItems(itemsCount);
        setTotalPrice(price);
      };
      calculateTotals();
    }
  }, [cart]);  // Recalculate totals when cart changes

  const handleorder = () => {
    navigate('/order');
  };

  const handleclicking = () => {
    if (!cart || cart.length === 0) {
      alert("Your cart is empty! Add items before proceeding.");
      return;
    }
    const order = {
      items: cart,
      totalPrice: totalPrice,
      totalItems: totalItems,
      orderDate: new Date(),
      status: "Pending" 
    };

    localStorage.setItem('order', JSON.stringify(order)); 
    navigate('/payment');
  };

  // Functions for increasing/decreasing quantity and removing items from the cart
  const updateCart = (updatedCart) => {
    setCart(updatedCart);  // Update cart in context
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Persist to localStorage
  };

  const increaseQuantity = async (itemId) => {
    const updatedCart = cart.map(item => {
      if (item.id === itemId) {
        item.quantity = (item.quantity || 1) + 1;
      }
      return item;
    });
    updateCart(updatedCart);
  };

  const decreaseQuantity = async (itemId) => {
    const updatedCart = cart.map(item => {
      if (item.id === itemId) {
        item.quantity = (item.quantity || 1) - 1;
      }
      return item;
    });
    updateCart(updatedCart);
  };

  const removeItem = async (itemId) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    updateCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');  // Clear from localStorage as well
  };

  return (
    <div className={classes.cartContainer}>
      <h2 className={classes.cartTitle}>Your Shopping Cart</h2>

      <div className={classes.cartItems}>
        {cart && Array.isArray(cart) && cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.id} className={classes.cartItem}>
              <div className={classes.cartItemCard}>
                <img src={item.image_url} alt={item.name} className={classes.cartItemImage} />
                <h3 className={classes.cartItemName}>{item.name}</h3>
                <p className={classes.cartItemPrice}>Price: ₹{item.price}</p>

                <div className={classes.quantityControls}>
                  <button onClick={() => decreaseQuantity(item.id)} className={classes.decreaseBtn} disabled={item.quantity <= 1}>
                    -
                  </button>
                  <span className={classes.cartItemQuantity}>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)} className={classes.increaseBtn}>
                    +
                  </button>
                </div>

                <p className={classes.cartItemTotal}>Total: ₹{item.quantity * item.price}</p>

                <button onClick={() => removeItem(item.id)} className={classes.removeItemBtn}>Remove Item</button>
              </div>
            </div>
          ))
        ) : (
          <p className={classes.cartEmpty}>Your cart is empty.</p>
        )}
      </div>

      {cart && Array.isArray(cart) && cart.length > 0 && (
        <div className={classes.cartSummary}>
          <h3 className={classes.summaryTitle}>Cart Summary</h3>
          <div className={classes.summaryDetails}>
            <p>Total Products:</p>
            <p>{totalItems}</p>
          </div>
          <div className={classes.summaryDetails}>
            <p>Total Price:</p>
            <p>₹{totalPrice}</p>
          </div>
          <button onClick={clearCart} className={classes.clearCartBtn}>Clear Cart</button>
          <button onClick={handleclicking} className={classes.buyAllBtn}>BUY ALL</button>
          <button onClick={handleorder} className={classes.ordersButton}>YOUR ORDERS</button>
        </div>
      )}
    </div>
  );
}

export default Addtocart;
