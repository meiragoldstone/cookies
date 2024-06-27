import React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const Update = () => {
    const [recipeList, setRecipeList] = useState([{"Banana":[{1:"Flour"}, {2:"Sugar"}]}, {"Chocolate":[{1:"Oil"}, {2:"Eggs"}]}])
    const [chosenRecipe, setChosenRecipe] = useState({"Sample Recipe":[{1:"something sweet"}, {2:"something spicy"}]})

    const handleSelectChange = (event) => {
        const selectedKey = event.target.value;
        const recipe = recipeList.find(item => Object.keys(item)[0] === selectedKey);
        setChosenRecipe(recipe);
    }

    const handleButtonClick = (event) => {
        

    }

    const handleFormControlChange = (event) => {
        const addition = event.target.value;
        const additionKey = Object.values(chosenRecipe).length + 2
        const recipeName = Object.keys(chosenRecipe)[0]
        const newRecipeList = [...Object.values(chosenRecipe), {additionKey:addition}]
        const updatedRecipe = {recipeName:newRecipeList}

        console.log("addition: ", addition);
        console.log("additionKey: ", additionKey);
        console.log("recipeName: ", recipeName);
        console.log("newRecipeLsit: ", newRecipeList);


        setChosenRecipe(updatedRecipe);
    }

    return (
        <>
            <Form.Select aria-label="Default select example" size="lg" onChange = {(event) => handleSelectChange(event)}>
                <option disabled>Choose A Recipe</option>
                {recipeList.map((recipe, index) => (
                    <option key = {index} value={Object.keys(recipe)[0]} >{Object.keys(recipe)[0]}</option>)    
                )}

            </Form.Select>

            <Card style={{ width: '50%' }}>
                <Card.Header>{Object.keys(chosenRecipe)[0]}</Card.Header>
                <ListGroup variant="flush">
                    {chosenRecipe[Object.keys(chosenRecipe)[0]].map((ingredients, index) => (
                        <ListGroup.Item key = {index}>{Object.values(ingredients)}</ListGroup.Item>)
                        
                    )}
                </ListGroup>
            </Card>

            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>To add an ingredient or set of directions to this recipe, type the desired addition below and press UPDATE RECIPE.</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="1/2 Cup Something Sweet" onChange={handleFormControlChange}/>
                </Form.Group>
            </Form>

            <Button variant="dark" onClick={handleButtonClick}>UPDATE RECIPE</Button>

        </>

//         // Loop through each key in the itemsObject
// Object.keys(itemsObject).forEach(key => {
//     console.log(`Key: ${key}`);
//     // Access the array of items for each key
//     itemsObject[key].forEach(item => {
//       console.log(`Item: ${item}`);
//     });
//   });

        // <>
        //     <h1>Cookie Cookbook</h1>
        //     <p>
        //         This is the update page of the cookie cookbook website. 
        //     </p>
        // </>
    );
}

export default Update;