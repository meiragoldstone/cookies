import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CookieRecipeForm = () => {
  const [recipeId, setRecipeId] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [recipe, setRecipe] = useState([]);
  const [instructions, setInstructions] = useState('');

  const handleRecipeIdChange = (event) => {
    setRecipeId(event.target.value);
  };

  const handleIngredientChange = (event) => {
    setIngredient(event.target.value);
  };

  const handleInstructionsChange = (event) => {
    setInstructions(event.target.value);
  };

  const handleAddIngredient = (event) => {
    event.preventDefault();
    if (ingredient.trim() !== '') {
      setRecipe([...recipe, ingredient]);
      setIngredient('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const recipeData = {
      recipeId: recipeId,
      recipe: recipe,
      instructions: instructions
    };

    try {
      const response = await fetch(' https://lqtpgzkl41.execute-api.us-east-1.amazonaws.com/default/createRecipe', {
        method: 'POST',
        
        body: JSON.stringify(recipeData)
      });

      if (response.ok) {
        const data = await response.json();
        alert('Recipe submitted successfully!');
        console.log(data);
        // Clear form fields after successful submission
        setRecipeId('');
        setRecipe([]);
        setInstructions('');
      } else {
        alert('Failed to submit recipe');
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      alert('Failed to submit recipe');
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Enter Your Cookie Recipe</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="recipeId">Recipe ID</label>
              <input
                type="text"
                className="form-control"
                id="recipeId"
                placeholder="Enter recipe ID"
                value={recipeId}
                onChange={handleRecipeIdChange}
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
              {recipe.map((item, index) => (
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

