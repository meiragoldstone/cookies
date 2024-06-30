import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

const About = () => {

    const image1 = require("./Cookie-Variations.jpg")

    return(
        <>
            <Container>
                <Row className = "m3">
                    <Col><Image src = {image1} alt = "Cookie-Variations.jpg" className = "img-fluid"/></Col>
                </Row>

                <Row className = "m-5 text-center">
                    <Col><h1>About Us</h1></Col>
                </Row>

                <Row>
                    <Col>
                        <Accordion className = "m-5">
                            <Accordion.Item eventKey="0" className = "m-2">
                            <Accordion.Header className = "text-center">About Our Website</Accordion.Header>
                            <Accordion.Body>
                                Cookie Cookbook is the website to share your special cookie recipes, to update your top-quality recipes, or to view other delicious recipes! 
                                
                            </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="1" className = "m-2 text-center">
                            <Accordion.Header className = "text-center">How to Create a Recipe</Accordion.Header>
                            <Accordion.Body>
                                <Container>
                                    <Row className = "m-3">
                                        <Col><strong>To create a new delicious recipe, just follow these four simple steps.</strong></Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <ol className = "list-unstyled">
                                                <li className="d-flex align-items-start mb-1"><span className="mr-2">1.</span>Click the "Create Recipe" option on the site header.</li>
                                                <li className="d-flex align-items-start mb-1"><span className="mr-2">2.</span>Choose an innovative name for your new cookie.</li>
                                                <li className="d-flex align-items-start mb-1"><span className="mr-2">3.</span>Write up the list of ingredients and directions to make your cookie.</li>
                                                <li className="d-flex align-items-start mb-1"><span className="mr-2">4.</span>Save your scrumptious recipe by clicking the "Save Recipe" button.</li>
                                            </ol>
                                        </Col>
                                    </Row>
                                    <Row className = "m-3">
                                        <Col><strong>That's it! After following these steps, your special recipe will be available for all to try and taste!</strong></Col>
                                    </Row>
                                </Container>    
                            </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="2" className = "m-2 text-center">
                            <Accordion.Header className = "text-center">How to Find a Recipe</Accordion.Header>
                            <Accordion.Body>
                                <Container>
                                    <Row className = "m-3">
                                        <Col><strong>To find your favorite cookie recipe, just follow these three simple steps.</strong></Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <ol className = "list-unstyled">
                                                <li className="d-flex align-items-start mb-1"><span className="mr-2">1.</span>Click the "Find a Recipe" option on the site header.</li>
                                                <li className="d-flex align-items-start mb-1"><span className="mr-2">2.</span>Check if the recipe exists by typing the recipe name in the text area under the instructions "Type a list name to see if it exists:".</li>
                                                <li className="d-flex align-items-start mb-1"><span className="mr-2">3.</span>Choose your desired recipe from the dropdown list at the top of the page.</li>
                                            </ol>
                                        </Col>
                                    </Row>
                                    <Row className = "m-3">
                                        <Col><strong>That's it! After following these steps, your delectable cookie recipe will appear at the bottom of the page.</strong></Col>
                                    </Row>
                                </Container>
                            </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="3" className = "m-2 text-center">
                            <Accordion.Header className = "text-center">How to Update a Recipe</Accordion.Header>
                            <Accordion.Body>
                                <Container>
                                    <Row className = "m-3">
                                        <Col><strong>To update a cookie recipe, just follow these six simple steps.</strong></Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <ol className = "list-unstyled">
                                                <li className="d-flex align-items-start mb-1"><span className="mr-2">1.</span>Click the "Update a Recipe" option on the site header.</li>
                                                <li className="d-flex align-items-start mb-1"><span className="mr-2">2.</span>Choose your desired recipe from the dropdown list at the top of the page.</li>
                                                <li className="d-flex align-items-start mb-1"><span className="mr-2">3.</span>Review the recipe that is displayed on the left side of the page.</li>
                                                <li className="d-flex align-items-start mb-1"><span className="mr-2">4.</span>Type any additions into the text area on the right side of the page.</li>
                                                <li className="d-flex align-items-start mb-1"><span className="mr-2">5.</span>Click "Preview" to preview your changes.</li>
                                                <li className="d-flex align-items-start mb-1"><span className="mr-2">6.</span>Click "Save Changes" to save your changes.</li>
                                            </ol>
                                        </Col>
                                    </Row>
                                    <Row className = "m-3">
                                        <Col><strong>That's it! After following these steps, the changes for your mouthwatering cookie recipe will be saved.</strong></Col>
                                    </Row>
                                </Container>
                            </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="4" className = "m-2 text-center">
                            <Accordion.Header className = "text-center">Behind the Scenes</Accordion.Header>
                            <Accordion.Body>

                                <strong>Daniella Shoob</strong><br />

                                Meet Daniella, our Cookie Master. 
                                With over 15 years of baking experience and an unwavering passion for creating the perfect cookie,
                                Daniella ensures every batch meets our high standards. 
                                When she's not busy in the kitchen, 
                                Daniella loves sharing her baking wisdom on our blog. 
                                Her secret ingredient? 
                                A whole lot of love!<br /><br />

                                <strong>Rivka Benyowitz</strong><br />

                                Say hello to Rivka, our Tech Savvy Baker. 
                                Rivka keeps our website running smoothly 
                                and makes sure your cookie orders are processed without a hitch. 
                                With a background in web development and a sweet tooth,
                                she bridges the gap between technology and baking. In her spare time, 
                                Rivka loves experimenting with new cookie flavors and 
                                incorporating tech gadgets into her kitchen.<br /><br />

                                <strong>Chana Bayla Katz</strong><br />

                                Introducing Chana Bayla, our Creative Cookie Enthusiast. 
                                Chana Bayla's eye for design and love for cookies
                                makes her the perfect fit for crafting our brand's look and feel. 
                                From designing beautiful packaging to creating mouth-watering photos, 
                                Chana Bayla's creativity brings our cookies to life. 
                                When she's not working on new designs, 
                                Chana Bayla enjoys hosting cookie decorating parties
                                and sharing her creative ideas with our community.
                                
                            </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                </Row>
            </Container>
            

            
        </>
    )
 };
export default About;