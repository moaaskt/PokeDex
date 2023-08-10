// Seleciona elementos da página
const pokemonListContainer = document.querySelector('.pokemon-list');
const searchInput = document.getElementById('searchInput');
const pokemonList = document.querySelector('.pokemon-list');
const loadMoreButton = document.querySelector('#load-more');



// Função para carregar mais Pokémon ao rolar a página
async function loadMorePokemons() {
    currentPage++;
    await displayAllPokemonInfo();
    filterPokemonByType();

}




// Adiciona um ouvinte de evento de rolagem para carregar mais Pokémon
window.addEventListener('scroll', async () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        await loadMorePokemons();
    }
});


// Função para procurar Pokémon pelo tipo selecionado
const advancedSearchButton = document.getElementById('advancedSearchButton');

advancedSearchButton.addEventListener('click', async () => {

    const pokemonType = document.getElementById('pokemonType').value;

    const response = await fetch(`https://pokeapi.co/api/v2/type/${pokemonType}`);
    const data = await response.json();

    const pokemonNames = data.pokemon.map(entry => entry.pokemon.name);

    const allPokemonCards = document.querySelectorAll('.pokemon-card');

    allPokemonCards.forEach(async (card) => {
        const pokemonName = card.querySelector('.pokemon-name').textContent.toLowerCase();
        const pokemonData = await fetchPokemonData(pokemonName);
        const types = pokemonData.types.map(type => type.type.name);

        if (pokemonNames.includes(pokemonName) && types.includes(pokemonType)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    // Verifica se algum Pokémon foi encontrado
    const foundPokemon = Array.from(allPokemonCards).some(card => card.style.display === 'block');

    const notFoundMessageContainer = document.querySelector('.not-found-message');
    notFoundMessageContainer.innerHTML = '';

    if (!foundPokemon) {
        const notFoundMessage = document.createElement('p');
        notFoundMessage.textContent = 'Nenhum Pokémon encontrado para o tipo selecionado';
        notFoundMessageContainer.appendChild(notFoundMessage);
    }
});
async function filterPokemonByType() {
    const pokemonType = document.getElementById('pokemonType').value;
    const allPokemonCards = document.querySelectorAll('.pokemon-card');

    for (const card of allPokemonCards) {
        const pokemonName = card.querySelector('.pokemon-name').textContent.toLowerCase();
        const pokemonData = await fetchPokemonData(pokemonName);
        const types = pokemonData.types.map(type => type.type.name);

        if (pokemonType === 'all' || types.includes(pokemonType)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    }

    updateNotFoundMessage(allPokemonCards);
}




// Filtra Pokémon com base no status selecionado
const statFilter = document.querySelector('.stat-filter');
const statSelect = statFilter.querySelector('#statSelect');
const comparisonSelect = statFilter.querySelector('#comparisonSelect');
const valueInput = statFilter.querySelector('#valueInput');
const filterButton = document.getElementById('filterButton');

filterButton.addEventListener('click', async () => {
    console.log("Filter button clicked!");
    const selectedStat = statSelect.value;
    const selectedComparison = comparisonSelect.value;
    const selectedValue = parseFloat(valueInput.value);

    const allPokemon = await fetchPokemonList(0, 898);

    const filteredPokemon = allPokemon.filter(async (pokemon) => {
        const pokemonData = await fetchPokemonData(pokemon.name);
        return pokemonData.stats.some((stat) => {
            return stat.stat.name === selectedStat && compareStats(stat.base_stat, selectedComparison, selectedValue);
        });
    });

    displayFilteredPokemon(filteredPokemon);
});
// Função para comparar estatísticas de um Pokémon
function compareStats(statValue, comparison, value) {
    switch (comparison) {
        case '=':
            return statValue === value;
        case '>':
            return statValue > value;
        case '<':
            return statValue < value;
        default:
            return false;
    }
}


// Função para atualizar a mensagem de "Pokémon não encontrado"
function updateNotFoundMessage(allPokemonCards) {
    const notFoundMessageContainer = document.querySelector('.not-found-message');
    notFoundMessageContainer.innerHTML = '';

    // Verifica se algum Pokémon foi encontrado
    const foundPokemon = Array.from(allPokemonCards).some(card => card.style.display === 'block');

    if (!foundPokemon) {
        const notFoundMessage = document.createElement('p');
        notFoundMessage.textContent = 'Nenhum Pokémon encontrado para o tipo selecionado';
        notFoundMessageContainer.appendChild(notFoundMessage);
    }
}


// Atualiza a exibição dos Pokémon de acordo com a entrada no campo de pesquisa
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
    const pokemonDataList = await Promise.all(data.results.map(async pokemon => {
        const pokemonData = await fetchPokemonData(pokemon.name);
        return pokemonData;
    }));
    return pokemonDataList;
}

// Função para buscar informações de um Pokémon
async function fetchPokemonData(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await response.json();
    return data;
}





const itemsPerPage = 21;
let currentPage = 1;
// Função para exibir todos os Pokémon
async function displayAllPokemonInfo() {
    const pokemonList = await fetchPokemonList((currentPage - 1) * itemsPerPage, itemsPerPage);

    pokemonList.forEach(pokemonData => {
        const pokemonCard = createPokemonCard(pokemonData);
        pokemonListContainer.appendChild(pokemonCard);
    });

    currentPage++;
    filterPokemonByType();
}



async function filterPokemonByType() {
    const pokemonType = document.getElementById('pokemonType').value;
    const allPokemonCards = document.querySelectorAll('.pokemon-card');

    console.log(`Filtering Pokémon by type: ${pokemonType}`); // Adicione esta linha

    for (const card of allPokemonCards) {
        console.log('Inside loop'); // Adicione esta linha
        const pokemonName = card.querySelector('.pokemon-name').textContent.toLowerCase();
        console.log(`Pokemon Name: ${pokemonName}`); // Adicione esta linha
        const pokemonData = await fetchPokemonData(pokemonName);
        const types = pokemonData.types.map(type => type.type.name);

        if (pokemonType === 'all' || types.includes(pokemonType)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    }

    updateNotFoundMessage(allPokemonCards);
    console.log('Filtering complete'); // Adicione esta linha
}



// Função para exibir Pokémon filtrados
async function displayFilteredPokemon(pokemonList) {
    pokemonListContainer.innerHTML = '';

    pokemonList.forEach(pokemonData => {
        const pokemonCard = createPokemonCard(pokemonData);
        pokemonListContainer.appendChild(pokemonCard);
    });
}
displayAllPokemonInfo();

// Função para criar um cartão de Pokémon
function createPokemonCard(pokemonData) {
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







