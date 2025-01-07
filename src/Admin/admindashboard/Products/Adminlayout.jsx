import React, { useState, useEffect } from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';  // This will render the child routes
import classes from './Adminlayout.module.scss';  // Add SCSS for the layout

const AdminLayout = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();  

  useEffect(() => {

    const user = localStorage.getItem("user");
    
    if (user) {

      const parsedUser = JSON.parse(user);
      

      if (parsedUser.isAdmin) {
        setAdmin(true);
      } else {
        setAdmin(false); 
      }
    }
  }, []);  
  if (!admin) {

    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center p-8 bg-white shadow rounded">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">You do not have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const handleItemClick = (item) => {
    setActiveItem(item);  // Update active item when clicked
  };

  return (
    <div className={classes.adminLayout}>
      {/* Sidebar Component */}
      <Sidebar activeItem={activeItem} handleItemClick={handleItemClick} />

      {/* Main Content */}
      <main className={classes.mainContent}>
        <Outlet />  {/* This renders the nested routes */}
      </main>
    </div>
  );
};

export default AdminLayout;

