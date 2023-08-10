// ...

const statSelect = document.getElementById('statSelect');
const comparisonSelect = document.getElementById('comparisonSelect');
const valueInput = document.getElementById('valueInput');
const filterButton = document.getElementById('filterButton');

// ...

// Evento de clique do botão de filtro
filterButton.addEventListener('click', async () => {
    const selectedStat = statSelect.value;
    const selectedComparison = comparisonSelect.value;
    const selectedValue = parseFloat(valueInput.value);

    const allPokemon = await fetchPokemonList(0, 898); // Buscar todos os Pokémon

    const filteredPokemon = allPokemon.filter(pokemon => {
        return pokemon.stats.some(stat => {
            return stat.stat.name === selectedStat && compareStats(stat.base_stat, selectedComparison, selectedValue);
        });
    });

    displayFilteredPokemon(filteredPokemon);
});

// ...

async function fetchPokemonList(offset, limit) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const data = await response.json();
    return data.results;
}