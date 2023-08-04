const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Buscando...';
    pokemonNumber.innerHTML = '';
    pokemonImage.src = 'images/pokemon-trainer.gif';

    const data = await fetchPokemon(pokemon);
    if (data && data.id <= '649') {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonName.innerHTML = 'Not Found';
        pokemonNumber.innerHTML = '?';
        pokemonImage.src = 'images/notFound.gif';
        input.value = '';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.preventDefault();
    const inputValue = input.value.toLowerCase();
    if (!isNaN(parseInt(inputValue, 10))) {
        renderPokemon(parseInt(inputValue, 10));
    } else {
        renderPokemon(inputValue);
    }
})

btnPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

btnNext.addEventListener('click', () => {
    if (searchPokemon < 649) {
        searchPokemon += 1;
        renderPokemon(searchPokemon);
    }
});

renderPokemon(searchPokemon);
//