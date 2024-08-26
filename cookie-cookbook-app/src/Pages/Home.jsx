import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';


const Home = () => {

    const image1 = require("../Images/Cookie Logo Dark.BG.Trans.png")

    return (
        <Container fluid>
            <Row className="justify-content-center" bg = "light">
                <Col className="text-center mt-3 mb-5">
                <Image src = {image1} alt = "cookie.jpg" className = "img-fluid" />
                </Col>
            </Row>
            <Row>
                <Col className="text-center">
                    <Alert variant="dark">
                        <h1>The World's Favorite Cookie Recipes!</h1>
                    </Alert>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;