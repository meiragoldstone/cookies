// This is the Current Loans page where the client can view a list of all current loans on his account.
// When click on any loan name, will display the additional data and files needed for that specific loan.
// Author: R. Markowitz
// Last updated: Feb 2025

import React, {useState, useEffect} from 'react';
import PortalNavBar from '../../Layout/PortalNavBar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoanTemplate from './LoanTemplate';
import Container from 'react-bootstrap/container';
import PageTitle from '../../Components/PageTitle';
import NewLoan from './NewLoan';
import SubmitButton from '../../Components/Button';
import Spinner from 'react-bootstrap/Spinner';

const Loans = (props) => {
    const [currentLoanList, setCurrentLoanList] = useState();
    const [clickedLoan, setClickedLoan] = useState("");
    const [clickedNewLoan, setClickedNewLoan] = useState("");
    const [dataLoaded, setDataLoaded] = useState(""); 
    const ClientID = props.ClientID;

    // When the clientID is first set and whenever a loan was clicked and then the user goes back to loan list,
    // fetch a list of loanIds from dynamodb and set currentLoanList
    useEffect(() => {
        if (!clickedNewLoan){
           setDataLoaded(""); 
        }
        console.log("Loading loan list...");
        const getLoanList = async () => {
            try {
                const response = await fetch(`https://f0ll5x1c4l.execute-api.us-east-1.amazonaws.com/getLoanList?ClientID=${encodeURIComponent(ClientID)}`);
                if (!response.ok) {
                    setCurrentLoanList([{"LoanID": "No Loans on File."}]);
                    console.log("Error loading loan list. Response not ok.");
                }else{
                    const data = await response.json();
                    if (data && !data.length == 0) {
                           setCurrentLoanList([
                            ...data
                        ]);                         
                    } else {
                        setCurrentLoanList([{"LoanID": "No Loans on File."}]);
                        console.log("Data empty.");
                    }
                }
            } catch (error) {
                setCurrentLoanList([{"LoanID": "Something went wrong when tring to access your current loans"}]);
            }
        }
        if (ClientID){
          getLoanList();  
        }
        
    }, [clickedNewLoan, ClientID])

    // When current Loan list finished loading and updating, set DataLoaded to true
    useEffect(() => {
        setDataLoaded("True");
    }, [currentLoanList])

    // When click new loan, set clickedNewLoan to true
    const handleNewLoanClick = () => {
        setClickedNewLoan("True");
    }

    // When click on a loan, set clicked loan to the loan object
    const handleLoanClick = (loan) => {
        setClickedLoan(loan);
    }

    return(
        <div>
        <PortalNavBar ClientID = {ClientID}/>
        <div>
            {clickedLoan &&(
                <Container>
                    <LoanTemplate 
                        key = {clickedLoan} 
                        LoanID = {clickedLoan.LoanID} 
                        ClientID = {ClientID}
                        LoanList = {currentLoanList}
                    />
                    <SubmitButton onClick = {() => {setClickedLoan("")}} text = "Return to List of Current Loans" /> 
                </Container>
                
            )}
        </div>
        
        <div>
          {!clickedLoan && !clickedNewLoan &&(
            <PageTitle pageName="Current Loans" />
          )}
        </div>

        <Row>
            {/* If current Loan List is loaded */}
                {!clickedLoan && !clickedNewLoan && currentLoanList &&(currentLoanList.map((loan, index) => (
                    <Row className='mx-3' key={index}>
                        <Col>
                        {loan.LoanID === "No Loans on File."?(
                            <Form.Label><strong>{loan.LoanID}</strong></Form.Label>
                        ):(
                            <Form.Label><a onClick={() => {handleLoanClick(loan)}}><strong>{loan.LoanID}</strong></a></Form.Label>
                        )}  
                        </Col>
                    </Row>
                )))}


            {/* If currentLoanList is not loaded */}
                {!clickedLoan && !clickedNewLoan && !currentLoanList &&(
                    <Row className='mx-3'>
                        <Col>
                        <Form.Label><strong>Loading...</strong></Form.Label>
                        </Col>
                    </Row>
                )}
                {(!dataLoaded) &&(
                    <Row className='m-2'>
                        <Col sm={1}>
                            <Spinner 
                                animation="border" 
                                role="status"
                                aria-hidden='true'
                            />
                        </Col>    
                        <Col>
                            <p className = "float-start"><strong>Loading...</strong></p>
                        </Col>
                    
                    
                    </Row>

                )}
 
        </Row>

        <Container className='m-5'>
            {!clickedLoan && !clickedNewLoan &&(
                <SubmitButton onClick= {handleNewLoanClick} text = "Apply for New Loan" />
            )}
            
        </Container>

        <Container>
            {clickedNewLoan && (
                <Container>
                    <NewLoan ClientID = {ClientID}/>
                    <SubmitButton onClick = {() => {setClickedNewLoan("")}} text = "Return to List of Current Loans" />
                </Container>
            )}
        </Container>
            
    </div>
        
    );
};

export default Loans;