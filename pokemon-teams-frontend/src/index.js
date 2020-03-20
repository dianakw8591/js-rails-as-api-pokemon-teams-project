const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector('main');

document.addEventListener("DOMContentLoaded", function() {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(data => {
        addTrainers(data);
    })
})

function addTrainers(json) {
    json.forEach(trainer => {
        appendCard(makeCard(trainer))   
    }) 
}

function appendCard(card) {
    main.appendChild(card);
}
function makeCard(trainer) {
    const card = document.createElement('div');
    card.className = 'card';
    card['data-id'] = trainer.id;
    
    const trainerName = document.createElement('p');
    trainerName.innerText = trainer.name;

    const pokeList = document.createElement("ul");

    const addPokeButton = document.createElement('button');
    addPokeButton['data-trainer-id'] = trainer.id;
    addPokeButton.innerText = "Add Pokemon";
    addPokeButton.addEventListener("click", function() {
        if (trainer.pokemon.length < 6) {
            fetch(POKEMONS_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accepts': 'application/json'
                },
                body: JSON.stringify({
                    trainer_id: trainer.id
                })
            })
            .then(resp => resp.json())
            .then(data => {
                addPokemon(data)
                trainer.pokemon.push(data)
            })
        } else {
            alert("No more Pokemon allowed!")
        }
    })

    trainer.pokemon.forEach(p => {
        addPokemon(p);
    })

    function addPokemon(p) {
        const li = document.createElement("li");
        li.innerText = `${p.nickname} (${p.species})`;
        const releaseButton = document.createElement('button');
        releaseButton.className = 'release';
        releaseButton['data-pokemon-id'] = p.id;
        releaseButton.innerText = "Release"
        releaseButton.addEventListener("click", function() {
            fetch(`${POKEMONS_URL}/${p.id}`, {
                method: "DELETE"
            })
            .then(resp => resp.json())
            .then(data => {
                pokeList.removeChild(li);
                const i = trainer.pokemon.indexOf(p);
                trainer.pokemon.splice(i, 1);
            })
        })
        li.appendChild(releaseButton);
        pokeList.appendChild(li);
    }

    card.appendChild(trainerName);
    card.appendChild(addPokeButton);
    card.appendChild(pokeList);

    return card;
}
