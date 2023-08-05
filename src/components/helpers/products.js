




// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function Products() {
//   const [products, setProducts] = useState([]);
//   const [selectedCategoryId, setSelectedCategoryId] = useState(null);

//   useEffect(() => {
//     axios
//       .get("http://localhost:8000/getproducts")
//       .then((response) => setProducts(response.data))
//       .catch((error) => console.error(error));

//     // Check if category ID is stored in local storage
//     const storedCategoryId = localStorage.getItem("selectedCategoryId");
//     setSelectedCategoryId(storedCategoryId);
//   }, []);

//   const filteredProducts = selectedCategoryId
//     ? products.filter((product) => product.categoryId === selectedCategoryId)
//     : products;

//   return (
//     <>
//       <h1>Products</h1>
//       <div className="product-container">
//         {filteredProducts.map((product) => (
//           <div key={product._id} className="card" style={{ width: "18rem" }}>
//                        <img className="card-img-top" src={product.images} alt={product.title} />
//                        <div className="card-body">
//                          <h5 className="card-title">{product.title}</h5>
//                          <p className="card-text">{product.description}</p>
//                          <p className="card-text">Brand: {product.brand}</p>
//                          <p className="card-text">Category: {product.category}</p>
                        
//                          <a href="#" className="btn btn-primary">
//                            Go to cart
//                          </a>
//                        </div>
//                      </div>
//         ))}
//       </div>
//     </>
//   );
// }

// export default Products;

import React, { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/getproducts");
        setProducts(response.data);

        // Check if category ID is stored in local storage
        const storedCategoryId = localStorage.getItem("selectedCategoryId");
        setSelectedCategoryId(storedCategoryId);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = selectedCategoryId
    ? products.filter((product) => product.categoryId === selectedCategoryId)
    : products;

  return (
    <>
      <h1>Products</h1>
      <div className="product-container">
        {filteredProducts.map((product) => (
          <div key={product._id} className="card" style={{ width: "18rem" }}>
            <img className="card-img-top" src={product.images} alt={product.title} />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">Brand: {product.brand}</p>
              <p className="card-text">Category: {product.category}</p>

              <a href="#" className="btn btn-primary">
                Go to cart
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Products;
