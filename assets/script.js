const pokemonListContainer = document.querySelector('.pokemon-list');
const searchInput = document.getElementById('searchInput');
const pokemonList = document.querySelector('.pokemon-list');
const loadMoreButton = document.querySelector('#load-more');




async function loadMorePokemons() {
    currentPage++;
    await displayAllPokemonInfo();
}

window.addEventListener('scroll', async () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        await loadMorePokemons();
    }
});



// No evento 'input' do searchInput:
searchInput.addEventListener('input', async (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const notFoundMessageContainer = document.querySelector('.not-found-message');
    notFoundMessageContainer.innerHTML = ''; // Limpa o conteúdo anterior

    let pokemonFound = false; // Variável para controlar se um Pokémon foi encontrado

    const allPokemonCards = document.querySelectorAll('.pokemon-card');

    for (let i = 0; i < allPokemonCards.length; i++) {
        const pokemonCard = allPokemonCards[i];
        const pokemonName = pokemonCard.querySelector('.pokemon-name').textContent.toLowerCase();

        if (pokemonName.includes(searchTerm)) {
            pokemonCard.style.display = 'block';
            pokemonFound = true;
        } else {
            pokemonCard.style.display = 'none';
        }
    }

    if (!pokemonFound && searchTerm) {
        const notFoundMessage = document.createElement('p');
        notFoundMessage.textContent = 'Nenhum Pokémon encontrado com esse nome';
        notFoundMessageContainer.appendChild(notFoundMessage);
    } else if (!searchTerm) {
        const notFoundMessage = document.createElement('p');
        notFoundMessage.textContent = 'Digite o nome de um Pokémon';
        notFoundMessageContainer.appendChild(notFoundMessage);
    }
});

async function searchPokemon(searchTerm) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);

    if (response.status === 404) {
        return { notFound: true };
    }

    const data = await response.json();
    return data;
}



async function fetchPokemonList(offset, limit) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const data = await response.json();
    return data.results;
}


async function fetchPokemonData(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await response.json();
    return data;
}




const itemsPerPage = 21;
let currentPage = 1;

async function displayAllPokemonInfo() {
    const pokemonList = await fetchPokemonList((currentPage - 1) * itemsPerPage, itemsPerPage);

    pokemonList.forEach(async pokemon => {
        const pokemonData = await fetchPokemonData(pokemon.name);

        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');

        pokemonCard.innerHTML = `<div class="img-box">
            <img src="${pokemonData.sprites.other["official-artwork"].front_default}" alt="${pokemonData.name}">
        </div>
        <div class="content">
            <h2 class="pokemon-name">${pokemonData.name}</h2>
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
   `;;

        pokemonListContainer.appendChild(pokemonCard);
    });

    currentPage++; // Correção: use "currentPage" em vez de "page"}
}







displayAllPokemonInfo();

