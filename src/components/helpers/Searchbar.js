
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts } from '../../store/slices/Categoryslices';
import axios from 'axios';

const Searchbar = () => {
  const products = useSelector((state) => state.category.products);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/getproducts');
        dispatch(setProducts(response.data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [dispatch]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase(),
    )||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    

  );

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className='input-group'>
          <input
            type='text'
            id='search_field'
            className='form-control'
            placeholder='Enter product Name ....'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className='input-group-append'>
            <button id="search_btn" className='btn'>
              <i className='fa fa-search' aria-hidden='true'></i>
            </button>
          </div>
        </div>
      </form>
      <ul>
        {searchTerm && 
          filteredProducts.map((product) => (
            <li key={product._id}>
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">Brand: {product.brand}</p>
                  <p className="card-text">Category: {product.category}</p>
                  <p className="card-text">Price: {product.price}</p>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Searchbar;
