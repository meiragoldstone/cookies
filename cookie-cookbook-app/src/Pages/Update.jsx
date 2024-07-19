import React from 'react';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

const Update = () => {        
    const [chosenRecipeData, setChosenRecipeData] = useState({Ingredients: "", Directions: ""});
    const [chosenRecipeId, setChosenRecipeId] = useState("");
    const [newItem, setNewItem] = useState("");
    const [responseMessage, setResponseMessage] = useState({variant: "", message: ""});
    const [isIngredient, setIsIngredient] = useState("False");
    const [ingredientList, setIngredientList] = useState([]);
    const [directionList, setDirectionList] = useState([]);
    const [clickedPreview, setClickedPreview] = useState(false);
    //const [allRecipes, setAllRecipes] = useState({});
    const [allRecipeNames, setAllRecipeNames] = useState([]);
    

    
    useEffect(() => {
        const fetchAllRecipeData = () => {
          try{
            const retrieveAllUrl = " https://lqtpgzkl41.execute-api.us-east-1.amazonaws.com/default/getAllCookies";
            fetch(retrieveAllUrl)
                .then(response => response.json())
                .then(data => {
                    //setAllRecipes(data);
                    console.log(data);
                    setAllRecipeNames(data.map(item => item.pk));
                }) 
        }
        catch{
            setAllRecipeNames(["Something went wrong when fetching the recipe names."]);
            console.log("Something went wrong when fetching the recipe names.");
        }
  
        } 
        fetchAllRecipeData();              
    }, [])
    

    const retrieveRecipe = async () => {
        setChosenRecipeData({ Ingredients: "", Directions: "" });
    
        const retrieveUrl = "https://lqtpgzkl41.execute-api.us-east-1.amazonaws.com/default/retrieveRecipe?recipeId=" + chosenRecipeId;
    
        try {
            const response = await fetch(retrieveUrl);
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            const data = await response.json();
            console.log(data);
            setChosenRecipeData({ Ingredients: data.list, Directions: data.directions });
            setIngredientList(data.list);
            setDirectionList(data.directions);
            console.log("ChosenRecipeData: ", chosenRecipeData);
        } catch (error) {
            console.error('Error retrieving recipe:', error);
        }
    };

    const updateRecipe = () => {
        setResponseMessage({});
        
        const params = {
            method: "POST",
            body: JSON.stringify({
                "isIngredient": {isIngredient},
                "newItem": {newItem}
            })
        }

        const updateUrl = "https://lqtpgzkl41.execute-api.us-east-1.amazonaws.com/default/updateRecipe?listId=" + chosenRecipeId + ",isIngredient=" + isIngredient;

        fetch(updateUrl, params)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok.");
                }
                return response.json();
            })

            .then(_ => {
                setResponseMessage({variant: 'success', message: `${chosenRecipeId} was updated successfully`});
            })

            .catch(_ => {
                setResponseMessage({variant: 'danger', message:`Error in updating ${chosenRecipeId}`});
            })
    }

    const HandleSelectChange = (event) => {
        console.log(event.target.value);
        setChosenRecipeId(event.target.value);     
    }

    useEffect(() => {
        if (chosenRecipeId !== ""){
            console.log("In handleSelectchange... ChosenRecipeId: ", chosenRecipeId)
            console.log("In Handle Select Change...");
            retrieveRecipe();
        
        }
        
    }, [chosenRecipeId])

    useEffect(() => {
        console.log("In second Use effect... ChosenRecipeData = " , chosenRecipeData);
        setIngredientList(chosenRecipeData.Ingredients || []);
        setDirectionList(chosenRecipeData.Directions || []);

        console.log("Ingredient List: ", ingredientList);
        
    }, [chosenRecipeData])

    useEffect(() => {
        setDirectionList(chosenRecipeData.Directions || []);
        console.log("Direction List: " , directionList)
    }, [chosenRecipeData])

    const handleFormControlChange = (event) => {
        setNewItem((event.target.value));
        
    }

    const handleButtonPreview = (event) => {
        setNewItem(newItem.trim())
        if (newItem !== ""){
            if (isIngredient == "True"){
                if (chosenRecipeData.Ingredients){
                    setIngredientList([...chosenRecipeData.Ingredients, newItem]);
                }else{
                    setIngredientList([newItem]);
                }  
                setClickedPreview(true);
            }else if (isIngredient == "False"){
                if (chosenRecipeData.Directions){
                    setDirectionList([...chosenRecipeData.Directions, newItem]); 
                }else{
                    setDirectionList([newItem])
                }
                setClickedPreview(true);
            }else{
                console.log("ERROR: MUST SPECIFY IF THIS IS AN INGREDIENT OR DIRECTION")
            }
        } 
    }
    
     const handleButtonSave = (event) => {
        if (!clickedPreview){
            handleButtonPreview();
        }
        setChosenRecipeData({Ingredients:ingredientList, Directions:directionList});
        updateRecipe();
     }


    return (
        <>
            <Container>
                <Row className = "m-5 text-center">
                    <Col><h1>Update</h1></Col>
                </Row>

                <Row className = "m-5">
                    <Col className = "m-2">
                        <Form.Select aria-label="Default select example" defaultValue="title" size="lg" onChange = {(event) => HandleSelectChange(event)}>
                            <option value = "title" disabled >Choose A Recipe</option>
                            {allRecipeNames.map((recipe, index) => (
                                <option key = {index} value={Object.values(recipe).pk} >{Object.values(recipe)}</option>)    
                            )}

                        </Form.Select>
                    </Col>
                </Row>

                <Row className = "m-4">
                    <Col className = "m-2">
                        <Card style={{ width: '100%' }} >
                            <Card.Title className = 'm-2'>{chosenRecipeId}</Card.Title>
                            <Card.Subtitle className = 'm-2'>Ingredients</Card.Subtitle>
                            <Card.Text className = 'm-2'>
                                {ingredientList && ingredientList.map((ingredient, index) => (
                                    <li key = {index}>{Object.values(ingredient)}</li>)
                                )}
                            </Card.Text>
                            <Card.Subtitle className = 'm-2'>Directions</Card.Subtitle>
                            <Card.Text className = 'm-2'>
                                {directionList && directionList.map((direction, index) => (
                                    <li key = {index}>{Object.values(direction)}</li>)
                                )}
                            </Card.Text>
                        </Card>
                    </Col>
                    <Col className = "m-2">
                        <Container>
                            <Row>
                                <Col>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>To add an ingredient or set of directions to this recipe, type the desired addition below, preview your changes and then click SAVE CHANGES.</Form.Label>
                                            <Form.Control as="textarea" rows={3} placeholder="Enter your addition here" onChange={handleFormControlChange} value = {newItem}/>
                                        </Form.Group>
                                        
                                        <Form.Group className='mb-3'>
                                           <Form.Check
                                                type="radio"
                                                name="isIngredient"
                                                id="Ingredient"
                                                label="Ingredient"

                                                onClick={() => {setIsIngredient("True")}}
                                            /> 
                                            <Form.Check
                                                type="radio"
                                                name="isIngredient"
                                                id="Directions"
                                                label="Direction"

                                                onClick={() => {setIsIngredient("False")}}
                                            />
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
                        <Alert variant={responseMessage.variant} onClose = {() => setResponseMessage("")}>{responseMessage.message}</Alert>
                    </Col>
                </Row>
            </Container>



            

            

            
            
        </>

    );
}

export default Update;