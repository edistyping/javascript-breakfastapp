

var items = document.getElementsByClassName("container-grid-items");

// Searching for an item

var dataLoaded = false;
async function getKoreanReceipts() {

    var url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast";
    // var finalURL = url + `&apiKey=${API_KEY}`

    const response = await fetch(url)
    .then(response => response.json())
    .then(data => {
        dataLoaded = true;
        return data.meals
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    return response;
}



// Search button  
var results;
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", async () => {
    document.getElementById("image-spiderman").style.display = "none";

    const response = await getKoreanReceipts();
    results = response;
    console.log(response);
    
    if (dataLoaded == false) {
        hideItems();
        return;
    } else {
        showItems();
    }
    
    createPost();

});

var counter = 0;
const container = document.querySelector('.container-grid');
function createPost(){
    
    const post = document.createElement('div');
	post.className = 'container-grid-items';
	post.innerHTML = 
    `<h3 id="header-dishname">${results[counter].strMeal}</h3>
    <img id="img-dish" src="${results[counter].strMealThumb}" >
	<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque eos, atque sed saepe
	   tempore, sequi qui excepturi voluptate ut perspiciatis culpa sit harum, corrupti ullam 
	   voluptatibus obcaecati sint dignissimos quas.</p>`;

    // Appending the post to the container.
	container.appendChild(post);
    counter++;
}

function showItems() {
    document.getElementsByClassName('container-grid')[0].style.display = 'block';
}
function hideItems() {
    document.getElementsByClassName('container-grid')[0].style.display = 'none';
}

window.addEventListener('scroll',()=>{   

    const {scrollHeight,scrollTop,clientHeight} = document.documentElement;
	if(scrollTop + clientHeight > scrollHeight - 5){
		setTimeout(createPost,0);

	}
});