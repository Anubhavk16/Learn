

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './home.css';
import Pagination from 'react-js-pagination'; 
import { DebounceInput } from "react-debounce-input";

function Home() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [totalPages, setTotalPages] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getUsers();
  }, [currentPage, searchQuery]);

  async function getUsers() {
    try {
      const response = await axios.get(
        `http://localhost:8000/paginatedUsers?page=${currentPage}&limit=${pageSize}&search=${searchQuery}`
      );
      setUsers(response.data.result);
      setTotalPages(response.data.pageCount);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteUser(userId) {
    try {
      await axios.delete(`http://localhost:8000/delete/${userId}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  }

  async function update(userId) {
    navigate(`/update/${userId}`);
  }

  async function handleSearch() {
    setCurrentPage(1); 
    try {
      const response = await axios.get(
        `http://localhost:8000/paginatedUsers?page=1&limit=${pageSize}&search=${searchQuery}`
      );
      setSearchResults(response.data.result);
      setTotalPages(response.data.pageCount);
    } catch (error) {
      console.log(error);
    }
  }

  function handlePageChange(selectedPage) {
    setCurrentPage(selectedPage);
  }

  return (
    <div className="auth-wrapper" style={{ height: 'auto' }}>
      <div className="auth-inner" style={{ width: 'auto' }}>
        <h1>Welcome to the Home Page</h1>
        <br />
        <div className="search-container">
          <DebounceInput
            debounceTimeout={300}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* <input
            type="text"
            placeholder="Search by email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          /> */}
          <button onClick={handleSearch}>Search</button>
        </div>
        <br />
        <table className="user-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {(searchQuery !== '' ? searchResults : users).map((user) => (
              <tr key={user._id}>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                  <button onClick={() => update(user._id)}>Update</button>
                  <button onClick={() => deleteUser(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="row">
          <div className="col"></div>
          {searchQuery === '' && users.length > 0 ? ( 
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={pageSize}
              totalItemsCount={totalPages * pageSize}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
              pagination={false}
            />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
