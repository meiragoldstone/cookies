// This is the template to display the files needed for a specific loan. The LoanTemplate component accepts 'loan' as props
// and will display the loan name and loan specific data and files needed.
// Author: R. Markowitz
// Last updated: Feb 2025

import React, {useState, useEffect} from 'react';
import {Row, Col, Form, Alert, Container, Spinner, Stack, Image} from 'react-bootstrap';
import PageTitle from '../../Components/PageTitle';
import {refiInfo, allLoanInfo, fixAndFlipInfo, refiFiles, purchaseFiles, fixAndFlipFiles} from '../../Data/RequiredLoanData';
import { validateField } from '../../Data/Regex';
import { MAX_FILE_SIZE } from '../../Data/MaxData';
import SubmitButton, { DownloadFileButton} from '../../Components/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import FilesModal from '../../Components/AvailableFilesModal';

const LoanTemplate = (props) => {
    const viewIcon = require("../../Images/viewSmall.png")
    const deleteIcon = require("../../Images/deleteSmall.png")
    const LoanID = props.LoanID;
    const ClientID = props.ClientID;
    const [loan, setLoan] = useState({"LoanID": LoanID, "LoanType": "LOADING..."});
    const [loanInfoList, setLoanInfoList] = useState();
    const [loanFileList, setLoanFileList] = useState();
    const [loanRequInfoList,setLoanRequInfoList] = useState([]);
    const [loanRequFileList,setLoanRequFileList] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewFileCache, setPreviewFileCache] = useState([]);
    const [clickedSave, setClickedSave] = useState(false);
    const [saveBtnText, setSaveBtnText] = useState("Save");
    const [loadingLoanData, setLoadingLoanData] = useState(true);
    const [readyForDB, setReadyForDB] = useState(false);
    const [isSavingFile, setIsSavingFile] = useState(false);
    const [isUploadingFile, setIsUploadingFile] = useState([]);
    const [clickedRemove, setClickedRemove] = useState("");
    const [clickedPreview, setClickedPreview] = useState("");
    const [showModal, setShowModal] = useState(false)
    let allLoans = props.LoanList;

    // Get a list of all the loans except the current loan being viewed
    let currentLoanIndex = allLoans.findIndex((loan) => loan.LoanID == LoanID);
    if (allLoans.length == 1 || (allLoans.length - 1) == currentLoanIndex){
      allLoans = [...allLoans.slice(0,currentLoanIndex)]
    }else{
      allLoans = [...allLoans.slice(0,currentLoanIndex),
                  ...allLoans.slice(currentLoanIndex + 1, allLoans.length)
            ]
    }

    // Fetch Loan Info from database and set the module variables
    useEffect(() => {
      const getLoanInfo = async () => {
          setLoadingLoanData(true);
          try {
              const response = await fetch(`https://f0ll5x1c4l.execute-api.us-east-1.amazonaws.com/getLoanInfo`, {
                "method": "POST",
                "body": JSON.stringify({
                  "ClientID":ClientID,
                  "LoanID": LoanID
                })
              });
              if (!response.ok) {
                  setLoan([{"LoanID": "ERROR", "LoanType": "ERROR"}]);
                  console.log("Error loading loan info. Response not ok.");
              }else{
                  const data = await response.json();

                  if (data && !data == []) {
                          setLoan({...data});
                          setLoanInfoList(data["LoanInfo"]);
                          setLoanFileList(data["LoanFiles"]);  
                        try{
                          // set loanRequInfoList according to the loan type. This variable is for creating the form fields
                          let info = [];
                          let files = [];
                          let tempSelectedFiles = {};
                          if (data.LoanType == "Refinance") {
                            info = refiInfo;
                            files = refiFiles;
                          } else if (data.LoanType == "Purchase"){
                              info = allLoanInfo;
                              files = purchaseFiles;

                          } else if (data.LoanType == "Fix and Flip") {
                              info = fixAndFlipInfo;
                              files = fixAndFlipFiles;
                          } else {
                              console.log("Loan Type not Supported. Loan Type  = ", data.LoanType);
                          }

                          info = info.map((field) => ({
                            ...field, 
                            value: data.LoanInfo[field.fieldName]? data.LoanInfo[field.fieldName]: "",
                          }))
                          files = files.map((file) => ({
                            ...file, 
                            value: data.LoanFiles[file.fileName]? data.LoanFiles[file.fileName]: [],
                          }))
                    
                          setLoanRequInfoList([...info]);
                          setLoanRequFileList([...files]);
                          files.map((file) => {
                            //let formSelectValue = document.getElementById(file.fileName).value
                            Object.assign(tempSelectedFiles,{[file.fileName]:"Uploaded File(s)"})
                          })
                          setSelectedFiles(tempSelectedFiles)
                        }catch (err){
                            console.error("Line 92, There was an error setting info and file vars. ", err)
                          }

                } else {
                    setLoan([{"LoanID": "ERROR", "LoanType":"ERROR"}]);
                    console.log("Data empty.");
                }
              }
          } catch (error) {
              setLoan([{"LoanID": "Something went wrong when tring to access your current loans", "LoanType": "ERROR"}]);
          }
      }
      getLoanInfo();
    }, [clickedSave])

    // when loan data is set and state updates, setloading loan data to false
    // set the "getFromOptions" for each file in loanRequFiles to the list of other loans that have the file
    // "getFromOptions" is a list of bootstrap <Dropdown.Item> elements - one for each loan with the desired file
    useEffect (() => {
      setLoadingLoanData(false)
      let tempLoanRequFileList = [...loanRequFileList]

      loanRequFileList.forEach((file, fileIndex) => {
        var availableOptions = []
        allLoans.forEach((loan2, loan2Index) => {
          if (loan2['UploadedFiles'].includes(file.fileName)){
              // ACH files only available type = type or loan.LoanType = Purch or Fix and Flip and loan2.LoanType = Purch or Fix and Flip
              if (file.fileName !== "ACH" || (loan.LoanType == loan2.LoanType || (loan.LoanType == "Purchase" && loan2.LoanType == "Fix and Flip") || (loan.LoanType == "Fix and Flip" && loan2.LoanType == "Purchase"))){
                availableOptions.push(loan2.LoanID)
              }
          }
        })
        if (availableOptions.length == 0){
          availableOptions.push("There are no loans with this file on record.")
        }
        tempLoanRequFileList[fileIndex] = {...tempLoanRequFileList[fileIndex],
                              getFromOptions: [...availableOptions]
        }
      })

      setLoanRequFileList(tempLoanRequFileList)

    }, [loan])

    // When text is entered into any of the form control boxes, save the inputed value to loanInfoList[fieldName][value]
    // This will also make the inputed value appear in the form contol
    const handleTextInfoChange = (index, event) => {
      setReadyForDB(false);
      setClickedSave(false);
      const updatedLoanInfoList = [...loanRequInfoList];

      // Update the specific item at the given index
      updatedLoanInfoList[index]= {
        ...updatedLoanInfoList[index],
        value: event.target.value,
      };
    
      setLoanRequInfoList(updatedLoanInfoList);
    };

    // When the user clicks out of a text box, the text will be validated
    const onBlur = ((item, index) => {
      let isValid = true;
      if (item.value !== ""){
        isValid = validateField(item)
      }      
      loanRequInfoList[index] = {...loanRequInfoList[index],
                    "isValid":isValid,
                    "value": item.value.trim()}
    });

    
    // When a radio button is clicked, save the selected value to loanInfoList[fieldName][value]
    const handleRadioChange = (index, event, option) => {
      setReadyForDB(false);
      setClickedSave(false);
      const updatedLoanInfo = [...loanRequInfoList];

      // Update the specific item at the given index
      updatedLoanInfo[index] = {
        ...updatedLoanInfo[index],
        value: option,
      };

      // If the affected field was "property type" add fields if necesary based on chosen value
      if (event.target.name === "Property Type"){
        // If single family is chosen, disable the number of units field
        // If any other option, enable number of units field
        if(option === "Single Family"){
          updatedLoanInfo[index + 1] = {
            ...updatedLoanInfo[index + 1],
            state: "disabled", value: "N/A"
           }
           updatedLoanInfo[index + 2] = {
            ...updatedLoanInfo[index + 2],
            state: "disabled", value: "N/A"
           }
        }else {
          updatedLoanInfo[index + 1] = {
            ...updatedLoanInfo[index + 1], 
            state: "", value: ""
          }

          // if condo option was chosen, enable HOA, if anything else, disable HOA
          if(option === "Condo"){
            updatedLoanInfo[index + 2] = {
              ...updatedLoanInfo[index + 2],
              state: "", value:""
             }
          }else {
            updatedLoanInfo[index + 2] = {
              ...updatedLoanInfo[index + 2], 
              state: "disabled", value: "N/A"
            }
          }
      }};
    
      setLoanRequInfoList(updatedLoanInfo);
    }

    // When a file is added, save the file to s3 and the filepath to dynamodb and loanRequFileList[index][value]
    const handleFileChange = async (index, event) => {
      let tempUploadingFileList = [isUploadingFile];
      tempUploadingFileList.push(index);
      setIsUploadingFile(tempUploadingFileList);
      event.preventDefault();
      const updatedLoanFileList = [...loanRequFileList];

      let uploadedFiles = []
      let filePaths = []
      for (let i = 0; i < event.target.files.length; i++){
        uploadedFiles.push(event.target.files[i]);
      };
      uploadedFiles.forEach((file) => {
        filePaths.push(ClientID + "/" + LoanID + "_" + updatedLoanFileList[index].fileName + "_" + file.name);
      });

      // Remove any empty filepaths
      filePaths = filePaths.filter((filePath) => filePath)
      
      // Using a presigned url (urlData.url), save the file to s3
      const handleUploadToS3 = async (file, urlData) => {
          const formData = new FormData();
          
          Object.keys(urlData.fields).forEach(key => {
            formData.append(key, urlData.fields[key]);
          });
          formData.append('file', file);

          const response = await fetch(urlData.url, {
            method: 'POST',
            body: formData,
          });
      
          return response.ok;
      }
  
      // For each file that was uploaded
      
      for (let i = 0; i < uploadedFiles.length; i++){
        let uploadedFile = uploadedFiles[i];
        if (uploadedFile.size <= MAX_FILE_SIZE){
          
          let filePath = filePaths[i];  

          try {
            // Get the pre-signed URL from the Lambda function
            const presignedResponse = await fetch('https://f0ll5x1c4l.execute-api.us-east-1.amazonaws.com/saveFileToS3',{
              "method": "POST",
              "body": JSON.stringify({
                  "filePath": filePath
              }) 
            });
            
            if (presignedResponse.ok){
              const presignedData = await presignedResponse.json();
              try{
                const isUploaded = await handleUploadToS3(uploadedFile, presignedData);
                console.log("IsUploaded" ,isUploaded)
                if (isUploaded) {
                    console.log("File uploaded successfully to S3!")

                    // Put the file in the preview file cache
                    const url = URL.createObjectURL(uploadedFile);
                    setPreviewFileCache([...previewFileCache, {url, name:filePath}])
                } else {
                    alert('Failed to upload file to S3.');
                }
              }catch (error){
                  console.error(error)
                  alert("Something went wrong in when calling handleUploadToS3, ", error);
                  filePaths.splice(i, 1);
              }
            }else{
              console.log("Response not ok.")
              const error = await presignedResponse.json()
              alert(error)
              filePaths.splice(i, 1);
            }
            

          }catch (error){
            console.error("something went wrong whe getting the presigned url. ", error)
            filePaths.splice(i, 1);
          }

        

        if (filePaths.length > 0){
          // If this is the first uploaded file, set the filepath for selectedFiles[fileName]
          let fileName = updatedLoanFileList[index].fileName;
          if (updatedLoanFileList[index].value.length == 0){
            let tempSelectedFiles = {...selectedFiles, [fileName]:filePaths[0]};
            setSelectedFiles(tempSelectedFiles);
          }

          updatedLoanFileList[index]= {
            ...updatedLoanFileList[index],
            value: [...updatedLoanFileList[index].value, ...filePaths], 
            file: [updatedLoanFileList[index].file, ...uploadedFiles]
          };

          // Save the uploaded file path in dynamodb
          const updateFileName = updatedLoanFileList[index].fileName
          setLoanFileList({...loanFileList, 
              [updateFileName] : [...filePaths]
              })

          // When is isSavingFile is true, saveToDB useEffect is triggered
          setIsSavingFile(true);
          setLoanRequFileList(updatedLoanFileList);
        }}else{
          alert("File too large. Try uploading a file less than 10 MB.")
        }
      }  
        tempUploadingFileList = [];
        isUploadingFile.forEach((uploadingIndex) => {
          if (index != uploadingIndex){
            tempUploadingFileList.push(index);
          }
        })
        setIsUploadingFile(tempUploadingFileList)
         
    };

    

    // Remove a file when the remove button sets clicked remove with the index of the clicked field
    useEffect(() => {
      const removeFile = async (fieldIndex) => {
        const filePath = selectedFiles[loanRequFileList[fieldIndex].fileName]
        const updatedFileList = [...loanRequFileList]
        const fileIndex = updatedFileList[fieldIndex].value.indexOf[filePath];

        try {
            const response = await fetch('https://6gps7s68d9.execute-api.us-east-1.amazonaws.com/deleteFileInS3', {
              "method":"POST",
              "body":JSON.stringify({
                "filePath":filePath
              })
            })

            let data = "";

            if (response.ok){
              data = await response.json();
              console.log("File successfully removed!")

              let file;
              if (!updatedFileList[fieldIndex].file || updatedFileList[fieldIndex].file.length == 0){
                file = [];
              }else{
                let tempFile = updatedFileList[fieldIndex].file
                tempFile.pop(tempFile[fileIndex]);
                file = [tempFile];
              }

              let value;
              if (updatedFileList[fieldIndex].value.length == 0){
                value = [];
              }else{
                let tempValue = updatedFileList[fieldIndex].value
                tempValue.pop(tempValue[fileIndex]);
                value = [...tempValue];
              }

              updatedFileList[fieldIndex] = {
                ...updatedFileList[fieldIndex], 
                file: file,
                value: value
              };

              // Reset the file path in dynamodb
              const updateFieldName = updatedFileList[fieldIndex].fileName
              setLoanFileList({...loanFileList, 
              [updateFieldName] : value
                  })
              setIsSavingFile(true);

              // Remove the file from file cache
              const cacheIndex =  previewFileCache.findIndex(file => file.name === filePath);

              // Check if the index is valid (i.e., the object exists in the array)
              if (cacheIndex !== -1) {
                // Remove the object from the array
                previewFileCache.splice(cacheIndex, 1);
              }

            } else {
                alert('Failed to remove file from S3.');
            }

        }catch (error){
            console.error(error)
            alert("Something went wrong in removeFile, ", error);
            
        }
      
        setLoanRequFileList(updatedFileList);
      };

      if (loanRequFileList.length > 0 && clickedRemove !== ""){
        const index = clickedRemove
        //if ((!(clickedRemove === "")) && (selectedFiles[loanRequFileList[index].fileName])){
        let isSelectedFilesUpdated = ((prevState) => prevState !== selectedFiles);
        if (isSelectedFilesUpdated && selectedFiles[loanRequFileList[index].fileName] != "Uploaded File(s)"){
          removeFile(index);
          setClickedRemove("");
          setSelectedFiles({...selectedFiles, [loanRequFileList[index].fileName]:"Uploaded File(s)"})

        }else if(selectedFiles[loanRequFileList[index].fileName] == "Uploaded File(s)"){
          alert("No file is selected. Please choose a file before trying to delete.")     
          setClickedRemove("")
        }else{
          setClickedRemove("")
        }
      }
    }, [clickedRemove, selectedFiles]);

    // When a file is selected form the uploaded files form select, set that file to the value for the fileName in selectedFiles array
    const handleSelectChange = (fileName, selectedValue) => {
      let tempSelectedFiles = {...selectedFiles, [fileName]:selectedValue};
      setSelectedFiles(tempSelectedFiles);
    }

    // When the save button is clicked, save all the inputed values to loanInfoList and set readyForDB to trigger the save to DynamoDB useEffect
    const handleClickSave = async () => {
      setSaveBtnText("Saving...")

      // Get all the values from loanRequ data lists and save them as info object with fieldName:value
      let tempLoanInfoList = {};
      loanRequInfoList.forEach((field, index) => {
        if ((field.fieldType === "text" && validateField(field)) || field.fieldType != "text"){
          loanRequInfoList[index] =  {...loanRequInfoList[index], isValid: true}
          Object.assign(tempLoanInfoList, {[field.fieldName]: field.value});
          
        }else{
          loanRequInfoList[index] =  {...loanRequInfoList[index], isValid: false}
        }});
      setLoanInfoList({...tempLoanInfoList});
      setReadyForDB(true);
    }

    // When readyForDB or isSavingFile is true, save the update to dynamodb
    useEffect (() => {
      const saveToDB = async (updateCategory, updateList) => {

        // Save the updated loan data to the database
        const params = {
          method: "POST",
          body: JSON.stringify({
              "ClientID": ClientID,
              "LoanID": LoanID,
              "updateCategory": updateCategory,
              "updatedInfo": updateList,
          })
        }

        const updateUrl = "https://f0ll5x1c4l.execute-api.us-east-1.amazonaws.com/updateLoanInfo";

        try {
          const response = await fetch(updateUrl, params);

          if (response.ok) {
            if (readyForDB){
              setClickedSave(true);
              setSaveBtnText("Save")
            }else{
              setIsSavingFile(false);
            }
            alert("Your loan was successfully updated!");           
              
          } else {
              setSaveBtnText("Save")
              setIsSavingFile(false);
              alert('Line 393, In If...Else Failed to save loan info');
              console.error('Error:', response.statusText);
          }
        } catch (error) {
          setSaveBtnText("Save")
          setIsSavingFile(false);
          alert('Line 397, In Catch...Failed to save loan info. Error: ', error);
          console.error('Error:', error);
          }
      }


      if (readyForDB){
        console.log("Saving Loan Info Changes to DB...")
        saveToDB("Loan Info", loanInfoList);
      }else if (isSavingFile){
        console.log("Saving File List Changes to DB...")
        saveToDB("Loan Files", loanFileList);
      }
      setReadyForDB(false);
      setIsSavingFile(false);
      
    }, [readyForDB, isSavingFile])
      
    // View an uploaded file in a seperate tab using a presigned url
    useEffect (() => {
      const handleClickedPreview = async (filePath) => {

        try{
          const urlResponse = await fetch('https://f0ll5x1c4l.execute-api.us-east-1.amazonaws.com/downloadFileFromS3', {
            "method": "POST",
            "body":JSON.stringify({
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
      };

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

      if (loanRequFileList.length > 0 && clickedPreview !== "" && selectedFiles[loanRequFileList[clickedPreview].fileName] !== "Uploaded File(s)"){
        let isSelectedFilesUpdated = ((prevState) => prevState !== selectedFiles);
        if (isSelectedFilesUpdated && selectedFiles[loanRequFileList[clickedPreview].fileName] !== "Uploaded File(s)"){
          const filePath = selectedFiles[loanRequFileList[clickedPreview].fileName];
          const cacheIndex =  previewFileCache.findIndex(f => f.name === filePath);
          
          // If the file is cached, open it from fileCache.
          // If not, call handleClickedPreview to fetch from s3
          if (cacheIndex !== -1){
            console.log("Opening file from cache...");
            let url  = previewFileCache[cacheIndex].url
            window.open(url, '_blank');
          }else{
            console.log("File not cached. Fetching file from S3...");
            handleClickedPreview(clickedPreview, filePath);
          }

        setClickedPreview("");        
        }else{
          console.log("Could not preview file - Something went wrong (570)")
        }
      }else if(loanRequFileList && clickedPreview !== "" && selectedFiles[loanRequFileList[clickedPreview].fileName] === "Uploaded File(s)"){
        console.log("Could not preview file - Selected Files is not updated...")
        alert("No file is selected. Please choose a file before trying to preview. ")
      }
    },[clickedPreview, selectedFiles]);
    
    return(
      
        <div> 
            <PageTitle pageName={loan.LoanID + '          (' + loan.LoanType+')'} />
            <p className='text-center'>**Only files with the following extensions can be uploaded: .pdf, .jpg, .png**</p>

            {loadingLoanData &&
            <Container className = 'mx-3'>
              <Alert height = '50%' variant = 'info'>
                  Loading Loan Data...<br />
                  Do not try to edit any fields while data is loading!
                </Alert>
            </Container>
            }
            
            {!loadingLoanData &&
            <>
            <Container className = 'mx-3'>
              <Form.Label><u><strong>Loan Specific Data</strong></u></Form.Label>
              <Row className = 'm-1 mx-6'>
                <Form className='m-3'  noValidate>
                  {loanRequInfoList && loanRequInfoList.map((item, index) => (
                    <div key = {index}>
                      {item.fieldType === "radio" ? (
                          <Form.Group type = "radio" key = {index} className = 'mt-2'>
                            <Form.Label>{item.fieldName}: </Form.Label>
                            {item.options.map((option, optionIndex) => (
                              <Form.Check 
                                  key = {optionIndex}
                                  type = "radio" 
                                  name = {item.fieldName}
                                  id = {item.fieldName + "-" + option} 
                                  label = {option}
                                  value = {item.value}
                                  checked = {item.value === option}
                                  onChange = {(event) => handleRadioChange(index, event, option)}
                              />
                            ))} 
                          </Form.Group>
                      ):(
                        <Form.Group key = {index} type="text"> 
                          <Form.Label>{item.fieldName}: </Form.Label>
                          <Form.Control 
                            id={item.fieldName} 
                            value= {item.value} 
                            disabled = {item.state === "disabled"}
                            placeholder={item.state?item.placeHolder:item.value}
                            onChange={(event) => {handleTextInfoChange(index, event)}}
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
                </Form>
                
                <SubmitButton onClick = {handleClickSave} text = {saveBtnText} />

                
              </Row>
            </Container>

            <Container className = 'mx-3'>
              <Form.Label id = "files"><u><strong>Loan Specific Files</strong></u></Form.Label>
              <Row className = 'm-1 mx-6'>
                  {loanRequFileList.map((item, index) => (
                   <Row className='file-row'>
                    <Col className='w-48'>
                    <Form.Label id = {item.fileName}><strong>{item.fileName}</strong></Form.Label>
                    {item.toolTip &&(
                        <Form.Text id = {item.fileName} muted>  {item.toolTip}</Form.Text>
                    )}
                    </Col>
                    <Col className='w-52'>
                    <Stack direction="horizontal" gap={4} key={index}>
                      <Col sm={1} className='mx-auto'>
                        {isUploadingFile && isUploadingFile.includes(index) && (
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
                      <div className = "stack-file-control m-2" style = {item.value.length == 0 || item.maxUploads == "multiple"? ({visibility:"visible"}):({visibility:"hidden"})} >
                            <Form.Control 
                              as = "input"
                              type="file" 
                              size="sm" 
                              style={{ backgroundColor: item.value.length == 0 ? '#b85c5c' : 'transparent' }} 
                              multiple = {item.maxUploads === "multiple"}
                              onChange={(e) => handleFileChange(index, e)} 
                              disabled = {isUploadingFile.length > 0 || isSavingFile}
                              accept=''
                              id = {item.fieldName}
                            />

                        {!item.template == ""?(
                            <DownloadFileButton filePath = {item.template} />
                          ):(<></>)   
                        }                                   
                      </div>

                      <div className='stack-select ms-auto' style={item.value.length != 0? ({visibility:"visible"}):({visibility:"hidden"})}>
                        <Stack direction='horizontal'>
                              <Form.Select id = {item.fileName} value = {selectedFiles[item.fileName]} onChange = {(event) => {handleSelectChange(item.fileName, event.currentTarget.value)}} size="sm"> 
                                <option disabled selected>Uploaded File(s)</option>
                                  {Array.isArray(item.value) && item.value.map((fileName, index) => (
                                
                                    <option key = {index} value = {fileName}>{fileName.split("/")[1]}</option>
                                  ))} 
                              </Form.Select>

                              <a onClick = {() => {setClickedRemove(index)}}><Image alt = "Delete" src= {deleteIcon} fluid/></a>
                              <a onClick = {() => {setClickedPreview(index)}}><Image alt = "View" src= {viewIcon} fluid/></a>
                          </Stack>
                      </div>

                  </Stack>
                  </Col>
                  </Row>
                  ))}
              </Row>

              </Container>
            </>
            }
            
        </div>
    )
}

export default LoanTemplate;