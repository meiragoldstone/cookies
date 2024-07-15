import React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

const Update = () => {
    const [recipeList, setRecipeList] = useState({})
    const [chosenRecipe, setChosenRecipe] = useState({})
    const [chosenRecipeId, setChosenRecipeId] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [isIngredient, setIsIngredient] = useState("False");
    const [responseMessage, setResponseMessage] = useState({variant: "", message: ""});

    const handleSelectChange = (event) => {
        const selectedKey = event.target.value;
        const recipe = recipeList.find(item => Object.keys(item)[0] === selectedKey);
        setChosenRecipe(recipe);
    }

    const handleFormControlChange = (event) => {
        setInputValue(event.target.value);

    }

    const handleButtonPreview = (event) => {
        if (inputValue.trim() !== ""){
            const recipeName = Object.keys(chosenRecipe)[0];
            const additionKey = Object.values(chosenRecipe[recipeName]).length + 1;

            const newRecipeList = [...chosenRecipe[recipeName], {[additionKey]:inputValue}];
            const updatedRecipe = {[recipeName]:newRecipeList};

            setChosenRecipe(updatedRecipe);
        }

        // clear form control after add the input
        setInputValue("");

    }

    const handleButtonSave = (event) => {
        setResponseMessage({});
        const queryString = "?listId=" + chosenRecipeId;

        const params = {
            method: 'GET',
            body: JSON.stringify({
                isIngredient: isIngredient,
                newItem: inputValue,
            })
        }

        const apiUrl = "https://lqtpgzkl41.execute-api.us-east-1.amazonaws.com/default/updateRecipe" + queryString;

        fetch(apiUrl, params)
            .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(_ => {
            setResponseMessage({variant: 'success', message: `${chosenRecipeId} was updated successfully`});
          })
          .catch(_ => {
            setResponseMessage({variant: 'danger', message:`Error in updating ${chosenRecipeId}`});
          });


        // const updatedRecipeList = recipeList.map(recipe => {
        //     const recipeName = Object.keys(recipe)[0];
        //     if (recipeName === Object.keys(chosenRecipe)[0]){
        //         return chosenRecipe;
        //     }
        //     else{
        //         return recipe;
        //     }
        // });

        // setRecipeList(updatedRecipeList);

        // setSaveSuccessMsg("The recipe for " + Object.keys(chosenRecipe)[0] + " was successfully updated and saved!");
        // setTimeout(() => {
        //     setSaveSuccessMsg("");
        // }, 60000);


        // updatedRecipeList.map(recipe => {
        //     console.log(recipe);
        // })
        
    }


    return (
        <>
            <Container>
                <Row className = "m-5">
                    <Col className = "m-2">
                        <Form.Select aria-label="Default select example" size="lg" onChange = {(event) => handleSelectChange(event)}>
                            <option disabled>Choose A Recipe</option>
                            {recipeList.map((recipe, index) => (
                                <option key = {index} value={Object.keys(recipe)[0]} >{Object.keys(recipe)[0]}</option>)    
                            )}

                        </Form.Select>
                    </Col>
                </Row>

                <Row className = "m-4">
                    <Col className = "m-2">
                        <Card style={{ width: '100%' }}>
                            <Card.Header>{Object.keys(chosenRecipe)[0]}</Card.Header>
                            <ListGroup variant="flush">
                                {chosenRecipe[Object.keys(chosenRecipe)[0]].map((ingredients, index) => (
                                    <ListGroup.Item key = {index}>{Object.values(ingredients)}</ListGroup.Item>)
                                    
                                )}
                            </ListGroup>
                        </Card>
                    </Col>
                    <Col className = "m-2">
                        <Container>
                            <Row>
                                <Col>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>To add an ingredient or set of directions to this recipe, type the desired addition below, preview your changes and then click SAVE CHANGES.</Form.Label>
                                            <Form.Control as="textarea" rows={3} placeholder="1/2 Cup Something Sweet" onChange={handleFormControlChange} value = {inputValue}/>
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Button variant="dark" onClick={handleButtonPreview}>PREVIEW</Button>
                                </Col>
                                <Col>
                                    <Button variant="dark" onClick={handleButtonSave}>SAVE CHANGES</Button>
                                </Col>
                            </Row>
                        </Container>           
                    </Col>
                </Row>

                <Row className="mt-5">
                    <Col>
                        <Alert variant={responseMessage.variant} onClose = {() => setResponseMessage("")} dismissable>{responseMessage.message}</Alert>
                    </Col>
                </Row>

{/* 
                <Row>
                    <Col>
                        {saveSuccessMsg &&
                            <Alert variant="success" onClose={() => setSaveSuccessMsg("")} dismissible>
                                {saveSuccessMsg}
                            </Alert>
                        }     
                    </Col>
                </Row> */}
            </Container>



            

            

            
            
        </>

    );
}

export default Update;