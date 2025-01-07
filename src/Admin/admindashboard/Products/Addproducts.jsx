

import React, { useState } from 'react';
import axios from 'axios';
import styles from './AddProducts.module.scss'; // Import the SCSS module

function AddProduct() {
  const [product, setProduct] = useState({
    productid: '',
    name: '',
    description: '',
    price: '',
    category: '',
    image_url: '', // Ensure this is part of the state
  });

  const [imagePreview, setImagePreview] = useState(''); // State for image preview

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });

    // If the name of the field is 'image_url', update the image preview
    if (name === 'image_url') {
      setImagePreview(value); // Set the image preview to the entered URL
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make an API request to add the new product
    axios.post('http://localhost:3000/item', product)
      .then((response) => {
        console.log('Product added:', response.data);
        alert('Product added successfully!');
        
        // Optionally, clear the form after submission (if desired)
        setProduct({
          productid: '',
          name: '',
          description: '',
          price: '',
          category: '',
          image_url: '',
        });
        setImagePreview(''); // Reset image preview after form submission
      })
      .catch((error) => {
        console.error('Error adding product:', error);
        alert('Failed to add product');
      });
  };

  return (
    <div className={styles.addProductContainer}>
     
      <h2 className={styles.addProductTitle}>Add New Product</h2>
      <form className={styles.addProductForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <input
            type="text"
            name="name"
            className={styles.formInput}
            placeholder="Product Name"
            value={product.name}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="number"
            name="price"
            className={styles.formInput}
            placeholder="Price"
            value={product.price}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <textarea
            name="description"
            className={styles.formTextarea}
            placeholder="Product Description"
            value={product.description}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="text"
            name="category"
            className={styles.formInput}
            placeholder="Category"
            value={product.category}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="text"
            name="image_url"
            className={styles.formInput}
            placeholder="Image URL"
            value={product.image_url}
            onChange={handleInputChange}
          />
        </div>

        {/* Show image preview if image URL is provided */}
        {imagePreview && (
          <div className={styles.imagePreview}>
            <h3>Image Preview:</h3>
            <img src={imagePreview} alt="Product preview" className={styles.productImagePreview} />
          </div>
        )}

        <button type="submit" className={styles.submitBtn}>Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
