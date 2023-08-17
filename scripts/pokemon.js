

// Função para exibir todos os Pokémon
function displayAllPokemonInfo(pokemonList) {
    for (const pokemon of pokemonList) {
        const pokemonData = await fetchPokemonData(pokemon.name);
        const pokemonCard = createPokemonCard(pokemonData);
        pokemonListContainer.appendChild(pokemonCard);
    }

    currentPage++;
}

// ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;



//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;


// Função para filtrar Pokémon por estatísticas
async function filterPokemonByStats(selectedStat, selectedComparison, selectedValue) {
    const allPokemon = await fetchPokemonList(0, 898);
    const filteredPokemon = allPokemon.filter(pokemon => {
        return pokemon.stats.some(stat => {
            return stat.stat.name === selectedStat && compareStats(stat.base_stat, selectedComparison, selectedValue);
        });
    });
    displayFilteredPokemon(filteredPokemon);
}


//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;


// Função para exibir Pokémon filtrados
function displayFilteredPokemon(pokemonList) {
    pokemonListContainer.innerHTML = '';
    pokemonList.forEach(pokemonData => {
        const pokemonCard = createPokemonCard(pokemonData);
        pokemonListContainer.appendChild(pokemonCard);
    });
}

// Exportando as funções

window.createPokemonCard = createPokemonCard;
window.filterPokemonByType = filterPokemonByType;
window.filterPokemonByStats = filterPokemonByStats;
window.displayFilteredPokemon = displayFilteredPokemon;