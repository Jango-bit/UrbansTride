import React, { useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';  // Import Link for navigation
import classes from './dropDown.module.scss' // Import SCSS styles

const DropDownMenu = ({ lists, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle dropdown visibility when the button is clicked
  const toggleDropdown = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <div className={classes.dropdownContainer}>
      <FaRegUserCircle className={classes.dropdownIcon} onClick={toggleDropdown} />  

      {isOpen && (
        <div className={classes.dropdownMenu}>
         
          {lists?.map((item, index) => (
            <Link 
              key={index} 
              to={item.link}  
              className={classes.dropdownItem}
              onClick={() => {
                onClick(item.name); 
                setIsOpen(false); 
              }}
            >
              {item?.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDownMenu;
