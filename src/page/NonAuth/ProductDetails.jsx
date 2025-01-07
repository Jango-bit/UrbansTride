import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { ProductContext } from '../../auth/Context/Context';
import classes from './ProductDetails.module.scss';

const ProductDetail = () => {
  const { id } = useParams();
  const { products, cart, addCart } = useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const [isInCart, setIsInCart] = useState(false);
  
  const navigate = useNavigate();  // Initialize navigate

  // UseEffect to get the specific product based on the id
  useEffect(() => {
    const selectedProduct = products.find(item => item.id === id);
    setProduct(selectedProduct);
    if (cart.some(item => item.id === id)) {
      setIsInCart(true); // If product is already in cart, update state
    }
  }, [id, products, cart]);

  const handleAddToCart = () => {
    if (!isInCart) {
      addCart(id);  // Call addCart function with the product id
      setIsInCart(true); // Update button state to "Go to Cart"
    }
  };

  const handleGoToCart = () => {
    navigate('/cart'); // Navigate to the cart page when the button is clicked
  };

  if (!product) {
    return <div>Loading...</div>; // Show loading if product details are not loaded
  }

  return (
    <div className={classes.productDetailContainer}>
      <div className={classes.productImage}>
        <img src={product.image_url} alt={product.name} className={classes.productImg} />
      </div>
      <div className={classes.productInfo}>
        <h2 className={classes.productTitle}>{product.name}</h2>
        <p className={classes.productDescription}>{product.description}</p>
        <p className={classes.productPrice}><strong>Price:</strong> ₹{product.price}</p>
        
        <button
          className={classes.addToCartButton}
          onClick={isInCart ? handleGoToCart : handleAddToCart}  // Check if product is in cart
        >
          {isInCart ? 'Go to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
