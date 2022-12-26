const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const stats = document.getElementById("stats");

const maxRecords = 151;
const limit = 12;
let offset = 0;

const convertPokemonToLi = (pokemon) => {
  return `
  <li class="pokemon" id="${pokemon.id}">    

    <span class="number">#${pokemon.id}</span>
    <span class="name">${pokemon.name}</span>
    
    <div class="detail"> 
        <ol class="types">
        ${pokemon.types
          .map((type) => `<li class="type ${type}">${type}</li>`)
          .join("")}      
        </ol>
      <img src="${pokemon.sprite}" alt="${pokemon.name}" />
    </div>
    <button class="btn" id="${pokemon.id} "onClick="loadPokemonStats('${
    pokemon.name
  }')">Details</button>
  </li>
  `;
};

const convertStats = (pokemon) => {
  return `
  <a class="stats" dataset="${pokemon[1]}" href="/">
  <span class="stat">Base Stats</span><br />
  <span class="stat">HP: ${pokemon[5]}</span>
  <span class="stat">Attack: ${pokemon[6]}</span>
  <span class="stat">Defense: ${pokemon[7]}</span>
  <span class="stat">Special Attack: ${pokemon[8]}</span>
  <span class="stat">Special Defense: ${pokemon[9]}</span>
  <span class="stat">Speed: ${pokemon[10]}</span>
  </a>`;
};

const loadPokemonItens = (offset, limit) => {
  pokeApi.getPokemon(offset, limit).then((allPokemon = []) => {
    pokemonList.innerHTML += allPokemon.map(convertPokemonToLi).join("");
  });
};

const loadPokemonStats = (pokemon) => {
  pokeApi
    .getPokemonStats(pokemon)
    .then((pokemonList.innerHTML += convertStats(stats)));
};

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNextPage = offset + limit;

  if (qtdRecordsWithNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
