
import React, { useContext, useState, useEffect } from 'react';
import { ProductContext } from '../../auth/Context/Context';  // Ensure this path is correct
import classes from './Men.module.scss';

function Men() {
  const { products } = useContext(ProductContext);  // Extract 'products' from the context
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (Array.isArray(products)) {
      // Filter products to only show those categorized as "Men"
      const filteredItems = products.filter((product) => product.category === 'Men');
      setItems(filteredItems);
    }
  }, [products]);

  console.log('Filtered products:', items);  // Log to check filtered items

  return (
    <div className={classes.productList}>
      {items.length > 0 ? (
        <div className={classes.productsublist}>
          {items.map((item, index) => (
            <div key={index} className={classes.productCard}>
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
                <p className={classes.productPrice}>
                  <strong>Price:</strong> ${item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available for Men</p>
      )}
    </div>
  );
}

export default Men;
