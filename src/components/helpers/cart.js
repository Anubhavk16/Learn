


import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { RemoveFromCart } from '../../store/slices/Categoryslices';

function Cart() {
  const cartItemIds = useSelector((state) => state.category.selectedproducts);
  const products = useSelector((state) => state.category.products);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(RemoveFromCart(productId));
  };

  return (
    <Container fluid>
      <h1>Your Cart</h1>
      <Row>
        <Col>
          {cartItemIds.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItemIds.map((cartItemId) => {
              const product = products.find((product) => product._id === cartItemId);

              if (product) {
                return (
                  <div key={product._id} className="card mb-3">
                    <Row g={0}>
                      <Col md={3}>
                        <img className="img-fluid" src={product.images} alt={product.title} />
                      </Col>
                      <Col md={9}>
                        <div className="card-body">
                          <h5 className="card-title">{product.title}</h5>
                          <p className="card-text">{product.description}</p>
                          <p className="card-text">Brand: {product.brand}</p>
                          <p className="card-text">Category: {product.category}</p>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleRemoveFromCart(product._id)}
                          >
                            Remove From Cart
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                );
              }

              return null;
            })
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;
