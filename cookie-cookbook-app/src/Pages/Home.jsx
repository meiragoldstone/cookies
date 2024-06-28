import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

const Home = () => {
    return (
        <Container>
            <h1 className="text-center mt-5">Cookie Cookbook</h1>
            <p className="lead text-center">
                This is the home page of the cookie cookbook website.
            </p>
            <Row className="justify-content-center">
                <Col xs={12} className="text-center">
                    <h2 className="mt-5">Find Your Favorite Recipes!</h2>
                    <Image src="/cookie.jpg" fluid alt="cookie" style={{ maxWidth: '100%', height: 'auto' }} />
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
