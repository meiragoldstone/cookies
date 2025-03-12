// This is the second level navbar for any client portal page
// Author: Rivka Markowitz
// Last updated: Feb 2025

import { ToastHeader} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const PortalNavBar = () => { 

    return (
    <>
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="/">
                      <ToastHeader><strong>Client Portal</strong></ToastHeader>
        </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link className = "m5" href="/Portal/Personal">Personal</Nav.Link>
            <Nav.Link className = "m5" href="/Portal/Financial">Financial</Nav.Link>
            <Nav.Link className = "m5" href="/Portal/Loans">Loans</Nav.Link>
            <Nav.Link className = "m5" href="/Portal/Review">Review</Nav.Link>
          </Nav>
      </Container>
    </Navbar>
    </>      
    );
}

export default PortalNavBar;