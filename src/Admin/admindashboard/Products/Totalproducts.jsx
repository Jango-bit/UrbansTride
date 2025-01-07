
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from './Totalproducts.module.scss';

function TotalProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Fetch all products
    axios
      .get('http://localhost:3000/item')
      .then((response) => {
        setProducts(response.data); // Set fetched products to state
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleDelete = (productId) => {
    // Delete product by ID
    axios
      .delete(`http://localhost:3000/item/${productId}`)
      .then((response) => {
        setProducts(products.filter((product) => product.id !== productId));
        alert('Product deleted successfully!');
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
      });
  };

  const handleEdit = (productId) => {
    // Navigate to the edit page with productId
    navigate(`/dashboard/edit/${productId}`); // Passing productId to the edit page
  };

  return (
    <div className={styles.totalProductsContainer}>

      
      <h2 className={styles.title}>Total Products</h2>
      <div className={styles.productList}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img
              src={product.image_url}
              alt={product.name}
              className={styles.productImage}
            />
            <div className={styles.productDetails}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
            </div>
            <div className={styles.actions}>
              {/* Edit Button with productId passed */}
              <button onClick={()=>handleEdit(product.id)}>Edit</button>
              <button
                onClick={() => handleDelete(product.id)}
                className={styles.deleteBtn}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TotalProducts;
