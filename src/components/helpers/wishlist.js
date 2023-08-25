import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { RemoveFromWishlist } from '../../store/slices/Categoryslices';

function Wishlist() {
  const wishlistItemIds = useSelector((state) => state.category.selectedproducts); 
  const products = useSelector((state) => state.category.products);
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = (productId) => {
    dispatch(RemoveFromWishlist(productId));
  };


  return (
    <Container fluid>
      <h1>Your Wishlist</h1>
      <Row>
        <Col>
          {wishlistItemIds.length === 0 ? (
            <p>Your wishlist is empty.</p>
          ) : (
            wishlistItemIds.map((wishlistItemId) => {
              const product = products.find((product) => product._id === wishlistItemId);

              if (product) {
                return (
                  <div key={product._id} className="card mb-3">
                    <Row g={0}>
                      <Col md={3}>
                      <img className="card-img-top" src={product.images[0]} alt={product.title} />
                      </Col>
                      <Col md={9}>
                        <div className="card-body">
                          <h5 className="card-title">{product.title}</h5>
                          <p className="card-text">{product.description}</p>
                          <p className="card-text">Brand: {product.brand}</p>
                          <p className="card-text">Category: {product.category}</p>
                          <p className="card-text">Price: {product.price}</p>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleRemoveFromWishlist(product._id)}
                          >
                            Remove From Wishlist
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

export default Wishlist;
