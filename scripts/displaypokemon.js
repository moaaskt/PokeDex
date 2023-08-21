const pokemonContainer = document.querySelector('.pokemon-container');
const pokemonSelect = document.querySelector('#pokemon-select');

async function fetchPokemonList() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const data = await response.json();
    return data.results;


}



async function fetchPokemonData(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await response.json();
    return data;
}






function displayPokemonInfo(pokemon) {
    const pokemonInfo = document.createElement('div');
    pokemonInfo.classList.add('pokemon-info');
    pokemonInfo.innerHTML = `
        <h2>${pokemon.name}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p>Height: ${pokemon.height} decimetres</p>
        <p>Weight: ${pokemon.weight} hectograms</p>
    `;
    pokemonContainer.appendChild(pokemonInfo);
}






async function displayAllPokemonInfo() {
    const pokemonList = await fetchPokemonList();
    pokemonList.forEach(async pokemon => {
        const pokemonData = await fetchPokemonData(pokemon.name);
        displayPokemonInfo(pokemonData);
    });
}

displayAllPokemonInfo();