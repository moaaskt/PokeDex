// Função para buscar informações de um Pokémon
async function fetchPokemonData(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await response.json();
    return data;
}

// Função para buscar uma lista de Pokémon
async function fetchPokemonList(offset, limit) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const data = await response.json();
    const pokemonDataList = await Promise.all(data.results.map(async pokemon => {
        const pokemonData = await fetchPokemonData(pokemon.name);
        return pokemonData;
    }));
    return pokemonDataList;
}

// Função para criar um cartão de Pokémon
export function createPokemonCard(pokemonData) {
    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('pokemon-card');

    pokemonCard.innerHTML = `
        <div class="img-box">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png" alt="${pokemonData.name}">
        </div>
        <div class="content">
            <h2 class="pokemon-name">${pokemonData.name}</h2>
            <p class="pokemon-types">${pokemonData.types.map(type => type.type.name).join(', ')}</p>
            <p class="pokemon-info">Height: <span>${pokemonData.height} decimetres</span></p>
            <p class="pokemon-info">Weight: <span>${pokemonData.weight} hectograms</span></p>
            <a href="#" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modal-${pokemonData.name}">Habilidades</a>
            <div class="modal fade" id="modal-${pokemonData.name}" tabindex="-1" aria-labelledby="modalLabel-${pokemonData.name}" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalLabel-${pokemonData.name}">${pokemonData.name}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p class="pokemon-info">Status:</p>
                            <ul class="pokemon-stats">
                                ${pokemonData.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   `;

    return pokemonCard;
}

// Função para filtrar Pokémon por tipo
async function filterPokemonByType(selectedType) {
    const allPokemon = await fetchPokemonList(0, 898);
    const filteredPokemon = allPokemon.filter(pokemon => {
        return pokemon.types.some(type => type === selectedType);
    });
    displayFilteredPokemon(filteredPokemon);
}

