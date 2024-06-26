import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Alert from 'react-bootstrap/Alert';

const About = () => {
    return(
        <>
            <Alert variant="dark" className = "m-5 text-center">
                About Cookie Cookbook
            </Alert>
            <Accordion defaultActiveKey="0" className = "m-5">
                <Accordion.Item eventKey="0" className = "m-2">
                <Accordion.Header className = "text-center">About Our Website</Accordion.Header>
                <Accordion.Body>
                    Cookie Cookbook is the website to share your special cookie recipes, to update your top-quality recipes, or to view other delicious recipes! 
                    
                </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" className = "m-2 text-center">
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
        </>
    )
 };
export default About;