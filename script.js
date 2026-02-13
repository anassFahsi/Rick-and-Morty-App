//prompt1:make a function that fetches data from the Rick and Morty API and returns the data for the first page
let currentPage=1;
let totalPages=0;
//prompt 4: add a filter for the characters by status species and name to the fetchCharacters function
let currentFilters={status:"",species:"",name:""}
async function fetchCharacters(page=1,filters={}) {
    try {
    let url = `https://rickandmortyapi.com/api/character?page=${page}`;
    if (filters.status) url += `&status=${filters.status}`;
    if (filters.species) url += `&species=${filters.species}`;
    if (filters.name) url += `&name=${filters.name}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch characters");
    const data = await response.json();
    console.log(data)
    if(!data.results||data.results.length===0){
        displayNoResults();
        return;
    }
    totalPages=data.info.pages;
    displayCharacters(data);
    updateButtons();
    }
    catch(error){
        console.error("Error:",error);
        displayNoResults();
    }
}
function displayNoResults(){
    const charactersContainer = document.querySelector(".characters-container");
    charactersContainer.innerHTML="";
    charactersContainer.innerHTML=`
    <p>No results found</p>
    <button id="backToHome">Back to Home</button>
    `;
   document.querySelector(".pagination").style.display="none";

//prompt 4:create a function when click on back to home button it will go to the home page
    document.getElementById("backToHome").addEventListener("click", () => {
        window.location.href = "index.html";
    });

}
//prompt2:make a function that takes the data from the API and display image and name and status and species and in the characters-container
function displayCharacters(data) {
    const charactersContainer = document.querySelector(".characters-container");
    charactersContainer.innerHTML="";
    data.results.forEach((character) => {
        const characterCard = document.createElement("div");
        characterCard.classList.add("character-card");

        characterCard.addEventListener("click", () => {
            window.location.href = `details.html?id=${character.id}`;
        });
        characterCard.style.cursor = "pointer";


        characterCard.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <h2>${character.name}</h2>
            <p><strong>Status: </strong>${character.status}</p>
            <p><strong>Species: </strong>${character.species}</p>
        `;
        charactersContainer.appendChild(characterCard);
    });
}

//prompt 3:make a function that fetches next and previous pages
function updateButtons() { 
     document.getElementById("prev").disabled = currentPage === 1;
     document.getElementById("next").disabled = currentPage === totalPages; 
} 
document.getElementById("prev").addEventListener("click", () => { 
    if (currentPage > 1) {
            currentPage--; 
            fetchCharacters(currentPage,currentFilters);
            } 
        }
    ); 
document.getElementById("next").addEventListener("click", () => {
    if (currentPage < totalPages) {
        currentPage++; 
        fetchCharacters(currentPage,currentFilters);
        } 
    }
);

// Initial load
fetchCharacters(currentPage,currentFilters);

//function to apply filters
document.getElementById("applyFilter").addEventListener("click", () => {
    const status = document.getElementById("status").value;
    const species = document.getElementById("species").value;
    const name = document.getElementById("name").value;
    currentFilters={status,species,name};
    fetchCharacters(currentPage, currentFilters);
});


