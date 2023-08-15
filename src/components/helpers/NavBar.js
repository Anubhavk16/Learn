


import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'; 

function NavBar() {
    const navigate = useNavigate();
    const selectedproducts = useSelector((state) => state.category.selectedproducts);

    useEffect(() => {
        console.log(selectedproducts, "mmmm");
    }, [selectedproducts]);

    async function Logout() {
        try {
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

    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark" style={{ height: '100px', width: '100%' }}>
                <Container>
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Nav className="">
                        <Nav.Link href="">Profile</Nav.Link>
                        <Button variant="primary" onClick={Cart}>
                            Cart<Badge bg="secondary">{selectedproducts.length}</Badge>
                            <span className="visually-hidden">unread messages</span>
                        </Button>
                        
                        <Nav.Link onClick={Wishlist}>Wishlist
                            <FontAwesomeIcon icon={faHeart} />
                        </Nav.Link>
                        <Nav.Link onClick={Logout}>Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavBar;
