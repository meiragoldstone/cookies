import React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const Update = () => {
    const [recipeList, setRecipeList] = useState([{key:"Banana", value:{1:"Flour", 2:"Sugar"}}, {key:"Chocolate", value:{1:"Oil", 2:"Eggs"}}])
    const [chosenRecipe, setChosenRecipe] = useState({})

    const handleSelectChange = (event) => {
        setChosenRecipe(event.target.value);

        return (
            <>
                <Card style={{ width: '50%' }}>
                <Card.Header>{Object.keys(chosenRecipe)[0]}</Card.Header>
                <ListGroup variant="flush">
                    {Object.valules(chosenRecipe).map((ingredient) => (
                    <option key = {ingredient.key} value={recipe} >{recipe.key}</option>)    
                    )}
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
                </Card>
            </>
        )
    }

    return (
        <>
            <Form.Select aria-label="Default select example" size="lg" onChange = "handleSelectChange(event)">
                <option>Choose A Recipe</option>
                {recipeList.map((recipe) => (
                    <option key = {recipe.key} value={recipe} >{recipe.key}</option>)    
                )}

            </Form.Select>
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