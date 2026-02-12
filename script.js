//prompt1:make a function that fetches data from the Rick and Morty API and returns the data for the first page
let currentPage=1;
let totalPages=0;
async function fetchCharacters(page=1) {
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
    const data = await response.json();
    console.log(data)
    totalPages=data.info.pages;
    displayCharacters(data);
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
            <p>Status: ${character.status}</p>
            <p>Species: ${character.species}</p>
        `;
        charactersContainer.appendChild(characterCard);
    });
}

//prompt 3:make a function that fetches next and previous pages
function updateButtons() { document.getElementById("prev").disabled = currentPage === 1; document.getElementById("next").disabled = currentPage === totalPages; } document.getElementById("prev").addEventListener("click", () => { if (currentPage > 1) { currentPage--; fetchCharacters(currentPage); } }); document.getElementById("next").addEventListener("click", () => { if (currentPage < totalPages) { currentPage++; fetchCharacters(currentPage); } });

// Initial load
fetchCharacters(currentPage);







