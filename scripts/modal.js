function openModal(pokemon) {
    const modal = document.getElementById('pokemon-modal');
    const modalPokemonName = document.getElementById('modal-pokemon-name');
    const modalPokemonDetails = document.getElementById('modal-pokemon-details');
    
    modalPokemonName.textContent = pokemon.name;
    // Preencha as informações detalhadas do Pokémon no modalPokemonDetails
    
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('pokemon-modal');
    modal.style.display = 'none';
}

// Associar o botão de fechar do modal
const closeButton = document.querySelector('.close-button');
closeButton.addEventListener('click', closeModal);
