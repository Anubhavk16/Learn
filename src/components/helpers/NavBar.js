import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate();
    async function Logout() {
        
            try {
              
              navigate('/')
            } catch (error) {
              console.log(error);
            }
        }
  return (
    <div>
    <Navbar bg="dark" data-bs-theme="dark" style={{height:'100px', width:'100%'}}>
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="">
            <Nav.Link href="">Profile</Nav.Link>
            <Nav.Link href="">Cart</Nav.Link>
            <Nav.Link onClick={Logout}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      </div>
  );
}

export default NavBar;