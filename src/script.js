const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonprev = document.querySelector('.btn-prev');
const buttonnext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        return res.json();
    } catch (err) {
        return err
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    try {
        const data = await fetchPokemon(pokemon);

        if (!data) return;

        pokemonSprite = data['sprites']['versions']['generation-v']['black-white']['animated']
        ['front_default']

        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = pokemonSprite
        searchPokemon = data.id;
        console.log(pokemonImage.src)
        console.log(data)

        if (!pokemonSprite) {
            pokemonStaticSprite = data['sprites']['front_default']
            pokemonImage.src = pokemonStaticSprite
        }
    } catch (err) {
        pokemonName.innerHTML = 'Not Found :c';
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display = 'none';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    input.value = '';

});

buttonprev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonnext.addEventListener('click', () => {
    if (searchPokemon < 1024) {
        searchPokemon += 1;
        renderPokemon(searchPokemon);
    }
});

renderPokemon(searchPokemon);

