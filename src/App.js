import './App.css'
import React, { useState } from 'react'

// need to relearn this
// Default drink with recipe / cocktail name 
// Search bar on top with functionality that autofills potential cocktails

const App = () => {

  const [cocktail, setCocktail] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

  // ...
  
  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(`${baseUrl}${searchTerm}`);
  //     if (!response.ok) {
  //       throw new Error('Network response not working');
  //     }
  //     const data = await response.json();
  //     console.log(data);
  //     setCocktail(data.drinks[0]);
  //     console.log('Fetched Data:', data);
  //   } catch (error) {
  //     console.error("Error fetching:", error);
  //   }
  // };
  
  
  const handleSearchChange = async (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  
    if (newSearchTerm) {
      try {
        const response = await fetch(`${baseUrl}${newSearchTerm}`);
        if (!response.ok) {
          throw new Error('Network response not working');
        }
        const data = await response.json();
        console.log(data);
        setSearchResults(data.drinks || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

 
  const getIngredientsList = (cocktail) => {
    const ingredients = [];
  
    for (let i = 1; i <= 15; i++) {
      const ingredientKey = `strIngredient${i}`;
      const measureKey = `strMeasure${i}`;
  
      if (cocktail[ingredientKey]) {
        const ingredient = cocktail[ingredientKey];
        const measure = cocktail[measureKey] || '';
  
        ingredients.push(`${measure} ${ingredient}`);
      }
    }
  
    return ingredients;
  }

  const handleResultClick = (result) => {
    setCocktail(result); // Update the cocktail details based on the clicked result
    setSearchTerm(result.strDrink); // Update the search input with the clicked result
    setSearchResults([]); // Clear the dropdown list
  }
  
  


  return (
    <>
      <div className="app-container">
        <input
          type="text"
          placeholder="Search cocktails..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={() => searchResults.length > 0 && setCocktail(searchResults[0])}>Recipe</button>
        


        {searchResults.length > 0 && (
          <ul className="search-results">
            {searchResults.map((result) => (
              <li key={result.idDrink} onClick={() => handleResultClick(result)}>
              {result.strDrink}
            </li>
            ))}
          </ul>
        )}
        {cocktail && (
          <>
            <div className="cocktail-details">
              <img className="image" src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
              <div className="cocktail-name-container">
                <h2>{cocktail.strDrink}</h2>
              </div>
              <div className="ingredient-container">
                <h3>Ingredients:</h3>
                <ul>
                  {getIngredientsList(cocktail).map((ingredient, index) => (
                    <li className="ingredient-list" key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div className="instructions-container">
                <h3>Instructions:</h3>
                <p className="instructions">{cocktail.strInstructions}</p>
              </div>
           </div>
            </>




          
)}

      </div>
    </>
  )
}

    

export default App
