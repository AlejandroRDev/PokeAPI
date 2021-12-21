//Englobo en una variable la lista.

const ol$$ = document.querySelector("#pokedex");
const button$ = document.querySelector(".imgSearch");
const input$$ = document.querySelector("input");
const inputSection = document.querySelector('#inputSection')
const littlePokedex = document.getElementById('littlePokedex')



//Recuperamos los 150 pokemon a traves de un bucle for.
const getAllPokemons = async () => {
  for (let i = 1; i < 151; i++) {
    const allPokemons = await fetch("https://pokeapi.co/api/v2/pokemon/" + i);
    const allPokemonsRes = await allPokemons.json();
    const div$$ = document.createElement("div");
    const imagen = allPokemonsRes.sprites.other.dream_world.front_default;
    div$$.innerHTML = `
    <h2 class="card-title">${allPokemonsRes.name}.</h2>
    <img class="card-image" src="${imagen}" alt="${allPokemonsRes.name}" />
    <p class="card-subtitle">Height: ${allPokemonsRes.height}</p>
    <p class="card-subtitle">Weight: ${allPokemonsRes.weight}</p>
    <p class="card-subtitle">Base exp: ${allPokemonsRes.base_experience}</p>
    `;
    div$$.setAttribute("class", "card");
    div$$.setAttribute("id", `${allPokemonsRes.id}`)
    ol$$.appendChild(div$$);
  }
};

getAllPokemons();



const search = async () => {
  function abrirPokeball() {
    intervalID = setInterval(cerrarPokeball, 3000);
    button$.src = "./images/open-pokeball.png";
  }
  function cerrarPokeball() {
    button$.src = "./images/pokeball-button.png";
    clearInterval(intervalID);
  }
  abrirPokeball();
  

    const itemSearch = await fetch("https://pokeapi.co/api/v2/pokemon/" + input$$.value)
    const itemSearchRes = await itemSearch.json();
   console.log(itemSearchRes);
   const divPokemonSearchLeft = document.createElement("div");
   const divPokemonSearchRight = document.createElement("div");
   const imagenSearch = itemSearchRes.sprites.front_default;

   divPokemonSearchLeft.innerHTML = `
   <h2 class="card-title-search">${itemSearchRes.name}.</h2>
   <img class="card-image-search" src="${imagenSearch}" alt="${itemSearchRes.name}" />
   `;

   divPokemonSearchRight.innerHTML = `
   <p class="card-subtitle-search">Height: ${itemSearchRes.height}</p>
   <p class="card-subtitle-search">Weight: ${itemSearchRes.weight}</p>
   <p class="card-subtitle-search">Base exp: ${itemSearchRes.base_experience}</p>
   <a class="card-id-search" href="#${itemSearchRes.id}">Id: ${itemSearchRes.id} VER POKEMON</a>
   `;
   divPokemonSearchRight.setAttribute("class", "card-search-right");
   divPokemonSearchLeft.setAttribute("class", "card-search");
   const buttonReset = document.createElement("button");
   buttonReset.innerHTML = `RESET`;
   buttonReset.setAttribute('class', 'reset-button');
   buttonReset.addEventListener('click', () => {
     littlePokedex.innerHTML = '';
   });
   divPokemonSearchRight.appendChild(buttonReset);
   littlePokedex.appendChild(divPokemonSearchLeft);
   littlePokedex.appendChild(divPokemonSearchRight);
};



button$.addEventListener("click", search);
