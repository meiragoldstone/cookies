// This is a generic Page header
// Author: R. Markowitz
// Last Updated: Jan 13, 2025

import React from 'react';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import '../custom.scss'
import { CardBody } from 'react-bootstrap';

const PageTitle = (props) => {
    const {pageName} = props
    return(
        <Row className = 'text-center m-4'>
            <Card className = "mt-1 page-title" width = "100%">
                <CardBody>
                    <h2>{pageName}</h2>
                </CardBody>
            </Card>
        </Row>
    )
}

export default PageTitle;