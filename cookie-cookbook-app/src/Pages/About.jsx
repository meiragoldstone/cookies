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
                    Cookie Cookbook is a website to share cookie recipes. 
                    Anyone can create a new recipe, update a recipe, or delete an existing recipe.
                </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" className = "m-2 text-center">
                <Accordion.Header className = "text-center">Behind the Scenes</Accordion.Header>
                <Accordion.Body>
                    Chana Bayla Katz, Daniella Shoob, and Rivka Benyowitz are senior Computer Science student in WITS.
                    Together, they created this website for their capstone project in WITS.
                </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
          //     <div>
    //         <h1>About Cookie Cookbook</h1>
    //         <p>
    //             Cookie Cookbook is a website to share cookie recipes. 
    //             Anyone can create a new recipe, update a recipe, or delete an existing recipe.
    //         </p>

    //         <h2>Behind the Scenes</h2>
    //         <p>
    //             Chana Bayla Katz, Daniella Shoob, and Rivka Benyowitz are senior Computer Science student in WITS.
    //             Together, they created this website for their capstone project in WITS.
    //         </p>

    //     </div>
    );
}
export default About;