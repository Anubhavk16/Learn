


import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import NavBar from './NavBar';
import SideNavigation from './sideNavigation';
import { addToCart, addToWishlist, RemoveFromWishlist, setProducts } from '../../store/slices/Categoryslices'; // Update imports
import Heart from 'react-animated-heart';
import { useState } from 'react';
import './product.css'

import socket from './socket';

function Products() {
  const selectedcat = useSelector((state) => state.category.selectedCategoryId);
  const products = useSelector((state) => state.category.products);
  const dispatch = useDispatch();
  const [isClick, setClick] = useState(false);
  const user = useSelector((state) => state.category.user);

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

  const filteredProducts = selectedcat
    ? products.filter((product) => product.categoryId === selectedcat)
    : products;

  const handleAddToCart = (productId, title) => {
    const email = user.email;

    dispatch(addToCart(productId));
    socket.emit('addToCartNotification', { email, title });
  };

  const handleToggleWishlist = (productId) => {
    if (isClick) {
      dispatch(RemoveFromWishlist(productId));
    } else {
      dispatch(addToWishlist(productId));
    }
    setClick(!isClick);
  };

  return (
    <>
      <Col xs lg="2" style={{ width: '100%' }}>
        <NavBar />
      </Col>
      <Container fluid>
        <Row>
          <Col style={{ width: '100%' }}>
            <SideNavigation />
          </Col>

          <Col>
            <h1>Products</h1>
            <div className="product-cards">
              {filteredProducts.map((product) => (
                <div key={product._id} className="card" style={{ width: '12rem' }}>
                  <img className="card-img-top" src={product.images[0]} alt={product.title} />

                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">Brand: {product.brand}</p>
                    <p className="card-text">Category: {product.category}</p>
                    <p className="card-text">Price: {product.price}</p>
                    <div className="App">
                      <Heart
                        isClick={isClick}
                        onClick={() => handleToggleWishlist(product._id)}
                      />
                    </div>
                    <button onClick={() => handleAddToCart(product._id, product.title)}>Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Products;


