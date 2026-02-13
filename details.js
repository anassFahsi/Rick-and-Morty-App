//prompt 1:using query parameters, get the id from the URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id")
//prompt 2:make a function that fetches characters details like image name and status and species and gender and origin and location and episodes from the API using the id
async function getCharacterDetails(id) {
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    if (!response.ok) throw new Error("Failed to fetch character details");
    const character = await response.json();
    displayCharacterDetails(character) 
  } catch (error) {
    console.error("Error:", error);
  }
}
//prompt 3:make a function that takes the data from the API and display image and name and status and species and in the character-details container
function displayCharacterDetails(character) {
    const characterDetailsContainer = document.querySelector("#character-Details");
    characterDetailsContainer.innerHTML = `
    <div>
        <h2 id="character-name">${character.name}</h2>
        <img id="character-image" src="${character.image}" alt="${character.name}">
    </div> 
    <div>   
        <p><strong>Status: </strong>${character.status}</p>
        <p><strong>Species: </strong>${character.species}</p>
        <p><strong>Gender: </strong>${character.gender}</p>
        <p><strong>Origin: </strong>${character.origin.name}</p>
        <p><strong>Location: </strong>${character.location.name}</p>
        <p><strong>Episodes: </strong>${character.episode.length}</p>
    </div>
    `;


}
getCharacterDetails(id)


        
