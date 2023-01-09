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
    <button class="btn" id="${pokemon.id}" onClick="loadPokemonStats(${
    pokemon.id
  })">Stats</button>
  </li>
  <button class="statsSheet" data-id="${
    pokemon.id
  }"  onClick="closePokemonStats(${pokemon.id})">

  <section class="stats"> 
  <h2>${pokemon.name.toUpperCase()}</h2>
  <img src="${pokemon.statsImage}" alt="${pokemon.name}" />
  <section class="stat">
  <div class="statBarTitle"> <span >HP ${pokemon.hp}</span>
  <span class="stat">Attack ${pokemon.attack}</span>
  <span class="stat">Defense ${pokemon.defense}</span>
  <span class="stat">Sp. Atk ${pokemon.specialAttack}</span>
  <span class="stat">Sp. Def ${pokemon.specialDefense}</span>
  <span class="stat">Speed ${pokemon.speed}</span>
  </div>
  <div class="statBar">
  <div class="bar ${pokemon.type}" style="--width: ${pokemon.hp};"></div>
  <div class="bar ${pokemon.type}" style="--width: ${pokemon.attack}"></div>
  <div class="bar ${pokemon.type}" style="--width: ${pokemon.defense}"></div>
  <div class="bar ${pokemon.type}" style="--width: ${
    pokemon.specialAttack
  }"></div>
  <div class="bar ${pokemon.type}" style="--width: ${
    pokemon.specialDefense
  }"></div>
  <div class="bar ${pokemon.type}" style="--width: ${pokemon.speed}"></div>  
  </div>
  </section>
  </section>
  </button>
 
  `;
};

const loadPokemonStats = (id) => {
  const stats = document.querySelector(`[data-id="${id}"]`);
  stats.style.display = "flex";
  console.log(stats.style.display);
};

const closePokemonStats = (id) => {
  const stats = document.querySelector(`[data-id="${id}"]`);
  stats.style.display = "none";
};

const loadPokemonItens = (offset, limit) => {
  pokeApi.getPokemon(offset, limit).then((allPokemon = []) => {
    pokemonList.innerHTML += allPokemon.map(convertPokemonToLi).join("");
  });
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
