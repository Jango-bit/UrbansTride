

import React from 'react';
import { Formik, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom'; 
import classes from './Register.module.scss';
import InputField from '../common/UI/Input/InputField';
import Button from '../common/UI/Button/Button';
import BackButton from '../common/UI/Button/BackButton';
import { ToastContainer } from 'react-toastify';
import { RegisterAPi } from '../services/axios,';
import { ValidationSchema } from './Validations';
import { toast } from 'react-toastify'

const initialValues = {
  name: '',
  email: '',
  password: '',
  cpassword: '',
};

const Register = () => {
  const navigate = useNavigate();

  const fields = [
    { label: 'Name', name: 'name', type: 'text', placeholder: 'Enter your name' },
    { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter your email' },
    { label: 'Password', name: 'password', type: 'password', placeholder: 'Enter your password' },
    { label: 'Confirm Password', name: 'cpassword', type: 'password', placeholder: 'Confirm your password' },
  ];

  const onSubmit = async (values) => {
    try {
      // console.log("from reg",values)
      // Register the user by calling the Register API
      const res = await RegisterAPi(values);

      if (res === "this mail already used") {
        toast.warning(res);  // If email is already used
      } else if (res === "login successfully") {
        // Assuming that res contains the user information (name, email, id)
        const userData = {
          name: values.name,
          email: values.email,
          id: values.id,  // Ensure that `id` is available in the response
        };

        // localStorage.setItem('userData', JSON.stringify(userData));
        console.log(userData);
        

        toast.success("Login successful!");
        navigate('/login'); // Redirect to home or dashboard after successful registration
      }

    } catch (err) {
      toast.warning('Something went wrong! Please try again.');
    }
  };

  return (
    <div className={classes.registerTop}>
      <ToastContainer />
      <div className={classes.registerContainer}>
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
          <h2 className={classes.registerHeading}>Now let's make you a title member</h2>
          <div className={classes.signContainer}>
            <Formik
              initialValues={initialValues}
              validationSchema={ValidationSchema}  // Added validation schema
              onSubmit={onSubmit}
            >
              {({ errors, touched }) => (
                <Form className={classes.form}> {/* Fixed class name */}
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
                  />

                  <Link to={"/login"}>
                    <div className={classes.subText}>
                      Already have an account? <span>Login</span>
                    </div>
                  </Link>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
