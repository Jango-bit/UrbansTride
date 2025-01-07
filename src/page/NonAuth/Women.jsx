import React, { useContext, useState } from 'react'
import { ProductContext } from '../../auth/Context/context'
import { useEffect } from 'react'
import classes from './Women.module.scss'
function Women() {
    const {products}=useContext(ProductContext)
    const[items,setItems]=useState([])

useEffect(()=>{
    if(products&&Array.isArray(products)){
        const filteredItems=products.filter(products=>products.category==='Women')
        setItems(filteredItems)
    }

},[products])
console.log("filtered to men",items);



    return (
        <div className={classes.productList}>
        {/* Conditional rendering */}
        {items.length > 0 ? (
          <div className={classes.productsublist}>
            {items.map((item, index) => (
              <div key={index} className={classes.productCard}>
                {/* Product Image */}
                <div className={classes.productImage}>
                  {item.image_url ? (
                    <img 
                      src={item.image_url}  // Corrected to use item.image_url
                      alt={item.name}
                      style={{ width: '100%', height: '200px', objectFit: 'cover' }}  // Inline style for image
                    />
                  ) : (
                    <p>No image available</p>  // Fallback if image is missing
                  )}
                </div>
  
                {/* Product Information */}
                <div className={classes.productInfo}>
                  <h3 className={classes.productTitle}>{item.name}</h3>
                  <p className={classes.productDescription}>{item.description}</p>
                  <p className={classes.productPrice}><strong>Price:</strong> ${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No products available for Men</p>  // Message when items array is empty
        )}
      </div>
  )
}

export default Women
