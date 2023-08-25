

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import {RemoveFromCart,incrementQuantity,decrementQuantity} from '../../store/slices/Categoryslices';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const cartItems = useSelector((state) => state.category.selectedproducts);
  const products = useSelector((state) => state.category.products);
  const isAuthenticated = useSelector((state) => state.category.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromCart = (productId) => {
    dispatch(RemoveFromCart(productId));
  };

  const increment = (productId) => {
    dispatch(incrementQuantity(productId));
  };

  const decrement = (productId) => {
    dispatch(decrementQuantity(productId));
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((cartItem) => {
      const product = products.find((product) => product._id === cartItem.id);
      if (product) {
        totalPrice += cartItem.quantity * product.price;
      }
    });
    return totalPrice;
  };

  async function PlaceOrder() {
    try {
      navigate('/placeorder');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container fluid>
      <h1>Your Cart</h1>
      <Row>
        <Col>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((cartItem) => {
              const product = products.find((product) => product._id === cartItem.id);

              if (product) {
                return (
                  <div key={product._id} className="card mb-3">
                    <Row g={0}>
                      <Col md={3}>
                        <img
                          className="card-img-top"
                          src={product.images[0]}
                          alt={product.title}
                        />
                      </Col>
                      <Col md={9}>
                        <div className="card-body">
                          <h5 className="card-title">{product.title}</h5>
                          <p className="card-text">{product.description}</p>
                          <p className="card-text">Brand: {product.brand}</p>
                          <p className="card-text">Category: {product.category}</p>
                          <p className="card-text">Price: {product.price}</p>
                          <button className="btn btn-danger" onClick={() => handleRemoveFromCart(cartItem.id)}>
                           Remove From Cart
                           </button>

                          <div className="container">
                            <button onClick={() => decrement(product._id)}>-</button>
                            <p id="count">{cartItem.quantity}</p>
                            <button onClick={() => increment(product._id)}>+</button>
                          </div>
                          <p>Total Price: {cartItem.quantity * product.price}</p>
                          
                        </div>
                      </Col>
                    </Row>
                  </div>
                );
              }

              return null;
            })
          )}
          <p>Total Cart Price: {calculateTotalPrice()}</p>
          {isAuthenticated ? (
                            <>
                              <button onClick={PlaceOrder}>Place Order</button>
                            </>
                          ) : (
                            <>
                              <Link to="/">Place Order</Link>
                            </>
                          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;

