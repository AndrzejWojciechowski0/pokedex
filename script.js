const api = 'http://pokeapi.co/api/v2'

function buildPokemon(pokemon) {
    return `
    <div id = "pokedex"><div class = "pokemon row"> 
    <img src = "" class = "img">
    <div class = "col">
        <span class = "text"> ${pokemon.name} </span>
        <span class = "text "> ${pokemon.types} </span>
        <span class = "text"> ${pokemon.weight} </span>
    </div>
</div>
</div>"
`
}
let pokemons = [];
function loadPokemons() {
    const pro = fetch(api + "/pokemon")
        pro.then(function (resp) {
            return resp.json();
        })
        .then(function (json) {
            const listaPokemonow = json.results;
            let requesty = listaPokemonow.map((pokemon) => {
                return fetch(pokemon.url)
                    .then(function (resp) {
                        return resp.json();
                    })
                })
    Promise.all(requesty).then(function (pokemony){
            const listaHtmliPokemonow = pokemony
                .map((pokemon) => buildPokemon(pokemon))
            const htmlWszystkichPokemonow = listaHtmliPokemonow.join();
            document.querySelector("#pokemony").innerHTML = htmlWszystkichPokemonow;
        })
        .catch(function (err) {
            console.error(err)
        })
    })
}
document.addEventListener("load", loadPokemons)
loadPokemons()
