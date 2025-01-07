


import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // State to hold product list
  const [cart, setCart] = useState(() => {
    // Try to retrieve cart from localStorage on initial load
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [userDetails, setUserDetails] = useState(null); // State for user details
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  const userId = localStorage.getItem('id');

  // Fetch user details and products on initial load
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (userId) {
        try {
          console.log('Fetching user details for', userId);
          const response = await axios.get(`http://localhost:3000/user/${userId}`);
          console.log('User Details:', response.data);
          setUserDetails(response.data);
        } catch (error) {
          console.error('Error fetching user details:', error);
          setError('Error fetching user details');
        }
      } else {
        console.warn('User ID not found in localStorage');
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/item');
        console.log('API Response:', response.data);
        setProducts(response.data);
      } catch (error) {
        console.error('Error occurred while fetching product data', error);
        setError('Error fetching product data');
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchUserDetails();
    fetchProducts();
  }, [userId]);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addCart = useCallback((id) => {
    const productExists = cart.some(item => item.id === id);
    if (!productExists) {
      // Add the product to the cart if it doesn't exist
      const productToAdd = products.find(item => item.id === id);
      if (productToAdd) {
        setCart(prevCart => {
          const newCart = [...prevCart, { ...productToAdd, quantity: 1 }]; // Set initial quantity to 1
          console.log('Product added to cart:', productToAdd);
          return newCart;
        });
      }
    } else {
      // Update the quantity of the existing product in the cart
      setCart(prevCart => 
        prevCart.map(item => 
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
      console.log('Product quantity updated in cart');
    }
  }, [cart, products]);
  

  return (
    <ProductContext.Provider value={{ products, userDetails, cart,setCart, addCart, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
ProductProvider.js
