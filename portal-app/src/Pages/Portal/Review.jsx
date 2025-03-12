// This is the Reivew page where the client or the company can see all of the clients information on one unified page.
// All uploaded files will be available for download in a zip folder format
// Author: R. Markowitz
// Last updated: March 2025

import React, {useState, useEffect} from "react";
import JSZip from 'jszip';
import {saveAs} from 'file-saver';
import PageTitle from "../../Components/PageTitle";
import PortalNavBar from  "../../Layout/PortalNavBar"
import {Container, Button, Row, Col} from 'react-bootstrap';
import SubmitButton from '../../Components/Button';
import * as ClientRequData from '../../Data/RequiredClientData' ; 
import * as LoanRequData from "../../Data/RequiredLoanData";

const Review = (props) => {
    const ClientID = props.ClientID;
    const AdminID = props.AdminID || null
    const [givenName, setGivenName] = useState("Loading...");
    const [familyName, setFamilyName] = useState("");
    const [LoanID, setLoanID] = useState();
    const [loanList, setLoanList] = useState([{"LoanID": "Loading..."}]);
    const personalRequInfo = ClientRequData.personalInfo;
    const financialRequInfo = ClientRequData.financialInfo;
    const [loanRequInfo, setLoanRequInfo] = useState();
    const [personalInfo, setPersonalInfo] = useState({"Loading...": ""});
    const [financialInfo, setFinancialInfo] = useState({"Loading...": ""});
    const [loadedLoans, setLoadedLoans] = useState({})
    const [loanInfo, setLoanInfo] = useState({"Loading...": ""});
    const [filePathList, setFilePathList] = useState([]);
    const [missingFiles, setMissingFiles] = useState([]);
    const [clickedLoan, setClickedLoan] = useState(false);
    const [loanInfoLoaded, setLoanInfoLoaded] = useState();
    const [filesToZip, setFilesToZip] = useState([]);
    const [zipReady, setZipReady] = useState();
    const [readyForDownload, setReadyForDownload] = useState();

    // Load all the personal and financial info. Save any personal files (ValidID) into filePathList
    useEffect(() => {
        const getGeneralInfo = async () => {
            try {
                const response = await fetch(`https://f0ll5x1c4l.execute-api.us-east-1.amazonaws.com/getGeneralInfo`, {
                    "method": "POST",
                    "body":JSON.stringify({
                        "ClientID": ClientID
                    })
                });
                if (!response.ok) {
                    console.log("Error loading Personal and Financial info. Response not ok.");
                }else{
                    const data = await response.json();
            
                    if (data && !data == []) {
                            // Set all the personal info to personalInfo and all the personal files to filePathList or missingFiles
                            let tempPersonalInfo = {}; 
                            let tempMissingFiles = [...missingFiles];
                            let tempFileList = [...filePathList];

                            //Set tempPersonalInfo with the values in data according to the order of personalRequInfo
                            personalRequInfo.map((field) => {
                                if (field.fieldType == "file"){
                                    if (data["Personal"][field.fieldName] == ""){
                                        tempMissingFiles.push(field.fieldName);
                                    }else{
                                        tempFileList.push(data["Personal"][field.fieldName]);
                                    }

                                }else{
                                    Object.assign(tempPersonalInfo, {[field.fieldName]:data["Personal"][field.fieldName]});
                                    if (field.fieldName == "First Name"){
                                        setGivenName(data["Personal"][field.fieldName])
                                    }else if (field.fieldName == "Last Name"){
                                        setFamilyName(data["Personal"][field.fieldName])
                                    }
                                    
                                }
                            })                                  
                            setMissingFiles(tempMissingFiles);
                            setFilePathList(tempFileList);
                            setPersonalInfo(tempPersonalInfo);
                            
                            // Set financial info
                            let tempFinancialInfo = {};
                            financialRequInfo.map((field) => {
                                Object.assign(tempFinancialInfo, {[field.fieldName]:data["Financial"][field.fieldName]})
                            })
                            setFinancialInfo(tempFinancialInfo);
                    } else {
                        console.log("Data empty.");
                    }
                }
            } catch (error) {
                console.log("Something went wrong when trying to load the clients personal and financial data. Error: ", error)
            }
        }
        if (ClientID){
            getGeneralInfo();  
        }
       
    }, [ClientID]);

    // Load a list of all loans under this client id
    useEffect(() => {
        const getLoanList = async () => {
            try {
                const response = await fetch(`https://f0ll5x1c4l.execute-api.us-east-1.amazonaws.com/getLoanList?ClientID=${encodeURIComponent(ClientID)}`);
                if (!response.ok) {
                    setLoanList([{"LoanID": "No Loans on File."}]);
                    console.log("Error loading loan list. Response not ok.");
                }else{
                    const data = await response.json();
                    if (data && !data.length == 0) {
                           setLoanList([...data]);                         
                    } else {
                        setLoanList([{"LoanID": "No Loans on File."}]);
                        console.log("Data empty.");
                    }
                }
            } catch (error) {
                setLoanList([{"LoanID": "Something went wrong when tring to access your current loans"}]);
            }
        }
        if (!clickedLoan && ClientID){
            getLoanList();            
        }
    }, [clickedLoan, ClientID])

    // Load all the loan info of clicked loan. 
    // Save any loan files into filePathList and any missing file to missingFiles
    useEffect(() => {
        const getLoanInfo = async () => {
            try {
                const response = await fetch(`https://f0ll5x1c4l.execute-api.us-east-1.amazonaws.com/getLoanInfo`, {
                    "method": "POST",
                    "body":JSON.stringify({
                        "ClientID": ClientID,
                        "LoanID": LoanID
                    })
                });
                if (!response.ok) {
                    console.log("Error loading Loan info and files. Response not ok.");
                }else{
                    const data = await response.json();

                    if (data && !data == []) {
                            // Add the loan files to the file list
                            let tempFileList = [...filePathList];
                            let tempMissingFiles = missingFiles;

                            Object.keys(data["LoanFiles"]).forEach((fileName) => {
                                if(data["LoanFiles"][fileName] == "" && !tempMissingFiles.includes(fileName)){
                                    tempMissingFiles.push(fileName);
                                }else if (data["LoanFiles"][fileName] !== "" && !tempFileList.includes(fileName)){
                                    //tempFileList.push(data["LoanFiles"][fileName]);
                                    tempFileList = [...tempFileList, ...data["LoanFiles"][fileName]]
                                }    
                            })

                            tempFileList.sort((a,b) => {if (a < b){return -1}else if (a > b){return 0}});
                            tempMissingFiles.sort((a,b) => {if (a < b){return -1}else if (a > b){return 0}});
                            setFilePathList(tempFileList);
                            setMissingFiles(tempMissingFiles)

                            // Set the Loan Info
                            let tempLoanInfo = {};

                            loanRequInfo.map((field) => {
                                Object.assign(tempLoanInfo, {[field.fieldName]:data["LoanInfo"][field.fieldName]})
                            })
                            setLoanInfo(tempLoanInfo);

                    } else {
                        console.log("Data empty.");
                    }
                }
            } catch (error) {
                console.log("Something went wrong when trying to load the clients loan data. Error: ", error)
            }
        }

        if (clickedLoan){
            // If loan is already cached in loadedLoans, pull from there, if loan was not loaded yet, fetch from aws
            if (loadedLoans[LoanID]){
                setFilePathList(loadedLoans[LoanID]["FilePathList"]);
                setMissingFiles(loadedLoans[LoanID]["MissingFiles"]);
                setLoanInfo(loadedLoans[LoanID]["LoanInfo"]);
            }else{
               getLoanInfo(); 
            }
                        
        }
    }, [clickedLoan, LoanID, loanRequInfo])

    // When a loan is clicked, set clickedLoan to trigger getLoanInfo and set LoanID
    const handleLoanClick = (loan) => {
        setClickedLoan(true);
        setLoanID(loan.LoanID);
        if (loan.LoanType == "Refinance"){
            setLoanRequInfo(LoanRequData.refiInfo)
        }else{
            setLoanRequInfo(LoanRequData.allLoanInfo)
        }
    };

    // When "View a different loan" is clicked, set LoanID to "" and set
    const handleBackToLoanList = () => {
        setClickedLoan(false);
        setLoanID("");
        setLoanInfo({"Loading...":""});

        //Resetting filePathList and missingFiles to take out any loan files, 
        // if more files than just valid id need to edit to include additional files
        if (missingFiles.includes("Valid ID")){
            setFilePathList([""]);
            setMissingFiles(["Valid ID"]);
        }else{
            filePathList.forEach((file) => {
                if (!file.includes("/General_")){
                  filePathList.pop(file);  
                }                
            })
            setMissingFiles([""])
        }
    }

    // When the loan info loads set loan info loaded so the data can be displayed
    useEffect(() => {
        if (!loanInfo["Loading..."]){
            setLoanInfoLoaded(true);
            setLoadedLoans({
                ...loadedLoans, 
                [LoanID]:{"LoanInfo" : loanInfo, "FilePathList": filePathList, "MissingFiles": missingFiles}
            })  
        }
        
    }, [loanInfo])

    // When the user clicks the "Download all files" button, get all the files from S3
    // Download them in a zip folder
    const handleDownloadZip = async () => {
        const fetchFile = async (filePath) => {
          try {
            //const brokenFilePath = filePath.split("_")
            //const fileName = brokenFilePath[brokenFilePath.length -2] + "_" + brokenFilePath[brokenFilePath.length -1]
            console.log("Getting presigned url...");
            const response = await fetch('https://f0ll5x1c4l.execute-api.us-east-1.amazonaws.com/downloadFileFromS3', {
                "method": "POST",
                "body": JSON.stringify({
                    "filePath": filePath
                })
            });
            
            if (response.ok){
                const presignedData = await  response.json();
                const fetchFileResponse = await handleFetchFromS3(presignedData, filePath);
            }else{
                console.log("Something went wrong when trying to get a presigned url. response not ok.");
            }
            
          } catch (error) {
            console.error('Failed to fetch file:', error);
          }
        }

        const handleFetchFromS3 = async (urlData, fileName) => {   
            try{      
                console.log("fetching urlData.url...")
                const response = await fetch(urlData);
                if (response.ok){
                    const file = await response.arrayBuffer();
                    let tempFilesToZip = [...filesToZip];
                    tempFilesToZip = prevFiles =>[...prevFiles, {fileName, content:file}];
                    setFilesToZip(tempFilesToZip);
                }else{
                    console.log("response not ok")
                }
                
            }catch (error){
                console.log("Something went wrong when trying to fetch file using url: ", urlData.url);
                console.log("Error: ", error);
                return error;
            }
        }
        
        if (filePathList.length != 0){
            setZipReady(false)
            for (const filePath of filePathList){ 
                await fetchFile(filePath);
            }
            setZipReady(true);
        }else{
            alert("There are no files to download");
        }
        
    };

    // When the zip is ready, set ready for download
    useEffect(() => {
        const isFilesToZipUpdated = ((prevState) => prevState !== filesToZip);

        if (filesToZip.length > 0 && isFilesToZipUpdated && zipReady){
          setReadyForDownload(true);  
        }   
    }, [zipReady, filesToZip])

    // When the files to Zip is all ready, zip and download the files
    useEffect(() => {
        const downloadZip = () => {
            const zip = new JSZip();

            // Loop through the files and add them to the zip
            
            filesToZip.forEach(file => {
                zip.file(file.fileName, file.content);
            });

            // Make the zip name based on the client id and loan id
            let zipName = ClientID + "_" ;
            zipName += !LoanID || LoanID == ""?("General_"):(LoanID + "_");
            zipName += "Files.zip";

            // Generate the ZIP file and trigger download
            zip.generateAsync({type: "blob"}).then(content => {
                saveAs(content, zipName);
                setZipReady(false);
                setReadyForDownload(false);
            }).catch(err => {
                console.error("Failed to generate ZIP ", err);
                setZipReady(false);
                setReadyForDownload(false);
            });
        };

        if (readyForDownload && filesToZip.length > 0){
            downloadZip();
            setFilesToZip([]);
            setZipReady(false);
            setReadyForDownload(false);
        }
    }, [readyForDownload])

    return(
        <div>
            {!AdminID && (<PortalNavBar ClientID = {ClientID}/>)}

            <PageTitle pageName = {"Review - " + givenName + " "  + familyName} />

            <Container className = 'mx-3'>
                <h2><u><strong>Personal Information</strong></u></h2>

                <Container>
                    {Object.keys(personalInfo).map((fieldName, index) => (
                        <Row key = {index}>
                            <Col>
                                <p><strong>{fieldName}:</strong> </p>
                            </Col>
                            <Col>
                                <p>{personalInfo[fieldName]}</p>
                            </Col>
                        </Row>
                        
                    ))}
                </Container>

            </Container>

            <Container className = 'mx-3'>
                <h2><u><strong>Financial Information</strong></u></h2>

                <Container>
                    {Object.keys(financialInfo).map((fieldName, index) => (
                        <Row key = {index}>
                            <Col>
                                <p><strong>{fieldName}:</strong> </p>
                            </Col>
                            <Col>
                                <p>{financialInfo[fieldName]}</p>
                            </Col>
                        </Row>
                        
                    ))}
                </Container>

            </Container>

            {!clickedLoan && (
            <Container className = 'mx-3'>
                <h2><u><strong>Choose a loan</strong></u></h2>

                <Container>
                    {loanList.map((loan, index) => (
                        <Row key = {index}>
                            {loan.LoanID === "No Loans on File."? (
                                <p><strong>{loan.LoanID}</strong></p>
                            ):(
                               <a onClick={() => {handleLoanClick(loan)}}><strong>{loan.LoanID}</strong></a> 
                            )}
                            
                        </Row>                       
                    ))}
                </Container>

            </Container>
            )}

            {/* After a loan is clicked, dispaly the loan info */}
            {clickedLoan && loanInfoLoaded && (
            <Container className = 'mx-3'>
                <Row>
                    <Col>
                        <h2><u><strong>Loan Information - {LoanID}</strong></u></h2>
                    </Col>
                    <Col>
                        <SubmitButton text = "View a Different Loan" onClick = {handleBackToLoanList} />
                    </Col>
                    
                </Row>
                

                <Container>
                    {Object.keys(loanInfo).map((fieldName, index) => (
                        <Row key = {index}>
                            <Col>
                                <p><strong>{fieldName}:</strong> </p>
                            </Col>
                            <Col>
                                <p>{loanInfo[fieldName]}</p>
                            </Col>
                        </Row>
                        
                    ))}
                </Container>

            </Container>
            )}

            <Container className = 'mx-3'>
                <h2><u><strong>Files</strong></u></h2>

                <Button className="m-2" variant = "light" onClick = {handleDownloadZip}>Download Submitted Files</Button>

                <Container>
                    <Row>
                        <h3>Missing Files:</h3>
                    </Row>
                    {missingFiles.map((fileName, index) => (
                        <Row key = {index}>
                            <p><strong>- {fileName}</strong> </p>
                        </Row> 
                    ))}
                </Container>

                

            </Container>

        </div>
    );
    
};

export default Review;
