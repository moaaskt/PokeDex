// Seleciona o elemento HTML com a classe 'pokemon-container'
const pokemonContainer = document.querySelector('.pokemon-container');

// Seleciona o elemento HTML com o id 'pokemon-select' (que não parece estar em uso)
const pokemonSelect = document.querySelector('#pokemon-select');



// Função assíncrona que busca a lista de Pokémon da API
async function fetchPokemonList() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const data = await response.json();
    return data.results;
}



// Função assíncrona que busca os dados de um Pokémon específico
async function fetchPokemonData(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await response.json();
    return data;
}



// Função que exibe as informações de um Pokémon no DOM
function displayPokemonInfo(pokemon) {
    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('pokemon-card');
    const types = pokemon.types.map(type => type.type.name).join(' ');
    pokemonCard.dataset.type = types;   // Assume que o tipo é o primeiro na lista

    const imgBox = document.createElement('div');   
    imgBox.classList.add('img-box');
    const img = document.createElement('img');
    img.src = pokemon.sprites.other['official-artwork'].front_default;
    img.alt = pokemon.name;
    imgBox.appendChild(img);
    pokemonCard.appendChild(imgBox);

    const content = document.createElement('div');
    content.classList.add('content');
    content.innerHTML = `
    <h2 class="pokemon-name">${pokemon.name}</h2>
    <p>Height: ${pokemon.height} decimetres</p>
    <p>Weight: ${pokemon.weight} hectograms</p>
    <p>Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
    <a href="#" class="read-more">Read more</a>
`;
    pokemonCard.appendChild(content);

    pokemonContainer.appendChild(pokemonCard);
}





// Função assíncrona que exibe informações de todos os Pokémon
async function displayAllPokemonInfo() {
    // Busca a lista de Pokémon
    const pokemonList = await fetchPokemonList();

    const initialPokemonList = pokemonList.slice(0, LOAD_CHUNK_SIZE);

    initialPokemonList.forEach(async pokemon => {
        const pokemonData = await fetchPokemonData(pokemon.name);
        displayPokemonInfo(pokemonData);
    });
}






// Chama a função para exibir informações de todos os Pokémon assim que a página carrega

