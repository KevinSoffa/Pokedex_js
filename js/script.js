const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon__number')
const pokemonImage = document.querySelector('.pokemon__image')
const pokemonInput = document.querySelector('.input__search')

let serchPokemon = 1;

const form = document.querySelector('.form')
const prev = document.querySelector('.btn-prev')
const next = document.querySelector('.btn-next')



const fetchPokemon = async (pokemon) => {
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIresponse.status == 200) {
        const data = await APIresponse.json();
        return data;
    }

    const data = await APIresponse.json()

    return data
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Procurando...';
    pokemonNumber.innerHTML = '';
    const data = await fetchPokemon(pokemon);

    if (data) {
    // Dados da API
      pokemonName.innerHTML = data.name;
      pokemonNumber.innerHTML = data.id
      pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
      pokemonInput.value = '';
    } 
    // Arrumar tratamento de erro
    if (data == 404) {
      pokemonName.innerHTML = 'Não encontrado :(';
      pokemonNumber.innerHTML ='';
    }
}


form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(pokemonInput.value.toLowerCase());
});

prev.addEventListener('click', () => {
    if (serchPokemon > 1)
    serchPokemon -= 1;
    renderPokemon(serchPokemon);
})

next.addEventListener('click', () => {
    serchPokemon += 1;
    renderPokemon(serchPokemon);
});


renderPokemon(serchPokemon)
