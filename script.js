const api = 'https://pokeapi.co/api/v2'

function renderPokemon(pokemon){
    let waga = pokemon.weight/10 > 70 ? "dużo" : "mało";  //masa pokemona
	return `
		<div class = "row pokemon">
			<img src="${pokemon.sprites.front_default}">
			<div class="col">
				<span>${pokemon.name}</span>
				<span>type: ${pokemon.types.map(type => type.type.name).join(",")}</span>
                <span>weight: ${pokemon.weight/10} kg</span>
                <span>alert: ${waga} kg</span>
			</div>
		</div>
	`
}


function loadPokemons(pageNumber) {
    if(typeof pageNumber === "undefined") pageNumber = 0;
	const pro = fetch(api + "/pokemon?limit=10&offset="+10*pageNumber); // Promise
	pro.then(function (resp) {
			return resp.json();
		})
		.then(function (json) {
			let listaPokemonow = json.results; // [{},{}]
			let requesty = listaPokemonow.map( 
				(pokemon) => {
					return fetch(pokemon.url)
						.then(function (resp) {
							return resp.json();
						})
					}
			)
			Promise.all(requesty).then(function (pokemony){
                const porównaj = function(a,b){
                    if( a.weight < b.weight) return -1;
                    else if(a.weight > b.weight) return 1;
                    else return 0;
                }
				const listaHtmliPokemonow = pokemony
					.map((pokemon) => renderPokemon(pokemon))
				const htmlWszystkichPokemonow = listaHtmliPokemonow.join(""); // ""
				document.querySelector("#pokemony").innerHTML=htmlWszystkichPokemonow;
			})
			
		})
		.catch(function (err) {
			console.error(err)
		})
}

let pageNumber = 0;
function init(){
document.querySelector("#next").addEventListener( "click",e => {
    pageNumber++;
    loadPokemons(pageNumber);
} )
document.querySelector("#prev").addEventListener( "click",e => {
    pageNumber = pageNumber-1>0 ? pageNumber-1 : 0;
    loadPokemons(pageNumber);
} )
}
document.addEventListener("load",loadPokemons)
loadPokemons()


window.addEventListener("load",init)