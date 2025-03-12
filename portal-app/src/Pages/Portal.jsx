// This is the basic front page for the client's portal. No data can be inputed through this page.
// Author: Rivka Markowitz
// Last updated: Feb 2025

import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PortalNavBar from '../Layout/PortalNavBar';
import PageTitle from '../Components/PageTitle';
import SloganHeader from '../Components/SloganHeader';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Portal = (props) => {
  const ClientID = props.ClientID;
  const userName = props.userName;

  return (
    <Container fluid>
      <PortalNavBar ClientID = {ClientID}/>

      <Row className="text-center mt-3 mb-5">
          <Col >
              <SloganHeader />

              <PageTitle pageName = {`${userName}'s Portal`} />

              <Container className = 'mx-auto h-50' fluid>
                <Link className="link" to="Personal"><Button className = "portal-page-btn">Personal</Button></Link>
                <Link className="link" to="Financial"><Button className = "portal-page-btn">Financial</Button></Link>
                <Link className="link" to="Loans"><Button className = "portal-page-btn">Loans</Button></Link>
                <Link className="link" to="Review"><Button className = "portal-page-btn">Review</Button></Link>
              </Container>
          </Col>
      </Row>
  </Container>
  );
}

export default Portal;