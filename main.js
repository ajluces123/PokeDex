AOS.init();

// Global Variables to manage pagination
let currentPage = 1;
const limit = 20; // Show 20 cards per page
let totalPokemon = 1025; // Total number of Pokémon available from the API
let txtField = document.getElementById('pokeSearch');
let btnSearch = document.getElementById('btnSearch');
// Define type colors
const typeColors = {
  grass: '#00AD61',
  fire: '#F9A040',
  water: '#1484CF',
  bug: '#A8B820',
  normal: '#7E7E7E',
  poison: '#A479FF',
  electric: '#F8D030',
  ground: '#E0C068',
  fairy: '#EE99AC',
  fighting: '#C03028',
  psychic: '#F85888',
  rock: '#B8A038',
  ghost: '#705898',
  ice: '#98D8D8',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  flying: '#A890F0'
};

// Fetch data from an API
async function fetchData(page = 1) {
  const pageIndex = document.getElementById('page'); //show current page
  const container = document.getElementById('card-container');
  container.innerHTML = ''; // Clear container for each page load
pageIndex.innerHTML = 'Page: '+currentPage;
  const offset = (page - 1) * limit;
  const pokeapi = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

  const response = await fetch(pokeapi);
  const data = await response.json();

  // Fetch each Pokémon details
  for (const pokemon of data.results) {
    const pokeDetails = await fetch(pokemon.url);
    const pokeData = await pokeDetails.json();

    // Create a card element
    const card = document.createElement('div');
    card.setAttribute('data-aos', 'fade-up');
    card.classList.add('card');

    // Create an img element and set its src and alt attributes
    const img = document.createElement('img');
    img.src = pokeData.sprites.other['official-artwork'].front_default;
    img.alt = pokeData.name;

img.addEventListener('click', function() {
  console.log(data);
  console.log("hello world");
})
    // Create an h2 element for the name
    const name = document.createElement('h2');
    name.textContent = pokeData.name;

    // Create a div element for the type and set its background color
    const type = document.createElement('div');
    type.classList.add('type');
    const pokemonType = pokeData.types[0].type.name;
    type.innerHTML = 'TYPE: ' + pokemonType;

    // Apply background color based on the type
    type.style.backgroundColor = typeColors[pokemonType] || '#A8A878'; // Default to normal color if type is not found

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.innerHTML = `#${pokeData.id}`;

    const description = document.createElement('div');
    description.classList.add('description');

    const div1 = document.createElement('div');
    div1.classList.add('div1');
    //display lable and data for HP
    const number = document.createElement('div');
    number.classList.add('number');
    number.innerHTML = pokeData.stats[0].base_stat;
    const label = document.createElement('div');
    label.classList.add('label');
    label.innerHTML = 'HP';
    
    const div2 = document.createElement('div');
    div2.classList.add('div2');
    //display lable and data for DEF
    const number1 = document.createElement('div');
    number1.classList.add('number');
    
    number1.innerHTML = pokeData.stats[2].base_stat;
    const label1 = document.createElement('div');
    label1.classList.add('label');
    label1.innerHTML = 'DEFENSE';
    
    const div3 = document.createElement('div');
    div3.classList.add('div3');
    const number2 = document.createElement('div');
    number2.classList.add('number');
    number2.innerHTML = pokeData.stats[2].base_stat;
    
    const label2 = document.createElement('div');
    label2.classList.add('label');
    label2.innerHTML = 'ATTACK';

    // Append the elements to the card
    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(type);
    card.appendChild(overlay);
    
    card.appendChild(description);
    description.appendChild(div1);
    description.appendChild(div2);
    description.appendChild(div3);
    
    div2.appendChild(number1);
    div2.appendChild(label1);
    
    div1.appendChild(number);
    div1.appendChild(label);
    
    div3.appendChild(number2);
    div3.appendChild(label2);
 
    // Append the card to the container
    container.appendChild(card);
  }

  // Enable/Disable buttons based on the current page
  const nextBtn = document.getElementById('next');
  const prevBtn = document.getElementById('prev');

  prevBtn.disabled = currentPage === 1; // Disable Previous button on first page
  nextBtn.disabled = currentPage * limit >= totalPokemon; // Disable Next button on last page
}

// Function to handle the next and previous buttons
function handlePagination() {
  const nextBtn = document.getElementById('next');
  const prevBtn = document.getElementById('prev');

  nextBtn.addEventListener('click', () => {
    if (currentPage * limit < totalPokemon) {
      currentPage++;
      fetchData(currentPage);
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      fetchData(currentPage);
    }
  });
}

// Call fetchData and handlePagination to initiate the process
fetchData(currentPage);
handlePagination();