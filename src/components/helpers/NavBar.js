

import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBell } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, setNotifications } from '../../store/slices/Categoryslices';
import socket from './socket';


function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.category.notifications);
  const selectedproducts = useSelector((state) => state.category.selectedproducts);
  const isAuthenticated = useSelector((state) => state.category.isAuthenticated);

  const [showNotificationPopup, setShowNotificationPopup] = useState(false);

  useEffect(() => {
    socket.on("notification", (notification) => {
      dispatch(setNotifications(notification)); 
    });
  
    return () => {
      socket.off("notification");
    };
  }, [dispatch]);

  async function Logout() {
    try {
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  async function Cart() {
    try {
      navigate('/cart');
    } catch (error) {
      console.log(error);
    }
  }


    async function Wishlist() {
        try {
            navigate('/wishlist');
        } catch (error) {
            console.log(error);
        }
    }
    async function Profile(){
        try{
            
            navigate('/profile')
        }catch(error){
            console.log(error)
        }
    }

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark" style={{ height: '100px', width: '100%' }}>
        <Container>
          <Navbar.Brand href="/home">Home</Navbar.Brand>
          <Nav className="">
            {isAuthenticated ? (
              <>
                <Button variant="primary" onClick={Cart}>
                             Cart<Badge bg="secondary">{selectedproducts.length}</Badge>
                             <span className="visually-hidden">unread messages</span>
                         </Button>
                         <Nav.Link onClick={Wishlist}>Wishlist <FontAwesomeIcon icon={faHeart} /></Nav.Link>
                         <Nav.Link onClick={Profile}>Profile</Nav.Link>
                <Nav.Link onClick={() => setShowNotificationPopup(true)}>Notifications <FontAwesomeIcon icon={faBell} /></Nav.Link>
                <Badge bg="info">{notifications.length}</Badge>
                <Nav.Link onClick={Logout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                                     <Button variant="primary" onClick={Cart}>Cart<Badge bg="secondary">{selectedproducts.length}</Badge>
                         <span className="visually-hidden">unread messages</span></Button>
                         <Nav.Link onClick={Wishlist}>Wishlist <FontAwesomeIcon icon={faHeart} /></Nav.Link>
                         <Nav.Link onClick={Profile}>Profile</Nav.Link>

                                 
                <Nav.Link onClick={() => setShowNotificationPopup(true)}>Notifications <FontAwesomeIcon icon={faBell} /></Nav.Link>
                <Badge bg="info">{notifications.length}</Badge>
                <Nav.Link href="/">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
      <Modal show={showNotificationPopup} onHide={() => setShowNotificationPopup(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Notifications</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="notifications">
    <Badge bg="info">{notifications.length}</Badge>
    <div className="notification-list">
      {notifications.map((notification, index) => (
        <div key={index} className="notification">
          {notification}
        </div>
      ))}
    </div>
  </div>
</Modal.Body>


        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNotificationPopup(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default NavBar;
