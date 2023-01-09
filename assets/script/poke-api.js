const pokeApi = {};

const convertPokeApiToPokemon = (pokeDetail) => {
  const pokemon = new Pokemon();
  pokemon.id = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  pokemon.hp = pokeDetail.stats[0].base_stat;
  pokemon.attack = pokeDetail.stats[1].base_stat;
  pokemon.defense = pokeDetail.stats[2].base_stat;
  pokemon.specialAttack = pokeDetail.stats[3].base_stat;
  pokemon.specialDefense = pokeDetail.stats[4].base_stat;
  pokemon.speed = pokeDetail.stats[5].base_stat;
  pokemon.statsImage =
    pokeDetail.sprites.other["official-artwork"].front_default;

  pokemon.sprite = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon;
};

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiToPokemon);
};

pokeApi.getPokemon = (offset = 0, limit = 10) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((allPokemon) => allPokemon.map(pokeApi.getPokemonDetail))
    .then((detailRequest) => Promise.all(detailRequest))
    .catch((error) => console.log(error));
};
