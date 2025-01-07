import React, { useState } from "react";

import classes from './Contact.module.scss';


const Contact=()=>{
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        subject:"",
        message:""
    })
    const handleChange=(e)=>{
        const{name,value}=e.target;
        setFormData((prevData)=>({
            ...prevData,
            [name]:value
        }))
        
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log("Form submitted:",formData);
alert("Thank you for reaching out! We'll get back to you soon.")        

    }
  return (
    <div>
        <div className={classes.contactus}>
            <h1>Contact Us</h1>
           <p> We’re here to help! Have questions, need assistance, or just want to share feedback? Reach out to us through any of the following channels:</p>

        </div>
        <div className={classes.method}>
          <h3>Email Us</h3>
          <p>For any inquiries, email us at <strong>support@yourstore.com</strong></p>
        </div>
        <div className={classes.method}>
          <h3>Follow Us on Social Media</h3>
          <p>Send us a message on:</p>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Twitter</a></li>
          </ul>
        </div>
        <h2>Send Us a Message</h2>
      <form onSubmit={handleSubmit}>
        <div className={classes.formgroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={classes.formgroup}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={classes.formgroup}>
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            />
            </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className={classes.buttonsubmit}>Submit</button>
  </form>
    </div>
  )
}

export default Contact
