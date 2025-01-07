import React, { useContext } from 'react';
import { ProductContext } from '../../auth/Context/Context';
import classes from './Serach.module.scss';

const SearchPage = () => {
  const { filteredProducts, loading } = useContext(ProductContext); // Use filtered products from context

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className={classes.searchPageContainer}>
      <h2>Search Results</h2>

      {filteredProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className={classes.productList}>
          {filteredProducts.map(product => (
            <div key={product.id} className={classes.productCard}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>₹{product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
