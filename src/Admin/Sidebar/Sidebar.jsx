
import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
import classes from './Sidebar.module.scss';


const Sidebar = ({ activeItem, handleItemClick }) => {
  const navigate = useNavigate();  // Initialize the navigate function

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('id');
    
    // Redirect to login page
    navigate('/login');
  };
  

  const handleNavigateToProducts = () => {
    navigate('/dashboard/totalproducts');  // Navigate to the total products page (absolute path)
  };

  const handleUser = () => {
    navigate('/dashboard/userdetails');  // Redirect to the user details page (absolute path)
  };

  return (
    <div className={classes.sidebar}>
      <h2>Admin Panel</h2>

      <div 
        className={`${classes['menu-item']} ${activeItem === 'dashboard' ? classes.active : ''}`} 
        onClick={() => {
          handleItemClick('dashboard');
          navigate('/dashboard');  // Navigate to the dashboard page (absolute path)
        }}
      >
        <i className="fas fa-tachometer-alt"></i> Dashboard
      </div>

      <div 
        className={`${classes['menu-item']} ${activeItem === 'users' ? classes.active : ''}`} 
        onClick={() => {
          handleItemClick('users');
          handleUser();  // Navigate to user details page (absolute path)
        }}
      >
        <i className="fas fa-users"></i> Users
      </div>

      <div 
        className={`${classes['menu-item']} ${activeItem === 'products' ? classes.active : ''}`} 
        onClick={() => {
          handleItemClick('products');
          handleNavigateToProducts();  // Navigate to products page (absolute path)
        }}
      >
        <i className="fas fa-box"></i> Products {/* Icon for products */}
      </div>

      <div 
        className={`${classes['menu-item']} ${activeItem === 'logout' ? classes.active : ''}`} 
        onClick={handleLogout}  // Call handleLogout when clicking logout
      >
        <i className="fas fa-sign-out-alt"></i> Logout
      </div>

      <div className={classes['sidebar-footer']}>
        <p>&copy; 2024 Admin Panel</p>
      </div>
    </div>
  );
};

export default Sidebar;
