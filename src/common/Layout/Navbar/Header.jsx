

import React, { useState, useEffect } from 'react';
import { Im500Px } from "react-icons/im";
import { BiSolidCartAdd } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../services/axios,';
import classes from './Header.module.scss';

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [suggestions, setSuggestions] = useState([]); // State to hold product suggestions
  const [products, setProducts] = useState([]); // State for products (assume fetched via API or context)

  // Fetch the product data (replace this with your actual API or context)
  useEffect(() => {
    // Simulate a product fetch (replace with actual API call)
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/item"); // Replace with actual API endpoint
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle the search input change
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim() !== "") {
      // Filter products based on the search query
      const filteredSuggestions = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Handle search submit (button click or enter key press)
  const handleSearchSubmit = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  // Handle "Enter" key press for search
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  // Handle suggestion click (navigate to product details)
  const handleSuggestionClick = (productId) => {
    navigate(`/product/${productId}`);
    setSearchQuery(""); // Clear search query after selection
    setSuggestions([]); // Clear suggestions
  };

  // Handle logout action
  const handleLogout = () => {
    logout(navigate);  // Call the logout function
    navigate("/login");  // Redirect to the SignUp page after logging out
  };

  return (
    <div className={classes.heightComponsator}>
      <header className={classes.header}>
        <div className={classes.logoContainer}>
          <h2 className={classes.logoText}>UrbanStride</h2>
          <Im500Px className={classes.icon} />
        </div>
        <ul className={classes.navList}>
          <li><Link to="/" className={classes.navLink}>Home</Link></li>
          <li><Link to="/category/All" className={classes.navLink}>Shoes</Link></li>
          <li><Link to="/category/Men" className={classes.navLink}>Men</Link></li>
          <li><Link to="/category/Women" className={classes.navLink}>Women</Link></li>
          <li><Link to="/brands" className={classes.navLink}>Brands</Link></li>
        </ul>

        <div className={classes.right}>
          <BiSolidCartAdd className={classes.cartIcon} onClick={() => navigate('/cart')} />
          
          {/* Show Login and Register links if user is not logged in */}
          {!localStorage.getItem("user") ? (
            <>
              <Link to="/login" className={classes.navLink}>Login</Link>
              <Link to="/register" className={classes.navLink}>Register</Link>
            </>
          ) : (
            // Show Logout button if user is logged in
            <button onClick={handleLogout} className={classes.logoutButton}>
              Logout
            </button>
          )}
        </div>
      </header>

      {/* Search Bar - Placed after the navbar */}
      <div className={classes.searchContainer}>
        <input
          type="text"
          placeholder="Search for shoes, brands, etc."
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
          className={classes.searchInput}
        />
        <button 
          onClick={handleSearchSubmit} 
          className={classes.searchButton}>
          Search
        </button>

        {/* Display suggestions as a dropdown */}
        {suggestions.length > 0 && (
          <div className={classes.suggestionsDropdown}>
            {suggestions.map((product) => (
              <div
                key={product.id}
                className={classes.suggestionItem}
                onClick={() => handleSuggestionClick(product.id)} // Navigate to product details
              >
                {product.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
