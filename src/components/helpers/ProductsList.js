


import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import "./produtlist.css"

function ProductsList() {
  const products = useSelector((state) => state.category.products);

  const groupedProducts = {};
  products.forEach((product) => {
    const { categoryId } = product;
    if (!groupedProducts[categoryId]) {
      groupedProducts[categoryId] = [];
    }
    groupedProducts[categoryId].push(product);
  });

  return (
    <div className="product-container">
      {Object.keys(groupedProducts).map((categoryId) => (
        <div key={categoryId} className="category-row">
          <h2>Shop by: {groupedProducts[categoryId][0].category}</h2>
          <div className="product-cards">
            {groupedProducts[categoryId].map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductsList;



