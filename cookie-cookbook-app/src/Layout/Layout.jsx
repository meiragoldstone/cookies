import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Layout = () => {
    return (
    <>
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Cookie Cookbook</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link className = "m3" href="/">Home</Nav.Link>
            <Nav.Link className = "m3" href="/About">About</Nav.Link>
            <Nav.Link className = "m3" href="/Create">Create Recipe</Nav.Link>
            <Nav.Link className = "m3" href="/Retrieve">Find a Recipe</Nav.Link>
            <Nav.Link className = "m3" href="/Update">Update a Recipe</Nav.Link>
          </Nav>
      </Container>
    </Navbar>
    </>      
    );
}

export default Layout;