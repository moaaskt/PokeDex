const searchInput = document.getElementById('search-input');
const notFoundMessage = document.getElementById('not-found'); // Elemento para exibir mensagem de "Pokémon não encontrado"

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const pokemonCards = document.querySelectorAll('.pokemon-card');

    let pokemonFound = false;

    pokemonCards.forEach(card => {
        const pokemonName = card.querySelector('.pokemon-name').textContent.toLowerCase();

        if (pokemonName.includes(searchTerm)) {
            card.style.display = 'block';
            pokemonFound = true;
        } else {
            card.style.display = 'none';
        }
    });

    if (!pokemonFound) {
        notFoundMessage.style.display = 'block';
    } else {
        notFoundMessage.style.display = 'none';
    }
});


const typeFilterSelect = document.getElementById('type-filter');

typeFilterSelect.addEventListener('change', () => {
    const selectedType = typeFilterSelect.value;
    const pokemonCards = document.querySelectorAll('.pokemon-card');

    pokemonCards.forEach(card => {
        const pokemonType = card.dataset.type.toLowerCase();

        if (selectedType === '' || pokemonType.includes(selectedType)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

displayAllPokemonInfo();    