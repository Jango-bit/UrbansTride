

import React, { useEffect, useState, useContext } from 'react';
import { ProductContext } from '../../auth/Context/Context';
import { useNavigate, useParams } from 'react-router-dom';  // Import useNavigate
import classes from './Allcategory.module.scss';
import Footer from '../../common/Layout/Footer/Footer';

const Al = () => {
  const { products } = useContext(ProductContext); // Getting products from context
  const [items, setItems] = useState([]);  // State to store the list of products
  const navigate = useNavigate();  // Hook for navigation
  const {id} =useParams()
console.log(id)
  // useEffect to update items whenever products change
  useEffect(() => {

    if(products&&Array.isArray(products)){
      if(id=="All"){
        setItems(products);
      }else{
        const filteredItems=products.filter(products=>products.category==id)
        setItems(filteredItems)
      }
     
  }

  }, [products,id]);

  // Function to handle product click and navigate to product details page
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);  // Navigate to ProductDetail page with product ID
  };

  console.log("items", items);  // Debugging

  return (
<>
    
    
    <div className={classes.productList}>
      {items.length > 0 ? (
        <div className={classes.productsublist}>
          {items.map((item, index) => (
            <div
              key={index}
              className={classes.productCard}
              onClick={() => handleProductClick(item.id)}  // Pass product ID on click
            >
              <div className={classes.productImage}>
                {item.image_url ? (
                  <img 
                    src={item.image_url}
                    alt={item.name}
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                ) : (
                  <p>No image available</p>
                )}
              </div>
              <div className={classes.productInfo}>
                <h3 className={classes.productTitle}>{item.name}</h3>
                <p className={classes.productDescription}>{item.description}</p>
                <p className={classes.productPrice}><strong>Price:</strong> ${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available</p>
      )}
      
    </div>
      <div className={classes.footer}><Footer/></div>
    </>
  );
};

export default Al;
