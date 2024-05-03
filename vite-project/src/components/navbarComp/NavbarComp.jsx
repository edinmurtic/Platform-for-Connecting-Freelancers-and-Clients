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
      <Navbar  expand="lg"  variant="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/">PronađiPosao</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/Services?search=">Servisi</Nav.Link>
             
              <NavDropdown title="Kategorije" id="basic-nav-dropdown">
                <NavDropdown.Item href="/Services?search=&category=Grafika i dizajn">Grafika i dizajn</NavDropdown.Item>
                <NavDropdown.Item href="/Services?search=&category=Softver inzinjering">
                  Softver inžinjering
                </NavDropdown.Item>
                
                <NavDropdown.Item href="/Services?search=&category=Konsalting">Konsalting</NavDropdown.Item>
                <NavDropdown.Item href="/Services?search=&category=Video i animacija">
Video i animacija                </NavDropdown.Item>
              </NavDropdown>

            </Nav> 
           
          

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
                        <NavDropdown.Item href={'/users/' + currentUser._id}>Moj profil</NavDropdown.Item>

                          {currentUser?.isSeller && (
                            <div>
                            {/* <Link to={`/service/${item._id}`}> */}

                              <NavDropdown.Item href="/addnew">
                                Dodaj nove servise
                              </NavDropdown.Item>
                              <NavDropdown.Item href="/admindashboard">
                              Nadzorna ploča 
                                </NavDropdown.Item>
                            </div>)}
                          <NavDropdown.Divider />
                          <NavDropdown.Item href="/orders/">Narudžbe</NavDropdown.Item>
                          <NavDropdown.Item href="/messages/">
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