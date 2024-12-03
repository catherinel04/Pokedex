
const API_URL = "https://pokeapi.co/api/v2/pokemon";


const tableBody = document.querySelector("#pokemon-table tbody");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const pageInfo = document.getElementById("page-info");


let currentPage = 1;
const itemsPerPage = 10;
let totalPokemon = 0;


async function fetchPokemon(page) {
    const offset = (page - 1) * itemsPerPage;
    const url = `${API_URL}?offset=${offset}&limit=${itemsPerPage}`;
    const response = await fetch(url);
    const data = await response.json();

    totalPokemon = data.count;
    return data.results;
}

// Render Pokémon data into the table
function renderPokemonTable(pokemonList) {
    tableBody.innerHTML = ""; // Clear existing rows
    pokemonList.forEach((pokemon, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${(currentPage - 1) * itemsPerPage + index + 1}</td>
      <td>${pokemon.name}</td>
    `;
        tableBody.appendChild(row);
    });
}

function updatePagination() {
    const totalPages = Math.ceil(totalPokemon / itemsPerPage);
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
}


async function changePage(newPage) {
    currentPage = newPage;
    const pokemonList = await fetchPokemon(currentPage);
    renderPokemonTable(pokemonList);
    updatePagination();
}

async function init() {
    const pokemonList = await fetchPokemon(currentPage);
    renderPokemonTable(pokemonList);
    updatePagination();
}


prevButton.addEventListener("click", () => changePage(currentPage - 1));
nextButton.addEventListener("click", () => changePage(currentPage + 1));

init();
