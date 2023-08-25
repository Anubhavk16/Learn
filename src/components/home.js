
import React, { useEffect } from "react";
import SideNavigation from "./helpers/sideNavigation";
import Navbar from "./helpers/NavBar";
import Searchbar from "./helpers/Searchbar";
import ProductsList from "./helpers/ProductsList"; 
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../src/store/slices/Categoryslices"; 
import axios from "axios";

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.category.products);
  const selectedCategory = useSelector((state) => state.category.selectedCategoryId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/getproducts");
        dispatch(setProducts(response.data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [dispatch]);

  // Filter products based on the selected category
  const filteredProducts =
    selectedCategory === null
      ? products
      : products.filter((product) => product.categoryId === selectedCategory);

  return (
    <>
      <div style={{ display: "flex" ,height:'100%'}}>
        <SideNavigation />
        <div style={{ flex: 1 }}>
          <Navbar />
          <Searchbar />
          <ProductsList products={filteredProducts} /> 
        </div>
      </div>
    </>
  );
}

export default Home;
