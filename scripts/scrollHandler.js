const LOAD_CHUNK_SIZE = 152; // Número de Pokémon para carregar a cada vez
let loadedPokemonCount = 0; // Número total de Pokémon carregados

async function loadMorePokemon() {
    const pokemonList = await fetchPokemonList();
    const startIndex = loadedPokemonCount;
    const endIndex = startIndex + LOAD_CHUNK_SIZE;

    for (let i = startIndex; i < endIndex && i < pokemonList.length; i++) {
        const pokemonData = await fetchPokemonData(pokemonList[i].name);
        displayPokemonInfo(pokemonData);
        loadedPokemonCount++;
    }
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        loadMorePokemon();
    }
});
