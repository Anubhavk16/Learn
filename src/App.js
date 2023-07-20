// import React from 'react'
// import { useDispatch, useSelector } from "react-redux"; 
// import { incNumber,decNumber,MultNumber,divNumber } from './actions/index';
// export const App = () => {
//   const myState= useSelector((state)=>state.changeTheNumber );
//   const myotherState= useSelector((state)=>state.multTheNumber);
//   const dispatch= useDispatch();
//   return (
//     <div>
//         <div className="container">
//           <h1>Increment/Decrement counter</h1>
//           <h4>using React and Redux</h4>
//           <div className="quantity">
//             <a class="quantity__minus" title="Decrement"
//             onClick={() => dispatch(decNumber())}><span>-</span></a>
//             <input name="quantity" type="type " class="quantity__input" value={myState} />
//             <a className="quantity__plus" title="Increment"
//             onClick={() => dispatch(incNumber(5))}><spam>+</spam></a>
//           </div>
//         </div>

//         <div className="container my-5" >
//           <h1>Multiply/Divide counter</h1>
//           <h4>using React and Redux</h4>
//           <div className="quantity">
//             <a class="quantity__minus" title="Decrement"
//             onClick={() => dispatch(divNumber())}><span>/</span></a>
//             <input name="quantity" type="type " class="quantity__input" value={myotherState} />
//             <a className="quantity__plus" title="Increment"
//             onClick={() => dispatch(MultNumber(5))}><spam>*</spam></a>
//           </div>
//       </div>
//       </div>
    

    
//   )
// }
// export default App;



// import React, {Component} from 'react';
// import Login from './components/login';
// import Input from './components/signup';
// import { Routes, Route } from "react-router-dom";

// import Layout from './components/layout';


// function App() {
//     return (
      
        
//           <Routes>
//             <Route exact path="/" element={<Layout/>}/>
//             <Route path="/signup" element={<Input/>}/>
//             <Route path="/login" element={<Login/>}/>
            
//           </Routes>
        
      
//     );
//   }
  
//   export default App;


// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import SignupForm from './components/signup';
// import LoginForm from './components/login';
// import UserList from './components/layout';

// const App = () => {
//   return (
//     <Router>
//       <div>
//         <Switch>
//           <Route exact path="/signup" component={SignupForm} />
//           <Route exact path="/login" component={LoginForm} />
//           <Route exact path="/user-list" component={UserList} />
//         </Switch>
//       </div>
//     </Router>
//   );
// };

// export default App;



// import './App.css'
import Home from "./components/home"
import Login from "./components/login"
import Signup from "./components/signup"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Updateuser from "./components/updateuser"
// import Pagination from "./components/pagination";


function App() {
  return (
    <div className="App">
      
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/update/:id" element={<Updateuser/>}/>
          {/* <Route path="/pagination" element={<Pagination/>}/> */}
        </Routes>
      
    </div>
  );
}

export default App;
