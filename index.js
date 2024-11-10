const search_box = document.querySelector('.searchBox'); 
const search_btn = document.querySelector('.searchButton'); 
const recipe_container = document.querySelector('.container'); 
const fullRecipecntn = document.querySelector('.fullRecipeContent'); 
const fullRecipeClose = document.querySelector('.closePopup'); 

const fetchRecipes = async (serchvalue) =>{
    recipe_container.innerHTML = "Fetching Recipes";
    try{
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${serchvalue}`);
        const response = await data.json();
    
        recipe_container.innerHTML = "";
        response.meals.forEach(meal => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipeDiv');
            recipeCard.innerHTML = `
                <img src="${meal.strMealThumb}">
                <h3>${meal.strMeal}</h3>
                <p><b>${meal.strArea}</b> Dish</p>
                <p>Belongs to <b>${meal.strCategory}</b> Category</p>
            `
            const readRecipeBtn = document.createElement('button');
            readRecipeBtn.classList.add('readBtn');
            readRecipeBtn.textContent = "View Recipe";
    
            recipe_container.appendChild(recipeCard);
            recipeCard.appendChild(readRecipeBtn);
    
            readRecipeBtn.addEventListener('click', (e)=>{
                openRecipePopup(meal);
            });
        });
    }
    catch(error){
        recipe_container.innerHTML = "<h2>Error in Fetching Recipes</h2>";
    }

}
const fetchIngredient = (meal) => {
    let ingredientList = "";
    for(let i=1; i<=20; i++) {
        const ingredients = meal[`strIngredient${i}`];
        if(ingredients){
            const measure = meal[`strMeasure${i}`];
            ingredientList += `<li>${measure} - ${ingredients}</li>`
        }else{
            break;
        }
    }
    return ingredientList;
}
const openRecipePopup = (meal) => {
    fullRecipecntn.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <h3>Ingredients</h3>
        <ul>${fetchIngredient(meal)}</ul>
        <h3>Instructions</h3>
        <p>${meal.strInstructions}</p>
    `
    fullRecipecntn.parentElement.parentElement.style.display = 'flex';
}
fullRecipeClose.addEventListener('click', (e)=>{
    fullRecipeClose.parentElement.parentElement.style.display = 'none';
});
search_btn.addEventListener('click', (e)=>{
    e.preventDefault();
    const searchInput = search_box.value.trim();
    if(!searchInput){
        recipe_container.innerHTML = "<h2>Type in the search box to find the recipe of the meal</h2>";
        return;
    }
    fetchRecipes(searchInput);
});
