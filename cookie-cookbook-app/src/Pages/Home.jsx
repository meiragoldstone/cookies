import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

const Home = () => {

    const image1 = require("../Images/cookie.jpg")

    return (
        <Container>
            <h1 className="text-center mt-5">Cookie Cookbook</h1>
            <Row className="justify-content-center">
                <Col xs={12} className="text-center">
                    <h2 className="mt-5">Find Your Favorite Recipes!</h2>
                    <Col><Image src = {image1} alt = "cookie.jpg" className = "img-fluid" width = "75%" height = "40%"/></Col>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
