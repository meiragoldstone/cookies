// This is the page where the client can enter personal data such as name and number to be saved to the client's portal.
// Author: R. Markowitz
// Last updated: March 2025

import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import PageTitle from '../../Components/PageTitle';
import SubmitButton from '../../Components/Button';
import { Container, Row, Col, Alert, Image, Stack } from 'react-bootstrap';
import { personalInfo } from '../../Data/RequiredClientData';
import { MAX_FILE_SIZE } from '../../Data/MaxData';
import PortalNavBar from '../../Layout/PortalNavBar';
import Spinner from 'react-bootstrap/Spinner';
import { validateField } from '../../Data/Regex';

const Personal = (props) => {
    const viewIcon = require("../../Images/viewSmall.png")
    const deleteIcon = require("../../Images/deleteSmall.png")
    const [loadingPersonalData, setLoadingPersonalData] = useState(true);
    const [clickedSave, setClickedSave] = useState (false);
    const [saveBtnText, setSaveBtnText] = useState("Save");
    const [readyForDB, setReadyForDB] = useState(false);
    const [isSavingFile, setIsSavingFile] = useState(false); // Is true while file is being saved to database
    const [isUploadingFile, setIsUploadingFile] = useState(false); // Is true throughout the entire upload process (to set loading spinner)
    const [dbPersonalInfo, setDBPersonalInfo] = useState();
    const [requPersonalInfo, setRequPersonalInfo] = useState(personalInfo.map((field) => ({
        ...field, value: ""
      })));
    const [previewFileCache, setPreviewFileCache] = useState([]);
    const ClientID = props.ClientID;

    // When the page is loaded and ClientId is set, Fetch Personal Info from database and set the module variables
    useEffect(() => {
        const getPersonalInfo = async () => {
            setLoadingPersonalData(true);
            try {
                const response = await fetch(`https://f0ll5x1c4l.execute-api.us-east-1.amazonaws.com/getGeneralInfo`, {
                    "method": "POST",
                    "body": JSON.stringify({
                        "ClientID": ClientID
                    })
                });
                if (!response.ok) {
                    console.log("Error loading Personal info. Response not ok.");
                }else{
                    const data = await response.json();
                    if (data && !data == []) {
                            setDBPersonalInfo({...data["Personal"]});

                            let info = [...requPersonalInfo];
                            
                            info = info.map((field) => ({
                            ...field,
                            value: data.Personal[field.fieldName]? data.Personal[field.fieldName]: "",
                            }))
                    
                            setRequPersonalInfo([...info]);

                } else {
                    console.log("Data empty.");
                }
                }
            } catch (error) {
                console.log("Something went wrong when trying to load the clients personal data. Error: ", error)
            }
        }
        if (ClientID){
          getPersonalInfo();  
        }
        
    }, [ClientID]);

    //update loadingPersonalData when all the data is loaded and the variables are set
    useEffect(() => {
        setLoadingPersonalData(false);
    }, [dbPersonalInfo])

    // When text is entered into any of the form control boxes, save the inputed value to requFinancialInfo[fieldName][value]
    // This will also make the inputed value appear in the form contol
    const handleInfoChange = async (index, event) => {
        const updatedRequPersonalInfo = [...requPersonalInfo];
      
        // Update the specific item at the given index
        // If the updated value is a file
        if (updatedRequPersonalInfo[index].fieldType === "file"){
            const uploadedFile = event.target.files[0];
            if (uploadedFile.size <= MAX_FILE_SIZE){
                setIsUploadingFile(true);
                const filePath = ClientID + "/General_" + updatedRequPersonalInfo[index].fieldName + "_" + uploadedFile.name;
                event.preventDefault();

                const handleUploadToS3 = async (file, urlData) => {
                    const formData = new FormData();
                    Object.keys(urlData.fields).forEach(key => {
                    formData.append(key, urlData.fields[key]);
                    });
                    
                    formData.append('file', file);
                
                    console.log("fetching urlData.url...")
                    const response = await fetch(urlData.url, {
                    method: 'POST',
                    body: formData,
                    });
                
                    return response.ok;
                }
            
                try {
                    // Get the pre-signed URL from the Lambda function
                    const presignedResponse = await fetch('https://f0ll5x1c4l.execute-api.us-east-1.amazonaws.com/saveFileToS3', {
                        "method": "POST",
                        "body": JSON.stringify({
                            "filePath": filePath
                        })
                    });
                    if (presignedResponse.ok){
                        const presignedData = await presignedResponse.json();
                
                        const isUploaded = await handleUploadToS3(uploadedFile, presignedData);
                        
                        

                        if (isUploaded) {
                            console.log("File uploaded successfully to S3!")
                            updatedRequPersonalInfo[index]= {
                                ...updatedRequPersonalInfo[index],
                                value: filePath, 
                                file: uploadedFile
                            };
                
                            // Save the uploaded file path in dynamodb
                            const updateFieldName = updatedRequPersonalInfo[index].fieldName
                            setDBPersonalInfo({...dbPersonalInfo, 
                            [updateFieldName] : filePath
                                })
                            setIsSavingFile(true);

                            // Put the file in the preview file cache
                            const url = URL.createObjectURL(uploadedFile);
                            setPreviewFileCache([...previewFileCache, {url, name:filePath}])
                        } else {
                            alert('Failed to upload file to S3.');
                            setIsUploadingFile(false);
                        }
                    }else{
                        const error = await presignedResponse.json()
                        alert(error)
                        console.log(("Error uploading File.", error))
                        setIsUploadingFile(false);

                    }  
                }catch (error){
                    console.error(error)
                    alert("Something went wrong in handleSumbit, ", error);
                    setIsUploadingFile(false);
                    
                }
            }else{
                alert("File too large. Try uploading a file less than 10 MB.")
            }

        // If the updated value is a regular text form field
        }else{
            updatedRequPersonalInfo[index]= {
                ...updatedRequPersonalInfo[index],
                value: event.target.value,
            };
        }

        setRequPersonalInfo(updatedRequPersonalInfo);
    };

    // When the user clicks out of a text box, the text will be validated
    const onBlur = ((item, index) => {
        let isValid = true;
        if (item.value !== ""){
            isValid = validateField(item)
        }      
        requPersonalInfo[index] = {...requPersonalInfo[index],
                        "isValid":isValid,
                        "value": item.value.trim()}
    });

    // When remove is clicked, delete the file from s3, and form, set isSavingFile to true to trigger saving the changes to dynamodb
    const handleRemove = async (index) => {        
        const updatedRequPersonalInfo = [...requPersonalInfo]
        const filePath = updatedRequPersonalInfo[index].value;

        try {
            const response = await fetch('https://6gps7s68d9.execute-api.us-east-1.amazonaws.com/deleteFileInS3', {
                "method":"POST",
                "body":JSON.stringify({
                    "filePath": filePath
                })
            })

            let data = "";
            let isRemoved = false;

            if (response.ok){
                data = await response.json();
                if (data == "Successfully deleted file from S3!"){
                    isRemoved = true;
                }
                
            }

            if (isRemoved) {
                console.log("File successfully removed!")

                updatedRequPersonalInfo[index] = {
                 ...updatedRequPersonalInfo[index], file: null, value: ""
                };

                // Reset the file path in dynamodb
                const updateFieldName = updatedRequPersonalInfo[index].fieldName
                setDBPersonalInfo({...dbPersonalInfo, 
                [updateFieldName] : ""
                    })
                setIsSavingFile(true);

                // Remove the file from file cache
                const cacheIndex =  previewFileCache.findIndex(file => file.name === filePath);

                // Check if the index is valid (i.e., the object exists in the array)
                if (cacheIndex !== -1) {
                    // Remove the object from the array
                    previewFileCache.splice(index, 1);
                }
            } else {
                alert('Failed to remove file from S3.');
            }
        }catch (error){
            console.error(error)
            alert("Something went wrong in handleRemove, ", error);
            
        }

        setRequPersonalInfo(updatedRequPersonalInfo);
    };

    // When save is clicked, set DBPersonalInfo with all the inputed info and set readyforDB to true to trigger saving the changes to dynamodb
    const handleClickSave = async () => {
        setSaveBtnText("Saving...");

        // Get all the values from requPersonal data lists and save them as info object with fieldName:value
        let tempList = {};
        requPersonalInfo.forEach((field, index) => {
            if ((field.fieldType === "text" && validateField(field)) || field.fieldType !== "text"){
                requPersonalInfo[index] = {...requPersonalInfo[index], isValid: true}
                Object.assign(tempList, {[field.fieldName]: field.value})
            }else{
                requPersonalInfo[index] = {...requPersonalInfo[index], isValid:false}
            }    
        });
        setDBPersonalInfo({...tempList});
        setReadyForDB(true);
    }

    // when info is ready to be saved (readyForDB=true) or a file was saved to s3 and the path needs to be stored in dynamodb (isSavingFile=true),
    // save the updated data to dynamodb
    useEffect (() => {
        const saveToDB = async () => {
        if (readyForDB || isSavingFile){
        // Save the updated data to the database
        const params = {
            method: "POST",
            body: JSON.stringify({
                "ClientID": ClientID,
                "updateCategory": "Personal",
                "updatedInfo": dbPersonalInfo,
            })
        }

        const updateUrl = "https://f0ll5x1c4l.execute-api.us-east-1.amazonaws.com/updateGeneralInfo";

        try {
            const response = await fetch(updateUrl, params);

            if (response.ok) {
                if (!isSavingFile){
                    alert("Your personal info was successfully updated!");
                    setClickedSave(true);
                    setSaveBtnText("Save");
                }else{
                    alert('Your file change was successfully saved!');
                }

            } else {
                setSaveBtnText("Save");
                alert('In If...Else Failed to save personal info');
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            setSaveBtnText("Save");
            alert('In Catch...Failed to save personal info. Error: ', error);
            console.error('Error:', error);
            }
        }}

        saveToDB()
        setReadyForDB(false)
        setIsSavingFile(false);
        setIsUploadingFile(false);
    }, [readyForDB, isSavingFile])

    // View an uploaded file in a seperate tab using a presigned url
    const handleClickedPreview = async (index) => {
        const fetchFileFromS3 = async (urlData, fileName) => {
            try{     
              const response = await fetch(urlData, {responseType: "arrayBuffer"});
              
              if (response.ok){
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                window.open(url, '_blank');
                // cache the file
                setPreviewFileCache([...previewFileCache, {url, name: fileName}]);
    
    
              }else{
                console.error("Something went wrong when fetching the file. Response not ok!")
              }
    
            }catch (error){
              console.error("Something went wrong when trying to view the file using the url: ", urlData, error)
            }
        }


        const filePath = requPersonalInfo[index].value;
        const cacheIndex =  previewFileCache.findIndex(f => f.name === filePath);
        
        // If the file is cached, open it from fileCache.
        // If not, call handleClickedPreview to fetch from s3
        if (cacheIndex !== -1){
          console.log("Opening file from cache...");          
          let url  = previewFileCache[cacheIndex].url
          console.log("Cached url: ", url)
          window.open(url, '_blank');
        }else{

            try{
                const urlResponse = await fetch('https://f0ll5x1c4l.execute-api.us-east-1.amazonaws.com/downloadFileFromS3', {
                    "method": "POST",
                    "body": JSON.stringify({
                        "filePath":filePath
                    })
                });
                if (urlResponse.ok){
                const presignedData = await urlResponse.json();
                const fetchedFileResponse = await fetchFileFromS3(presignedData, filePath);
    
                }else{
                console.log("Something went wrong when trying to get a presigned url. response not ok.")
                }
            }catch (error){
                console.error("Something went wrong when getting or using the presigned url to view the file. Error: ", error)
            }   
        }
    }

    return(
        <div>
            <PortalNavBar ClientID = {ClientID}/>

            <PageTitle pageName = "Personal Information" />
            {/*<p className='text-center'>**Only files with the following extensions can be uploaded: .pdf, .jpg, .png**</p>*/}


            {loadingPersonalData &&
            <Container className = 'mx-3'>
              <Alert height = '50%' variant = 'info'>
                  Loading Personal Data...<br />
                  Please be patient while data is loading!
                </Alert>
            </Container>
            }

            {!loadingPersonalData &&
            <Row className = 'm-1 mx-6'>
                <Form className='m-3'>
                    {requPersonalInfo.map((item, index) => (
                        <div key = {index}>
                            {item.fieldType === "file"?(
                                <Row className='mt-3'>
                                    <Col>
                                    <Form.Label>{item.fieldName}</Form.Label>
                                    </Col>
                                    <Col sm={1}>
                                    {isUploadingFile && (
                                        <Spinner
                                            as="span"
                                            animation='border'
                                            role='status'
                                            aria-hidden = 'true'
                                        >
                                            <span className='visually-hidden'>Loading...</span>
                                        </Spinner>
                                        
                                    )}
                                    </Col>
                                    <Col>
                                    {item.value === ""? (
                                        <Container className = "m-2">
                                        <Row>    
                                        <Col>
                                            <Form.Control 
                                                type="file"
                                                size="sm" 
                                                style={{ backgroundColor: item.value == ""? '#b85c5c' : 'transparent' }} 
                                                onChange={(event) => handleInfoChange(index, event)} 
                                            />
                                        </Col>
                                        </Row>
                                        </Container>
                                    ) : (
                                        <Container>
                                        <Stack direction = "horizontal" gap={3}>
                                                <Form.Select className = "ms-auto" value = {item.value}>
                                                    <option disabled>Uploaded File</option>
                                                    <option value = {item.value}>{item.value.split("/")[1]}</option>
                                                </Form.Select>
                                                <a onClick = {() => {handleRemove(index)}}><Image alt = "Delete" src= {deleteIcon} fluid/></a>
                                                <a onClick = {() => {handleClickedPreview(index)}}><Image alt = "View" src= {viewIcon} fluid/></a>                                  
                                        </Stack>
                                        </Container>

                                    )}
                                </Col>
                                </Row>
                            ):(
                                <Form.Group key = {index} type="text"> 
                                    <Form.Label>{item.fieldName}: </Form.Label>
                                    <Form.Control 
                                        id={item.fieldName} 
                                        value= {item.value} 
                                        onChange={(event) => {handleInfoChange(index, event)}}
                                        isInvalid = {"isValid" in item?!item.isValid:false}
                                        onBlur={() => onBlur(item, index)}
                                    />
                                    {item.toolTip &&(
                                        <Form.Text id = {item.fieldName} muted>{item.toolTip}</Form.Text>
                                    )}
                                    <Form.Control.Feedback type = "invalid">{item.invalidMsg}</Form.Control.Feedback>
                                </Form.Group>
                            )}
                            
                        </div>
                    ))}

                    <SubmitButton text = {saveBtnText} onClick = {handleClickSave} />

                </Form>
            </Row>   
            }

        </div>
        
    );
};

export default Personal;