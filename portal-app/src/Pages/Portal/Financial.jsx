// This is the page to input general financial information within the client's portal.
// Author: Rivka Markowitz
// Last updated: March 2025

import React, {useState, useEffect} from 'react';
import {Form, Row, Alert, Container} from 'react-bootstrap';
import PageTitle from '../../Components/PageTitle';
import SubmitButton from '../../Components/Button';
import PortalNavBar from '../../Layout/PortalNavBar';
import { financialInfo } from '../../Data/RequiredClientData';
import { validateField } from '../../Data/Regex';

const Financial = (props) => {
    const ClientID = props.ClientID;
    const [requFinancialInfo, setRequFinancialInfo] = useState(financialInfo.map((field) => ({
        ...field, value: ""
      })))
    const [dbFinancialInfo, setDBFinancialInfo] = useState();
    const [clickedSave, setClickedSave] = useState(false);
    const [saveBtnText, setSaveBtnText] =useState("Save");
    const [loadingFinancialData, setLoadingFinancialData] = useState(true);
    const [readyForDB, setReadyForDB] = useState(false);

    // Fetch Financial Info from database and set the module variables
    useEffect(() => {
        const getFinancialInfo = async () => {
            setLoadingFinancialData(true);
            try {
                const response = await fetch(`https://f0ll5x1c4l.execute-api.us-east-1.amazonaws.com/getGeneralInfo`, {
                    "method": "POST",
                    "body": JSON.stringify({
                        "ClientID": ClientID
                    })
                });
                if (!response.ok) {
                    console.log("Error loading Financial info. Response not ok.");
                }else{
                    const data = await response.json();
                    
                    if (data && !data == []) {
                            setDBFinancialInfo({...data["Financial"]});

                            // set requFinancialInfo according to the loan type. This variable is for creating the form fields
                            let info = [...requFinancialInfo];
                           
                            info = info.map((field) => ({
                            ...field, value: data.Financial[field.fieldName]? data.Financial[field.fieldName]: ""
                            }))
                    
                            setRequFinancialInfo([...info]);

                } else {
                    console.log("Data empty.");
                }
                }
            } catch (error) {
                console.error("Something went wrong when trying to load the clients financial data. Error: ", error)
            }
        }
        if (ClientID){
            getFinancialInfo();
        }
        
    }, [clickedSave, ClientID]);

    // update loadingFinancialData when the data is loaded and the variables are set
    useEffect(() => {
        setLoadingFinancialData(false)
    }, [dbFinancialInfo])

    // When text is entered into any of the form control boxes, save the inputed value to requFinancialInfo[fieldName][value]
    // This will also make the inputed value appear in the form contol
    const handleTextInfoChange = (index, event) => {
        setClickedSave(false);

        const updatedRequFinancialInfo = [...requFinancialInfo];
      
        // Update the specific item at the given index
        updatedRequFinancialInfo[index]= {
          ...updatedRequFinancialInfo[index],
          value: event.target.value,
        };
      
        setRequFinancialInfo(updatedRequFinancialInfo);
    };

    
    // When the user clicks out of a text box, the text will be validated
    const onBlur = ((item, index) => {
        let isValid = true;
        if (item.value !== ""){
        isValid = validateField(item)
        }      
        requFinancialInfo[index] = {...requFinancialInfo[index],
                    "isValid":isValid,
                    "value": item.value.trim()}
    });

    // When Save is clicked, set the button text to saving..., 
    // save all the inputed info in the proper format into dbfinancialinfo,
    // set readyForDB to true to trigger updating the info in db
    const handleClickSave = async () => {
      setSaveBtnText("Saving...");

      // Get all the values from financialRequ data lists and save them as info object with fieldName:value
      let tempList = {};
      requFinancialInfo.forEach((field, index) => {
        if ((field.fieldType === "text" && validateField(field)) ||field.fieldType !== "text"){
            requFinancialInfo[index] = {...requFinancialInfo[index], isValid: true}
            Object.assign(tempList, {[field.fieldName]: field.value})
        }else{
            requFinancialInfo[index] = {...requFinancialInfo[index], isValid: false}
        }});
      setDBFinancialInfo({...tempList});
      setReadyForDB(true);
    };

    // When readyForDB is true, update the info in dynamodb, when finished, set readyForDB back to false
    useEffect (() => {
      const saveToDB = async () => {
      if (readyForDB){
        // Save the updated data to the database
        const params = {
          method: "POST",
          body: JSON.stringify({
              "ClientID": ClientID,
              "updateCategory": "Financial",
              "updatedInfo": dbFinancialInfo,
          })
        }

        const updateUrl = "https://f0ll5x1c4l.execute-api.us-east-1.amazonaws.com/updateGeneralInfo";

        try {
          const response = await fetch(updateUrl, params);

          if (response.ok) {
              alert("Your financial info was successfully updated!");
              setClickedSave(true);
              setSaveBtnText("Save");

          } else {
              setSaveBtnText("Save");
              alert('In If...Else Failed to save loan info');
              console.error('Error:', response.statusText);
          }
        } catch (error) {
          setSaveBtnText("Save");
          alert('In Catch...Failed to save loan info. Error: ', error);
          console.error('Error:', error);
          }
      }}

      saveToDB()
      setReadyForDB(false);
    }, [readyForDB])
      
    return(
        <> 
            <PortalNavBar ClientID = {ClientID} />
            
            <PageTitle pageName = "Financial Information" />

            {loadingFinancialData &&
            <Container className = 'mx-3'>
                <Alert height = '50%' variant = 'info'>
                  Loading Financial Data...<br />
                  Do not try to edit any fields while data is loading!
                </Alert>
            </Container>
            }

            {!loadingFinancialData &&
            <Row className = 'm-1 mx-6'>
                <Form className='m-3'>
                    {requFinancialInfo.map((item, index) => (
                        <div key = {index}>
                            <Form.Group key = {index} type="text"> 
                                <Form.Label>{item.fieldName}: </Form.Label>
                                <Form.Control 
                                id={item.fieldName} 
                                value= {item.value} 
                                onChange={(event) => {handleTextInfoChange(index, event)}}
                                isInvalid = {"isValid" in item?!item.isValid:false}
                                onBlur = {() => onBlur(item, index)}
                                />
                                <Form.Control.Feedback type = "invalid">{item.invalidMsg}</Form.Control.Feedback>
                            </Form.Group>
                        </div>
                    ))}
              
                    <SubmitButton text = {saveBtnText} onClick = {handleClickSave} />

                </Form>
            </Row>  
            } 
        </>
        
    );
};

export default Financial;