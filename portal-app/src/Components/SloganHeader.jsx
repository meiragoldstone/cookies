import React from 'react';
import {Row, Col} from 'react-bootstrap';

const SloganHeader = () => {
    return (
    <Row>
        <Col className="text-center mx-auto mt-3">
        <div className='slogan-header'>
            <h1><strong>- Iska Mortgage -</strong></h1>
            <h2>Simple. Quick. Striaghtforward.</h2>
        </div>
    </Col>
    </Row> 
    )
}

export default SloganHeader;
