
const pokeApi = {}

function convertPokeApiDetailToPokemon (pokemonsDetail) {
    const pokemon = new Pokemon ()
    pokemon.number = pokemonsDetail.id
    pokemon.name = pokemonsDetail.name

    const types = pokemonsDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokemon.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then (convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset= 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
   
    return fetch(url)
    .then((response) =>  response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequest) => Promise.all(detailRequest))
    .then((pokemonsDetails) => pokemonsDetails)
 
}

