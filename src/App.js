
import Home from "./components/home"
import Login from "./components/login"
import Signup from "./components/signup"
import Cart from"./components/helpers/cart";
import Wishlist from "./components/helpers/wishlist";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Profile from "./components/helpers/profile"
import Products from "./components/helpers/products";


function App() {
  return (
    <>
    <div className="App">
      <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/Products" element={<Products/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/wishlist" element={<Wishlist/>}/>
          <Route path="/profile" element={<Profile/>}/>

          </Routes>
        </div>
    </>
  );
}

export default App;
