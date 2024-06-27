import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react'
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
import LoginModal from '../loginmodal/LoginModal';
import MessageIcon from '@mui/icons-material/Message';
import EmailIcon from '@mui/icons-material/Email';
import ReceiptIcon from '@mui/icons-material/Receipt';const mycolor="#6495ED"; 
const NavbarComp = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [countUnprocessedOrders, setCountUnprocessedOrders] = useState(0);

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

  useEffect(() => {
    if (currentUser) {
      const fetchUnprocessedOrders  = async () => {
        try {
          const response = await newRequest.get('/orders/count-unprocessed');
          console.log(response.data)
          setCountUnprocessedOrders(response.data.count);
        } catch (error) {
          console.error('Greška prilikom dobijanja broja nepročitanih narudžbi:', error);
        }
      };
      const fetchUnreadCount = async () => {
        try {
          const response = await newRequest.get('/conversations/unreadCount');
          setUnreadCount(response.data.unreadCount);
        } catch (error) {
          console.error('Greška prilikom dobijanja broja nepročitanih poruka:', error);
        }
      };
      fetchUnprocessedOrders();
      fetchUnreadCount();
    }
  }, []);
    return (
      <Navbar  expand="lg"  >
        <Container>
          <Navbar.Brand href="/">Klik.ba</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/services?search=">Servisi i usluge</Nav.Link>

              {!currentUser && <NavLink href="/register" >Registracija</NavLink>}
              {currentUser &&  <><NavLink href="/messages/" className='notification' ><span>Poruke</span> <EmailIcon /> {unreadCount > 0 && (
        <span className="badge">{unreadCount}</span>
      )}
</NavLink> {!currentUser.admin &&(<NavLink href="/orders/" className='notification2'><span>Narudžbe</span><ReceiptIcon/>{countUnprocessedOrders > 0 && (
        <span className="badge">{        <span className="badge2">{countUnprocessedOrders}</span>
}</span>
      )}</NavLink>)}</>}
           {currentUser?.isSeller && (
                         <><NavLink href="/myservices/">Moji servisi</NavLink><NavLink href="/addnew/">Dodaj novi servis</NavLink></> 
                         
                       )} 
            </Nav> 

          
            {!currentUser && (      <LoginModal  /> 

      )}

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
                        {currentUser.admin &&(<NavDropdown.Item href={'/adminDashboard/' }>Nadzorna ploča</NavDropdown.Item>)}

                         
                          <NavDropdown.Divider />
                     

                          <NavDropdown.Item href="" onClick={handleLogout}>
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