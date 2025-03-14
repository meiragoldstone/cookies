// This is the top navbar for any client page
// Author: R. Markowitz
// Last updated: Feb 2025

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Layout = () => {
    const lightLogo = require("../Images/iskaLogo.png")

    return (
    <>
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">
                      <img
              src={lightLogo}
              width="100"
              height="40"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
        </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link className = "m5" href="/">Home</Nav.Link>
            <Nav.Link className = "m5" href="/Portal">Client Portal</Nav.Link>
          </Nav>
      </Container>
    </Navbar>
    </>      
    );
}

export default Layout;