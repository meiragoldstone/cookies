
/*import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CookieRecipeForm = () => {
  const [recipeName, setRecipeName] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const handleRecipeNameChange = (event) => {
    setRecipeName(event.target.value);
  };

  const handleIngredientChange = (event) => {
    setIngredient(event.target.value);
  };

  const handleAddIngredient = (event) => {
    event.preventDefault();
    if (ingredient.trim() !== '') {
      setIngredients([...ingredients, ingredient]);
      setIngredient('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Recipe Name: ${recipeName}\nIngredients: ${ingredients.join(', ')}`);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Enter Your Cookie Recipe</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="recipeName">Recipe Name</label>
              <input
                type="text"
                className="form-control"
                id="recipeName"
                placeholder="Enter recipe name"
                value={recipeName}
                onChange={handleRecipeNameChange}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="ingredient">Ingredient</label>
              <input
                type="text"
                className="form-control"
                id="ingredient"
                placeholder="Enter ingredient"
                value={ingredient}
                onChange={handleIngredientChange}
              />
            </div>
            <button
              type="button"
              className="btn btn-secondary mt-3"
              onClick={handleAddIngredient}
            >
              Add Ingredient
            </button>
            <ul className="list-group mt-3">
              {ingredients.map((item, index) => (
                <li key={index} className="list-group-item">
                  {item}
                </li>
              ))}
            </ul>
            <button type="submit" className="btn btn-primary mt-3">
              Submit Recipe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CookieRecipeForm; */

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CookieRecipeForm = () => {
  const [recipeName, setRecipeName] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState('');
  const [bakeTime, setBakeTime] = useState('');
  const [servings, setServings] = useState('');

  const handleRecipeNameChange = (event) => {
    setRecipeName(event.target.value);
  };

  const handleIngredientChange = (event) => {
    setIngredient(event.target.value);
  };

  const handleInstructionsChange = (event) => {
    setInstructions(event.target.value);
  };

  const handleBakeTimeChange = (event) => {
    setBakeTime(event.target.value);
  };

  const handleServingsChange = (event) => {
    setServings(event.target.value);
  };

  const handleAddIngredient = (event) => {
    event.preventDefault();
    if (ingredient.trim() !== '') {
      setIngredients([...ingredients, ingredient]);
      setIngredient('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Recipe Name: ${recipeName}\nIngredients: ${ingredients.join(', ')}\nInstructions: ${instructions}\nBake Time: ${bakeTime}\nServings: ${servings}`);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Enter Your Cookie Recipe</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="recipeName">Recipe Name</label>
              <input
                type="text"
                className="form-control"
                id="recipeName"
                placeholder="Enter recipe name"
                value={recipeName}
                onChange={handleRecipeNameChange}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="ingredient">Ingredient</label>
              <input
                type="text"
                className="form-control"
                id="ingredient"
                placeholder="Enter ingredient"
                value={ingredient}
                onChange={handleIngredientChange}
              />
            </div>
            <button
              type="button"
              className="btn btn-secondary mt-3"
              onClick={handleAddIngredient}
            >
              Add Ingredient
            </button>
            <ul className="list-group mt-3">
              {ingredients.map((item, index) => (
                <li key={index} className="list-group-item">
                  {item}
                </li>
              ))}
            </ul>
            <div className="form-group mt-3">
              <label htmlFor="instructions">Instructions</label>
              <textarea
                className="form-control"
                id="instructions"
                placeholder="Enter instructions"
                value={instructions}
                onChange={handleInstructionsChange}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="bakeTime">Bake Time</label>
              <input
                type="text"
                className="form-control"
                id="bakeTime"
                placeholder="Enter bake time"
                value={bakeTime}
                onChange={handleBakeTimeChange}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="servings">Number of Servings</label>
              <input
                type="text"
                className="form-control"
                id="servings"
                placeholder="Enter number of servings"
                value={servings}
                onChange={handleServingsChange}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Submit Recipe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CookieRecipeForm;
