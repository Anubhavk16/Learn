




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector,useDispatch } from 'react-redux';
// import { Col, Container, Row } from "react-bootstrap";
// import SideNavigation from "./sideNavigation";
// import { addToCart } from "../../store/slices/Categoryslices";
// import { RemoveFromCart } from "../../store/slices/Categoryslices";


// function Products() {
//   const [products, setProducts] = useState([]);
//   // const [selectedCategoryId, setSelectedCategoryId] = useState(null);
//   const selectedcat=useSelector((state)=>state.category.selectedCategoryId);
//   const dispatch = useDispatch();


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/getproducts");
//         setProducts(response.data);

//         // Check if category ID is stored in local storage
//         // const storedCategoryId = localStorage.getItem("selectedCategoryId");
//         // setSelectedCategoryId(selectedcat);
//       } catch (error) {
//         console.error(error);
//       }
      
//     };

//     fetchData();
//   }, []);
  

//   const filteredProducts = selectedcat
//     ? products.filter((product) => product.categoryId === selectedcat)
//     : products;

//     const handleAddToCart = (event) => {
//       const productId=event.target.value
//       console.log(productId)

//       dispatch(addToCart(productId));
//     }

//     const handleRemoveFromCart=(event)=>{
//       const productId=event.target.value
//       console.log(productId)
//       dispatch(RemoveFromCart(productId))
//     }

    

//   return (
//     <>
//     <Container fluid>
//     <Row>
//       <Col  style={{width:'10%'}}>
//       <SideNavigation/>
//        </Col>
//       <Col>
//       <h1>Products</h1>
//       <div className="product-container">
//         {filteredProducts.map((product) => (
//           <div key={product._id} className="card" style={{ width: "18rem" }}>
//             <img className="card-img-top" src={product.images} alt={product.title} />
//             <div className="card-body">
//               <h5 className="card-title">{product.title}</h5>
//               <p className="card-text">{product.description}</p>
//               <p className="card-text">Brand: {product.brand}</p>
//               <p className="card-text">Category: {product.category}</p>

//               <button value= {product._id}onClick={handleAddToCart}>Add to Cart</button>
//               <button value= {product._id}onClick={handleRemoveFromCart}>Remove From Cart</button>

//             </div>
//           </div>
//         ))}
//       </div>
//       </Col>
//     </Row>
//     </Container>  
//     </>
//   );
// }

// export default Products;




import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import SideNavigation from './sideNavigation';
import { addToCart, RemoveFromCart, setProducts } from '../../store/slices/Categoryslices';

function Products() {
  const selectedcat = useSelector((state) => state.category.selectedCategoryId);
  const products = useSelector((state) => state.category.products);
  const dispatch = useDispatch();

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

  const handleAddToCart = (productId) => {
    dispatch(addToCart(productId));
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col style={{ width: '10%' }}>
            <SideNavigation data={{"name" : "shivani"}} />
          </Col>
          <Col>
            <h1>Products</h1>
            <div className="product-container">
              {filteredProducts.map((product) => (
                <div key={product._id} className="card" style={{ width: '18rem' }}>
                  <img className="card-img-top" src={product.images} alt={product.title} />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">Brand: {product.brand}</p>
                    <p className="card-text">Category: {product.category}</p>
                    <button value={product._id} onClick={() => handleAddToCart(product._id)}>
                      Add to Cart
                    </button>
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
