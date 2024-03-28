import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react'
import {Container,Nav, Navbar, NavDropdown, NavLink} from "react-bootstrap"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import "./NavComp.css"
import { FaSearch } from "react-icons/fa";
import newRequest from "../../utils/newRequest";

import { Link, useNavigate } from 'react-router-dom';

const mycolor="#6495ED"; 
const NavbarComp = () => {
  const [mySearch, setMySearch]= useState();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const handleLogout = async ()=>{
    try {
     await newRequest.post("/auth/logout")
     localStorage.setItem("currentUser", null);
     navigate("/")
    }
    catch(err){console.log(err)
    }
    
  }
    return (
      <Navbar expand="lg"  variant="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
       
              { !currentUser?.isSeller && <Nav.Link href="#link">Postani prodavaoc</Nav.Link>}
            </Nav> 
            {mySearch && <Nav> <Row >
          <Col xs={8}>
            <Form.Control style={{ backgroundColor: "white", color:"black"  }}
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
            />
          </Col>
          <Col xs={2}>
            <Button style={{ backgroundColor: mycolor, border:"0", color:"black" }} type="submit" onClick={()=> {
              setMySearch(!mySearch)
            }}>Submit</Button>
          </Col>
          <Col xs={2}></Col>
        </Row></Nav>}
          {!mySearch && <Button style={{ backgroundColor: mycolor, border:"0"  }} onClick={()=>{
            setMySearch(!mySearch);
          }}><FaSearch style={{color : "white" }} /></Button> }  

            {!currentUser && <NavLink href="/Login" >Pridruži se</NavLink>}
            {
              currentUser && (
                <div>
                  <Container>
                    <Row>
                      <Col>
                        <Image src={currentUser.img || "https://cbin.b-cdn.net/img/TH/The%20Queens%20Gambit_HR2QD_1000x913.jpeg"} width={30} height={30} roundedCircle />
                      </Col>
                      <Col>
                        <NavDropdown className="no-caret navDropdownWithMargin " title={currentUser?.username} id="basic-nav-dropdown">
                          {currentUser?.isSeller && (
                            <div>
                              <NavDropdown.Item href="/myservices">Servisi</NavDropdown.Item>
                              <NavDropdown.Item href="/addnew">
                                Dodaj nove servise
                              </NavDropdown.Item>
                            </div>)}
                          <NavDropdown.Item href="orders">Narudžbe</NavDropdown.Item>
                          <NavDropdown.Divider />
                          <NavDropdown.Item href="messages">
                            Poruke
                          </NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.4" onClick={handleLogout}>
                            Odjavi se
                          </NavDropdown.Item>
                        </NavDropdown>
                      </Col>
                    </Row>
                  </Container>
                </div>
              )
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

export default NavbarComp