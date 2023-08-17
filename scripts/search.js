// Função para atualizar a mensagem de "Pokémon não encontrado"
function updateNotFoundMessage(allPokemonCards) {
    const notFoundMessageContainer = document.querySelector('.not-found-message');
    notFoundMessageContainer.innerHTML = '';

    const foundPokemon = Array.from(allPokemonCards).some(card => card.style.display === 'block');

    if (!foundPokemon) {
        const notFoundMessage = document.createElement('p');
        notFoundMessage.textContent = 'Nenhum Pokémon encontrado para o tipo selecionado';
        notFoundMessageContainer.appendChild(notFoundMessage);
    }
}


window.updateNotFoundMessage = updateNotFoundMessage;
window.handleSearchInput = handleSearchInput;