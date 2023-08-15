

import React from "react";
import SideNavigation from "./helpers/sideNavigation";
import Navbar from "./helpers/NavBar";
import './home.css';
import { Col, Container, Row } from "react-bootstrap";
import Searchbar from "./helpers/Searchbar";


function Home() {
  
      
  return (
    <>
    
    <Container fluid>
    <Row>
      <Col  style={{width:'10%'}}>
      <SideNavigation/>
       </Col>
       <Col xs lg="2" style={{width:'82%'}}>
       
    <Navbar/>
    <Searchbar/>
    </Col >
    </Row>
    
    </Container>  

    </>
  );
}

export default Home;




