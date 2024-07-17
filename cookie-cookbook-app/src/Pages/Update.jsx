import React from 'react';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
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
    const [allRecipes, setAllRecipes] = useState({});
    const [allRecipeNames, setAllRecipeNames] = useState([]);
    

    
    useEffect(() => {
        const fetchAllRecipeData = () => {
          try{
            const retrieveAllUrl = " https://lqtpgzkl41.execute-api.us-east-1.amazonaws.com/default/getAllCookies";
            fetch(retrieveAllUrl)
                .then(response => response.json())
                .then(data => {
                    setAllRecipes(data);
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

    
    console.log("AllRecipeNames: ");
    console.log(allRecipeNames);
    

    const retrieveRecipe = () => {
        console.log("In retrieve Recipe...");

        // const recipe = chosenRecipeData?.map((item, index) => {
        //     return <li key = {index}>{item}</li>
        // });

        const retrieveUrl = "https://lqtpgzkl41.execute-api.us-east-1.amazonaws.com/default/retrieveRecipe?recipeId=" + chosenRecipeId
        fetch(retrieveUrl)
            .then(response => response.json())
            .then(data => {
                setChosenRecipeData({Ingredients:data.list, Directions:data.directions})
                console.log("ChosenRecipeData: ", chosenRecipeData);
                // setIngredientList(data.list);
                // console.log("Ingredient List: ", ingredientList);
                // setDirectionList(data.directions);
            })
            .catch(error => {
                console.error('Error retrieving recipe:', error)
            });  


        
        console.log("ChosenRecipeData: ", chosenRecipeData);
        console.log("Ingredient List: ", ingredientList);
        
    }

    const updateRecipe = () => {
        setResponseMessage({});
        
        const params = {
            method: "POST",
            body: JSON.stringify({
                isIngredient: isIngredient,
                newItem: newItem
            })
        }

        const updateUrl = "https://lqtpgzkl41.execute-api.us-east-1.amazonaws.com/default/updateRecipe?listId=" + chosenRecipeId;

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


    // const [recipeList, setRecipeList] = useState({})
    // const [chosenRecipe, setChosenRecipe] = useState({})
    // const [chosenRecipeId, setChosenRecipeId] = useState("");
    // const [inputValue, setInputValue] = useState("");
    // const [isIngredient, setIsIngredient] = useState("False");
    // const [responseMessage, setResponseMessage] = useState({variant: "", message: ""});

    const handleSelectChange = (event) => {
        console.log(event.target.value);
        setChosenRecipeId(event.target.value);
        console.log("In Handle Select Change...");
        retrieveRecipe();
        setIngredientList(chosenRecipeData.list);
        console.log("Ingredient List: ", ingredientList);
        setDirectionList(chosenRecipeData.directions);
        
        // const selectedKey = event.target.value;
        // const recipe = recipeList.find(item => Object.keys(item)[0] === selectedKey);
        // setChosenRecipe(recipe);
    }

    const handleFormControlChange = (event) => {
        setNewItem((event.target.value).trim());
        
    }

    const handleButtonPreview = (event) => {
        if (newItem !== ""){
            if (isIngredient == "True"){
                setIngredientList(chosenRecipeData.Ingredients.concat(newItem)); 
                setClickedPreview(true);
            }else if (isIngredient == "False"){
                setDirectionList(chosenRecipeData.Directions.concat(newItem)); 
                setClickedPreview(true);
            }else{
                console.log("ERROR: MUST SPECIFY IF THIS IS AN INGREDIENT OR DIRECTION")
            }
        } 
     }
    // Old Handle Button Preview---------------------------------------------------
    //     if (newItem !== ""){
    //         // const recipeName = Object.keys(chosenRecipe)[0];
    //         // const additionKey = Object.values(chosenRecipe[recipeName]).length + 1;

    //         const newRecipeList = [...chosenRecipe[recipeName], {[additionKey]:inputValue}];
    //         const updatedRecipe = {[recipeName]:newRecipeList};

    //         setChosenRecipe(updatedRecipe);
    //     }

    //     // clear form control after add the input
    //     setInputValue("");

     const handleButtonSave = (event) => {
        if (!clickedPreview){
            handleButtonPreview();
        }
        setChosenRecipeData({Ingredients:ingredientList, Directions:directionList});
        updateRecipe();
     }

    //region Old Code
    // const handleButtonSave = (event) => {
    //     setResponseMessage({});

    //     const params = {
    //         method: 'GET',
    //         body: JSON.stringify({
    //             isIngredient: isIngredient,
    //             newItem: inputValue,
    //         })
    //     }

    //     const apiUrl = "https://lqtpgzkl41.execute-api.us-east-1.amazonaws.com/default/updateRecipe" + queryString;

    //     fetch(apiUrl, params)
    //         .then(response => {
    //         if (!response.ok) {
    //           throw new Error('Network response was not ok');
    //         }
    //         return response.json();
    //       })
    //       .then(_ => {
    //         setResponseMessage({variant: 'success', message: `${chosenRecipeId} was updated successfully`});
    //       })
    //       .catch(_ => {
    //         setResponseMessage({variant: 'danger', message:`Error in updating ${chosenRecipeId}`});
    //       });


    //     // const updatedRecipeList = recipeList.map(recipe => {
    //     //     const recipeName = Object.keys(recipe)[0];
    //     //     if (recipeName === Object.keys(chosenRecipe)[0]){
    //     //         return chosenRecipe;
    //     //     }
    //     //     else{
    //     //         return recipe;
    //     //     }
    //     // });

    //     // setRecipeList(updatedRecipeList);

    //     // setSaveSuccessMsg("The recipe for " + Object.keys(chosenRecipe)[0] + " was successfully updated and saved!");
    //     // setTimeout(() => {
    //     //     setSaveSuccessMsg("");
    //     // }, 60000);


    //     // updatedRecipeList.map(recipe => {
    //     //     console.log(recipe);
    //     // })
        
    // }
    //endregion


    return (
        <>
            <Container>
                <Row className = "m-5 text-center">
                    <Col><h1>Update</h1></Col>
                </Row>

                <Row className = "m-5">
                    <Col className = "m-2">
                        <Form.Select aria-label="Default select example" defaultValue="title" size="lg" onChange = {(event) => handleSelectChange(event)}>
                            <option value = "title" disabled >Choose A Recipe</option>
                            {allRecipeNames.map((recipe, index) => (
                                <option key = {index} value={Object.values(recipe).pk} >{Object.values(recipe)}</option>)    
                            )}

                        </Form.Select>
                    </Col>
                </Row>

                <Row className = "m-4">
                    <Col className = "m-2">
                        <Card style={{ width: '100%' }}>
                            <Card.Title>{chosenRecipeId}</Card.Title>
                            <Card.Subtitle>Ingredients</Card.Subtitle>
                            <Card.Text>
                                {ingredientList && ingredientList.map((ingredient, index) => (
                                    <li key = {index}>{Object.values(ingredient)}</li>)
                                )}
                            </Card.Text>
                            <Card.Subtitle>Directions</Card.Subtitle>
                            <Card.Text>
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
                                        
                                        <Form.Group>
                                           <Form.Check
                                                type="radio"
                                                name="isIngredient"
                                                id="Ingredient"
                                                label="Ingredient"
                                            /> 
                                            <Form.Check
                                                type="radio"
                                                name="isIngredient"
                                                id="Directions"
                                                label="Direction"
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
                        <Alert variant={responseMessage.variant} onClose = {() => setResponseMessage("")} dismissable="true">{responseMessage.message}</Alert>
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