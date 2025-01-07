



import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from '../../common/Layout/Navbar/Header';
import Register from '../../auth/Register';
import Login from '../../auth/Login';
import Hero from '../../page/NonAuth/Hero';
import Men from '../../page/NonAuth/Men';
import Women from '../../page/NonAuth/Women';
import ProductProvider from '../../auth/Context/Context';
import Al from '../../page/NonAuth/Allcategory';
import ProductDetail from '../../page/NonAuth/ProductDetails';
import Addtocart from '../../page/NonAuth/Addtocart';
import PaymentSection from '../../page/NonAuth/PaymentSection';
import Thankyou from '../../page/NonAuth/Thankyou';
import OrderPage from '../../page/NonAuth/Ordersection';
import Footer from '../../common/Layout/Footer/Footer';
import Brands from '../../page/NonAuth/Brands';
import Contact from '../../page/NonAuth/Contact';
import SearchResults from '../../page/NonAuth/Search';
import Dashboard from '../../Admin/admindashboard/Dashboard';
import Totalproducts from '../../Admin/admindashboard/Products/Totalproducts';
import Userdetails from '../../Admin/admindashboard/Products/Userdetails';
import Userorders from '../../Admin/admindashboard/Products/Userorders';
import AddProduct from '../../Admin/admindashboard/Products/Addproducts';
import EditProduct from '../../Admin/admindashboard/Products/EditProducts';
import AdminLayout from '../../Admin/admindashboard/Products/Adminlayout';  // Updated to AdminLayout
import Sidebar from '../../Admin/Sidebar/Sidebar';

const UserRoutes = () => {
  const location = useLocation();
  
  // Conditionally render Header based on location.pathname
  const shouldShowHeader = 
    !(
      location.pathname.startsWith('/dashboard') ||  // All admin routes start with /dashboard
      location.pathname.startsWith('/edit/') ||      // Matches "/edit/:productId"
      location.pathname === '/footer'                 // Explicitly hide header on /footer path
    );

  return (
    <>
      {shouldShowHeader && <Header />}  {/* Conditionally render Header */}

      <ProductProvider>
        <Routes>
          {/* User Routes */}
          <Route path='/' element={<Hero />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/category/:id' element={<Al />} />
          <Route path='/men' element={<Men />} />
          <Route path='/women' element={<Women />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path='/cart' element={<Addtocart />} />
          <Route path='/payment' element={<PaymentSection />} />
          <Route path='/thankyou' element={<Thankyou />} />
          <Route path='/order' element={<OrderPage />} />
          <Route path='/footer' element={<Footer />} />
          <Route path='/brands' element={<Brands />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/search' element={<SearchResults />} />

          {/* Admin Routes wrapped inside AdminLayout */}
          <Route path='/dashboard' element={<AdminLayout />}>
            <Route index element={<Dashboard />} />  {/* Render Dashboard on /dashboard */}
            <Route path="totalproducts" element={<Totalproducts />} />
            <Route path="userdetails" element={<Userdetails />} />
            <Route path="userorders" element={<Userorders />} />
            <Route path="addproduct" element={<AddProduct />} />
            <Route path="edit/:productId" element={<EditProduct />} />

          </Route>
        </Routes>
      </ProductProvider>
    </>
  );
};

export default UserRoutes;
