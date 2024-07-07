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
    const [recipeList, setRecipeList] = useState([{"Banana":[{1:"Flour"}, {2:"Sugar"}]}, {"Chocolate":[{1:"Oil"}, {2:"Eggs"}]}])
    const [chosenRecipe, setChosenRecipe] = useState({"Sample Recipe":[{1:"First Ingredient"}, {2:"Second Ingredient"}]})
    const [inputValue, setInputValue] = useState("");
    const [clickedPreview, setClickedPreview] = useState(false);
    const [saveSuccessMsg, setSaveSuccessMsg] = useState("");

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

            setClickedPreview(true);
        }

        // clear form control after add the input
        setInputValue("");

    }

    const handleButtonSave = (event) => {
        if (!clickedPreview){
            handleButtonPreview();
        }

        const updatedRecipeList = recipeList.map(recipe => {
            const recipeName = Object.keys(recipe)[0];
            if (recipeName === Object.keys(chosenRecipe)[0]){
                return chosenRecipe;
            }
            else{
                return recipe;
            }
        });

        setRecipeList(updatedRecipeList);

        setSaveSuccessMsg("The recipe for " + Object.keys(chosenRecipe)[0] + " was successfully updated and saved!");
        setTimeout(() => {
            setSaveSuccessMsg("");
        }, 60000);


        updatedRecipeList.map(recipe => {
            console.log(recipe);
        })

        setClickedPreview(false);

    }



    return (
        <>
            <Container>
                <Row className = "m-5">
                    <Col className = "m-2">
                        <Form.Select aria-label="Default select example" size="lg" onChange = {(event) => handleSelectChange(event)}>
                            <option disabled selected >Choose A Recipe</option>
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
                                            <Form.Control as="textarea" rows={3} placeholder="Enter your addition here" onChange={handleFormControlChange} value = {inputValue}/>
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

                <Row>
                    <Col>
                        {saveSuccessMsg &&
                            <Alert variant="success" onClose={() => setSaveSuccessMsg("")} dismissible>
                                {saveSuccessMsg}
                            </Alert>
                        }     
                    </Col>
                </Row>
            </Container>



            

            

            
            
        </>

    );
}

export default Update;