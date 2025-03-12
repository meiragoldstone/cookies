import React, {useState, useEffect} from 'react';
import PageTitle from '../../Components/PageTitle';
import SubmitButton from '../../Components/Button';
import { Alert, Row, Container, Card, Col } from 'react-bootstrap';
import {useAuth } from 'react-oidc-context';
import { CognitoIdentityProviderClient, ListUsersCommand, DeleteUserCommand } from "@aws-sdk/client-cognito-identity-provider";
import GlobalVar from '../../Data/GlobalVar';
import Review from '../Portal/Review';
import SloganHeader from '../../Components/SloganHeader';

const ClientList = (props) => {
    const [allClients, setAllClients] = useState([]);
    const AdminID = props.AdminID;
    const [chosenClient, setChosenClient] = useState(null);


    useEffect (() => {
        const getAllClients = async () => {
            try {
                // const response = await client.send(command);
                const response = await fetch(" https://f0ll5x1c4l.execute-api.us-east-1.amazonaws.com/getUserPoolList", {
                    "method": "POST",
                    "body":JSON.stringify({
                        "UserPoolID":GlobalVar.USER_POOL_ID
                    })
                })
                if (response.ok){
                    const data = await response.json();
                    let tempClientList = [];
                    data.map((client) => {
                        if (!GlobalVar.administrators.includes(client.userName)){
                            tempClientList.push({...client})
                        }
                    })
                    setAllClients(tempClientList); 
                }else{
                    console.error("Something went wrong when getting a list of all the users.")
                }
           
            }catch (error){
                        console.log("Something went wrong when getting a list of all the users. ", error)
            }

        };
        getAllClients();
    }, []);

    const handleViewData = (client) => {
        setChosenClient(client.sub);
    };
    const handleReturnToClientList = () => {
        setChosenClient(null);
    }

    
    const handleDelete = (async (client) => {
        const input = {AccessToken: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_RlqF6vfLU/.well-known/jwks.json"};
        const command = new DeleteUserCommand(input);
        try{
            const response = await client.send(command);

            if (response.ok){
                alert("Client Deleted.")
            }else{
                alert("Something went wrong when trying to delete the client.");
            }

        }catch (error){
            console.log("something went wrong when trying to delete the client", error)
        }
    })

    return(
        <div className='align-items-center'>
            {!chosenClient && (<div>
                <Row className='align-items-center'>
                    <SloganHeader />
                </Row> 
                <Row className = "align-items-center">
                    <PageTitle pageName = "Clients" />
                </Row>
                <Row>
                    <Container>
                    {allClients.map((client, index) => (
                        <Card key = {index} className = "w-48 m-2 p-2">
                            <Card.Title>{client.givenName + " " + client.familyName}</Card.Title>
                            <p>Email: {client.email}</p>
                            <SubmitButton text = "View Data" onClick = {() => handleViewData(client)} />
                        </Card>
                    ))}
                    </Container>
                </Row>    
            </div>
        )}

        {chosenClient && (
            <div>
                <Review ClientID = {chosenClient} AdminID = {AdminID}/>

                <SubmitButton text = "Return to list of clients" onClick = {handleReturnToClientList} />
            </div>
        )}

        </div>
    );
};

export default ClientList;