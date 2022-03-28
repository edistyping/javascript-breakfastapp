

var items = document.getElementsByClassName("container-grid-items");

// Searching for an item
// 
const API_KEY = SPOONACULAR_API_KEY;
async function getKoreanReceipts() {

    var url = "https://api.spoonacular.com/recipes/complexSearch?query=korea";
    var finalURL = url + `&apiKey=${API_KEY}`

    const response = await fetch(finalURL)
    .then(response => response.json())
    .then(data => {
        return data
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    return response;
}


// Filtering by category/types

// Search button  
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", async () => {
    console.log("searchButton!");
    const response = await getKoreanReceipts();
    const results = response.results;
    console.log(response.results);

    
    for(i = 1; i < results.length; i++){ 

        document.getElementById("header-dishname").innerHTML = results[i].title;
        document.getElementById("img-dish").src = results[i].image;
    }


});
