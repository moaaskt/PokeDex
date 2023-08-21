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


const typeFilterCheckboxes = document.querySelectorAll('.type-filter');

typeFilterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const selectedTypes = Array.from(typeFilterCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value.toLowerCase());

        const pokemonCards = document.querySelectorAll('.pokemon-card');

        pokemonCards.forEach(card => {
            const pokemonTypes = card.dataset.types.split(' ');

            if (selectedTypes.length === 0) {
                card.style.display = 'block'; // Mostra todos se nenhum tipo estiver selecionado
            } else if (selectedTypes.every(type => pokemonTypes.includes(type))) {
                card.style.display = 'block'; // Mostra apenas os Pokémon do tipo selecionado
            } else {
                card.style.display = 'none'; // Esconde os Pokémon de outros tipos
            }
        });
    });
});



function filterPokemonsByType(type) {
    const pokemonCards = document.querySelectorAll('.pokemon-card');
    
    pokemonCards.forEach(card => {
        const pokemonTypes = card.dataset.types.split(' ');
        if (pokemonTypes.includes(type) || type === 'all') {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}



displayAllPokemonInfo();    