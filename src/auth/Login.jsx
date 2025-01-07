


import { Formik, Form } from 'formik';  
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../common/UI/Button/Button';
import InputField from '../common/UI/Input/InputField'; 
import classes from './Register.module.scss';
import BackButton from '../common/UI/Button/BackButton';
import { LoginAPi } from '../services/axios,';
import { ToastContainer, toast } from 'react-toastify';
import { logout } from '../services/axios,';

const Login = () => {
  const initialValues = {
    email: '',
    password: '',
  };
  

  const navigate = useNavigate();

  const fields = [
    { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter your email' },
    { label: 'Password', name: 'password', type: 'password', placeholder: 'Enter your password' },
  ];

  const onSubmit = async (values) => {
    try {
      const res = await LoginAPi(values);  
      console.log("res", res);
      if (res!=null ) {
        if(res[0].isAdmin){
          toast.success('Admin Logged In')
          navigate('/dashboard')
        }
        else if(!res[0].isAdmin){
          toast.success('Login successful');
          navigate('/');  
        }
      } else {
        toast.warning("Incorrect password");  
      }
    } catch (err) {
      toast.error('Something went wrong, please try again');
      console.error(err);
    }
  };
 

  return (
    <>
      <div className={classes.registerTop}>
        <ToastContainer />
        <div className={classes.registerConteriner}>
          <div className={classes.imageContainer}>
            <BackButton className={classes.backButton} to={"/"} />
            <img
              src="https://www.pixelstalk.net/wp-content/uploads/2015/12/Jordan-logo-wallpapers-black.jpg"
              alt="logo"
              className={classes.nikeLogoImage}
            />
            <img
              src="https://pngimg.com/uploads/nike/nike_PNG11.png"
              alt="logo"
              className={classes.nikeLogoImage}
            />
          </div>
          
          <div>
            <h2 className={classes.registerHeading}>Now let's make you a UrbanStrides member</h2>
            <div className={classes.signContainer}>
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form className={classes.classesform}>
                    {fields.map((field, index) => (
                      <InputField
                        key={index}
                        label={field.label}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        error={errors[field.name]}
                        touched={touched[field.name]}
                      />
                    ))}
                    
                    <Button
                      type="submit"
                      text="Submit"
                      className={classes.primary}
                      disabled={isSubmitting}
                    />
                    <Link to="/register">
                      <div className={classes.subText}>Don't have an account? <span>Sign Up</span></div>
                    </Link>             
                  </Form>
                )}
              </Formik>
            </div>
          </div>

   
     
        </div>
      </div>
    </>
  );
};

export default Login;
