
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import './home.css';
// import Pagination from 'react-js-pagination';
// import { DebounceInput } from "react-debounce-input";

// function Home() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [users, setUsers] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(4);
//   const [totalPages, setTotalPages] = useState();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     if (!location.state || !location.state.id) {
//       navigate("/"); // Redirect the user to the login page if not logged in
//     } else {
//       getUsers();
//     }
//   }, [currentPage, searchQuery]);

//   async function getUsers() {
//     try {
//       const token = localStorage.getItem("token");
//       const role = localStorage.getItem("role");

//       if (!token || !role) {
//         navigate("/"); // Redirect the user to the login page if token or role is missing
//         return;
//       }

//       let response;
//       if (role === "superadmin") {
//         response = await axios.get(
//           `http://localhost:8000/getallusers`, {
//             headers: {
//               "Authorization": token,
//             },
//           }
//         );
//         console.log(response,"fffff");
//       } else {
//         response = await axios.get(
//           `http://localhost:8000/get`,
//           {
//             headers: {
//               "Authorization": token,
//             },
//           }
//         );
//       }
//       console.log(response.data,"usersssssssssssss");

//       setUsers(response.data);
//       setTotalPages(response.data.length);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async function deleteUser(userId) {
//     try {
//       await axios.delete(`http://localhost:8000/delete/${userId}`);
//       getUsers();
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async function update(userId) {
//     navigate(`/update/${userId}`);
//   }

//   async function handleSearch() {
//     setCurrentPage(1);
//     try {
//       const response = await axios.get(
//         `http://localhost:8000/paginatedUsers?page=1&limit=${pageSize}&search=${searchQuery}`
//       );
//       setSearchResults(response.data.result);
//       setTotalPages(response.data.pageCount);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async function logout() {
//     try {
//       localStorage.clear();
//       navigate('/')
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <div className="auth-wrapper" style={{ height: 'auto' }}>
//       <div className="auth-inner" style={{ width: 'auto' }}>
//         <h1>Welcome to the Home Page</h1>
//         <br />
//         <div className="search-container">
//           <DebounceInput
//             debounceTimeout={300}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <button onClick={handleSearch}>Search</button>
//         </div>
//         <br />
//         <table className="user-table">
//           <thead>
//             <tr>
//               <th>Email</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
            
//             {users && users.length > 0 ? (
//               (searchQuery !== '' ? searchResults : users).map((user) => (
//                 <tr key={user._id}>
//                   <td>{user.email}</td>
//                   <td>
//                     <button onClick={() => update(user._id)}>Update</button>
//                     <button onClick={() => deleteUser(user._id)}>Delete</button>
//                     <button onClick={() => logout(user._id)}>Logout</button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="3">No users found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//         <div className="row">
//           <div className="col"></div>
//           {searchQuery === '' && Array.isArray(users) && users.length > 0 ? (
//             <Pagination
//               activePage={currentPage}
//               itemsCountPerPage={pageSize}
//               totalItemsCount={totalPages * pageSize}
//               pageRangeDisplayed={5}
//               onChange={setCurrentPage}
//               pagination={false}
//             />
//           ) : (
//             <div></div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;

import React from "react";
import SideNavigation from "./helpers/sideNavigation";
import Navbar from "./helpers/NavBar";
import './home.css';
import { Col, Container, Row } from "react-bootstrap";


function Home() {
  return (
    <>
    <Container fluid>
    <Row>
      <Col  style={{width:'10%'}}>
      <SideNavigation/>
       </Col>
       {/* <Col xs lg="2" style={{width:'82%'}}>
    <Navbar/>
    </Col > */}
    </Row>
    </Container>  
     
    </>
  );
}

export default Home;




