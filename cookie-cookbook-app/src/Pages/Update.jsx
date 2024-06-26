import React from 'react';
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Update = () => {
    const [recipeList, setRecipeList] = useState({"Banana":["Flour", "Sugar"], "Chocolate":["Oil", "Eggs"]})
    const [chosenRecipe, setChosenRecipe] = useState({})

    return (
        <>
            <DropdownButton variant = "secondary" id="dropdown-basic-button" title="Choose A Recipe">
            {Object.keys(recipeList).forEach(key => {
                <Dropdown.Item href="/About">{key}</Dropdown.Item>;     
            })}
            </DropdownButton>
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