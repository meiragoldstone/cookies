import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, {useState, useEffect} from 'react';

function FilesModal(props) {
    const ClientID = props.ClientID;
    const LoanID = props.LoanID;
    const fieldName = props.fieldName;
    const [filePaths, setFilePaths] = useState();
    const [chosenFile, setChosenFile] = useState();


    // Fetch loan file list
    useEffect(() => {
        const getFileInfo = async() => {
            try {
                const response = await fetch(`https://f0ll5x1c4l.execute-api.us-east-1.amazonaws.com/getLoanInfo`, {
                  "method": "POST",
                  "body": JSON.stringify({
                    "ClientID":ClientID,
                    "LoanID": LoanID
                  })
                });
                if (!response.ok) {
                    alert("Something went wrong when trying to get the file from ", LoanID, ". File not loaded.")
                }else{
                    const data = await response.json();
                    if (data && !data == []){
                      // Save the filepath from loan to item.value
                      setFilePaths([...data['LoanFiles'][fieldName]]);
                    }else{
                        console.error("An error occured while trying to get a file from another loan. Data empty.")
                    }
                }
            }catch (error){
                console.error("An error occured while trying to get a file from another loan. Error: ", error)
                alert("An error occured while trying to get a file from another loan.")
            }
        }

        getFileInfo();
    }, [])
    

  return (
    <Modal
      show = {props.modalShow}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            {LoanID}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
            {filePaths && filePaths.map((filePath, index) => (
                <li key = {index}><a onClick = {() => {setChosenFile(filePath)}}>{filePath}</a></li>
            ))}            
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={() => props.onUseFile(chosenFile)}>Use File</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FilesModal;