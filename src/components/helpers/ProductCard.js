import React from "react";

function ProductCard({ product }) {


  return (
    <div key={product._id} className="card" style={{ width: "12rem" }}>
      <img className="card-img-top" src={product.images[0]} alt={product.title} />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">{product.description}</p>

        <div className="App">
        </div>
        
      </div>
    </div>
  );
}

export default ProductCard;
