// Component to create a new loan - User can choose a name and loan type and create a new loan in dynamodb
// Author: Rivka Markowitz
// Last updated: Feb 2025

import React, {useState, useEffect} from "react";
import PageTitle from "../../Components/PageTitle";
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import SubmitButton from "../../Components/Button";
import { Alert } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';
import { refiInfo, allLoanInfo, fixAndFlipFiles, purchaseFiles, refiFiles } from "../../Data/RequiredLoanData";


const NewLoan = (props) => {
    const [newLoanInfoList, setLoanInfoList] = useState([
        {fieldName: "Loan Name (Property Address)", fieldType: "Text", value: ""},
        {feildName: "Loan Type", feildType: "Radio", options: ["Refinance", "Purchase", "Fix and Flip"], value: ""}
    ]);
    const [newLoan, setNewLoan] = useState({name: "", type: ""});
    const [sendSuccessAlert, setSendSuccessAlert] = useState();
    const [loanSpecInfoList, setLoanSpecInfoList] = useState({"Loan Info": {}, "Loan Files": {}});
    const ClientID = props.ClientID;
    const [applyBtnText, setApplyBtnText] = useState("Apply");

    // when any field in the form changes, save those changes to newloanInfoList.value
    const handleFormChange = (index, event, option = "") => {
        // Create a new array with copied values from the original array
        const updatedNewLoanInfo = [...newLoanInfoList];
        
        // if option is not null (the field was loan type), set value to option.
        // If option is null (the field was name) set value to event.target.value
        let value = "";
        
        if(option !== "" ){
            value = option

            // set the list of required info according to the chosen loan type     
            let tempLoanInfoList = {}
            let tempLoanFileList = {}         
            if (value === "Refinance"){
                refiInfo.forEach((field) => Object.assign(tempLoanInfoList, {[field.fieldName]: ""}));
                refiFiles.forEach((field) => Object.assign(tempLoanFileList, {[field.fileName]: []}));
            }else if (value === "Purchase"){
                allLoanInfo.forEach((field) => Object.assign(tempLoanInfoList, {[field.fieldName]: ""}));
                purchaseFiles.forEach((field) => Object.assign(tempLoanFileList, {[field.fileName]: []})); 
            }else if (value === "Fix and Flip"){
                allLoanInfo.forEach((field) => Object.assign(tempLoanInfoList, {[field.fieldName]: ""}));
                fixAndFlipFiles.forEach((field) => Object.assign(tempLoanFileList, {[field.fileName]: []}));
            }else{
                console.log("ERROR! Loan type not supported.");
                refiInfo.forEach((field) => Object.assign(tempLoanInfoList, {[field.fieldName]: ""}));
                refiFiles.forEach((field) => Object.assign(tempLoanFileList, {[field.fileName]: []}));
            }
            setLoanSpecInfoList({"Loan Info": tempLoanInfoList, "Loan Files": tempLoanFileList })
        }else{
            value = event.target.value;
        };


        // Update the specific item at the given index
        updatedNewLoanInfo[index] = {
            ...updatedNewLoanInfo[index],
            value: value,
        };
        
        // Set the state with the updated array
        setLoanInfoList(updatedNewLoanInfo);
    };

    // when newLoanInfoList changes, update newLoan
    useEffect(() => {
        const updatedNewLoan = {name: newLoanInfoList[0].value.trim(), type: newLoanInfoList[1].value};
        setNewLoan(updatedNewLoan);  
    }, [newLoanInfoList])


    // When create loan is clicked, save the new loan to dynamodb
    const createNewLoan = async () => {
        if (newLoan.name === "" || newLoan.type === ""){
            alert("You must enter a name and choose a type in order to apply for a new loan.")
        }else{
            setApplyBtnText("Applying...");
            let creationDate = Date();
            let createLoanBody = {...loanSpecInfoList,
                                "LoanID": newLoanInfoList[0].value, 
                                "LoanType": newLoanInfoList[1].value,
                                "ClientID": ClientID, 
                                "creationDate": creationDate
                                
                            };

            try {
                const response = await fetch(' https://f0ll5x1c4l.execute-api.us-east-1.amazonaws.com/createLoan', {
                    method: 'POST',                
                    body: JSON.stringify(createLoanBody),
                });
                
                console.log("Response.ok", response.ok)

                if (response.ok) {
                    const data = JSON.stringify(response);
                    setApplyBtnText("Apply");
                    alert('Loan created successfully!');

                    // Clear form fields after successful submission
                    newLoanInfoList.map((field, index) => {
                        newLoanInfoList[index] = {
                            ...newLoanInfoList[index],
                            value: ""
                        }
                    });
                    creationDate = "";
                    createLoanBody = {};
                    setLoanSpecInfoList([]);

                } else {
                    const data = await response.json()
                    setApplyBtnText("Apply");
                    alert('Failed to create loan. ' + data);
                    console.error('In If...Else, Error:', data);
                }
                } catch (error) {
                    setApplyBtnText("Apply");
                    alert('In Catch...Failed to create loan. Error: ', error);
                    console.error('Error:', error);
                }
        }
        
    };

    return (
        <>
            <PageTitle pageName = "Apply for New Loan" />

            <Row className="mb-5">
                <Form>
                {newLoanInfoList.map((item, index) => (
                    <div key={index}>
                        <Form.Label>{item.fieldName}</Form.Label>
                        {item.fieldType === "Text" ? (
                            <Form.Control
                                key = {index}
                                type="text"
                                value={item.value}
                                onChange={(event) => {handleFormChange(index, event)}}
                            />
                        ) : (
                            // If the item.fieldType is "Radio"
                            item.options.map((option, optionIndex) => (
                                <Form.Check
                                    key={optionIndex}
                                    type="radio"
                                    name="Loan Type"
                                    id={`${item.fieldName}-${option}`}
                                    label={option}
                                    value={option}
                                    checked={newLoanInfoList[index]?.value === option} 
                                    onChange={(event) => {handleFormChange(index, event, option)}}
                                />
                            ))
                        )}
                    </div>
                ))}   

                <SubmitButton onClick = {createNewLoan} text = {applyBtnText} />
                </Form>

                {sendSuccessAlert && (
                    <Alert className="m-2" variant = "success">Your loan was created.</Alert>
                )}
            </Row>
        </>
    )
}

export default NewLoan;