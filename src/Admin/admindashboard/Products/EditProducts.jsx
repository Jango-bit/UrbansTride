
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate to redirect after delete/update
import styles from './Editproducts.module.scss'; // Import SCSS module

function EditProduct() {
  const { productId } = useParams(); // Get the productId from URL
  const navigate = useNavigate(); // Hook to navigate to another page after delete or update

  const [product, setProduct] = useState({
    productid: '',
    name: '',
    description: '',
    price: '',
    category: '',
    image_url: '', // This will display the image but won't be editable
  });

  // Fetch product details by ID when the component mounts
  useEffect(() => {
    axios
      .get(`http://localhost:3000/item/${productId}`)
      .then((response) => {
        setProduct(response.data); // Set the fetched product data into state
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
        alert('Failed to load product details');
      });
  }, [productId]);

  // Handle input field changes for product details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value }); // Update the corresponding field in state
  };

  // Handle form submission for updating the product
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3000/item/${productId}`, product) // PUT request to update the product
      .then((response) => {
        console.log('Product updated:', response.data);
        alert('Product updated successfully!');
        navigate('/products'); // Redirect to the product list after successful update
      })
      .catch((error) => {
        console.error('Error updating product:', error);
        alert('Failed to update product');
      });
  };

  // Handle product deletion
  const handleDelete = () => {
    axios
      .delete(`http://localhost:3000/item/${productId}`) // DELETE request to remove the product
      .then((response) => {
        console.log('Product deleted:', response.data);
        alert('Product deleted successfully!');
        navigate('/products'); // Redirect to the product list after successful deletion
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
      });
  };

  return (
    <div className={styles.editProductContainer}>
      <h2 className={styles.editProductTitle}>Edit Product</h2>
      <form className={styles.editProductForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <input
            type="text"
            name="name"
            className={styles.formInput}
            placeholder="Product Name"
            value={product.name}
            onChange={handleInputChange}
            disabled // Disable the input field to avoid editing the name
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

        {/* Display product image (Image is read-only, not editable) */}
        {product.image_url && (
          <div className={styles.productImagePreview}>
            <h4>Current Product Image:</h4>
            <img
              src={product.image_url}
              alt={product.name}
              className={styles.productImage}
            />
          </div>
        )}

        <button type="submit" className={styles.submitBtn}>Update Product</button>
      </form>

      {/* Delete Product Button */}
      <button onClick={handleDelete} className={styles.deleteBtn}>Delete Product</button>
    </div>
  );
}

export default EditProduct;
