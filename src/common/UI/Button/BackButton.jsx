import React from 'react';

import classes from './Button.module.scss'; 
import { IoMdArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';

const BackButton = ({ className, to }) => {
  return (
   <>
   <Link to={`${to}`}>
   <IoMdArrowBack  
      className={className} 
    />
   </Link>
   </>
  );
};



export default BackButton;
