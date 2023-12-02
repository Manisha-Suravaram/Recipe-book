// RecipeList.js
import React, { useState, useEffect } from 'react';
import '../App.css';
import Search from './Search';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/recipes')
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
        setFilteredRecipes(data);
      });
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  return (
    <div className="container">
      <h1>Recipe Book</h1>
      <Search handleSearch={handleSearch} />
      <div className="recipe-container">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe">
            <img src={recipe.image} alt={recipe.title} />
            <h2>{recipe.title}</h2>
            <p><b>Ingredients:</b> {recipe.ingredients.join(', ')}</p>
            <p><b>Instructions:</b> {recipe.instructions}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;


