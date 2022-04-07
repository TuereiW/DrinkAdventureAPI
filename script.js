console.log("jS is working");
const searchBtn = document.getElementById('search-btn');
const drinkList = document.getElementById('drink');
const drinkDetailsContent = document.querySelector('.drink-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const recipeBtn = document.querySelector('.recipe-btn');

//event Listeners

searchBtn.addEventListener ('click', getDrinkList) ;
drinkList.addEventListener ('click', getDrinkRecipe) ;
recipeCloseBtn.addEventListener( 'click', () => {
drinkDetailsContent.parentElement.classList.remove('showRecipe');
recipeBtn.addEventListener('click', drinkRecipeModal) ;
}) ;


// get drink list that matches with ingredients 

function getDrinkList() { 
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then( response => response.json())
    .then(data => {
        let html = "";
        if(data.drinks) {
            data.drinks.forEach(drink => {
                html += `
                  <div class = "drink-item"  data-id = "${drink.idDrink}">
                      <div class = "drink-img">
                         <img src = "${drink.strDrinkThumb}" alt = "drink">
                </div>
                <div class = "drink-name">
                     <h3>${drink.strDrink}</h3>
                     <a href = "#" class = "recipe-btn"> Get Recipe </a>
                </div>
              </div> 

            `;

        });
        drinkList.classList.remove('notFound') ;
    } else {
        html = "Sorry, we did not find a drink that matches this item! " ;
        drinkList.classList.add( 'notFound') ;

    }


    drinkList.innerHTML = html; 
    
    });

}


// get recipe of the drink
function getDrinkRecipe(e) {
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let drinkItem = e.target.parentElement.parentElement;
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${drinkItem.dataset.id}`)
        .then(response => response.json())
        .then(data => drinkRecipeModal(data.drinks));
    }

}







// create a modal 
function drinkRecipeModal(drinks){
   console.log("modal open");
    console.log(drinks);
//    drink = drink[0];
    let html = `
    // <h2 class = "recipe-title">${drinks.strDrink}</h2>
        <p class = "recipe-category">${drinks.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${drinks.strInstructions}</p>
        </div>
        <div class = "recipe-drink-img">
            <img src = "${drinks.DrinkThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${drinks.strVideo}" target = "_blank"> Watch Video </a>
        </div>
    `;
    drinkDetailsContent.innerHTML = html;
    drinkDetailsContent.parentElement.classList.add('showRecipe');
}
    

    
  


