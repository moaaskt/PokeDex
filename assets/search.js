const advancedSearchButton = document.getElementById('advancedSearchButton');


advancedSearchButton.addEventListener('click', async () => {
    const pokemonType = document.getElementById('pokemonType').value;

    const response = await fetch(`https://pokeapi.co/api/v2/type/${pokemonType}`);
    const data = await response.json();

    const pokemonNames = pokemonType === 'all'
        ? Array.from({ length: 898 }, (_, i) => fetchPokemonData(i + 1).then(pokemon => pokemon.name.toLowerCase()))
        : data.pokemon.map(pokemon => pokemon.pokemon.name);

    const notFoundMessageContainer = document.querySelector('.not-found-message');
    notFoundMessageContainer.innerHTML = ''; // Limpa o conteúdo anterior

    const allPokemonCards = document.querySelectorAll('.pokemon-card');

    for (let i = 1; i <= 898; i++) {
        const pokemonData = await fetchPokemonData(i);
        const pokemonName = pokemonData.name.toLowerCase();
        
        if (pokemonNames.includes(pokemonName)) {
            allPokemonCards[i - 1].style.display = 'block';
        } else {
            allPokemonCards[i - 1].style.display = 'none';
        }
    }

    // Verifica se algum Pokémon foi encontrado
    const foundPokemon = Array.from(allPokemonCards).some(card => card.style.display === 'block');

    if (!foundPokemon) {
        const notFoundMessage = document.createElement('p');
        notFoundMessage.textContent = 'Pokémon não encontrado para o tipo selecionado';
        notFoundMessageContainer.appendChild(notFoundMessage);
    }
});
