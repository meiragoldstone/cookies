import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Layout() {
    return (
        // <>
        //     <h1>Cookie Cookbook</h1>
        //     <p>
        //         This is the Layout page of the cookie cookbook website. 
        //     </p>
        //     <a href = "Home.jsx">Home</a>
        //     <a href = "About.jsx">About</a>
        // </>

    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="\">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav className="me-auto">
            <Nav.Link href="\">Home</Nav.Link>
            <Nav.Link href="\About">About</Nav.Link>
            <Nav.Link href="\Create">Create Recipe</Nav.Link>
            <Nav.Link href="\Retreive">Find a Recipe</Nav.Link>
          </Nav>
      </Container>
    </Navbar>
        
    );
}

export default Layout;