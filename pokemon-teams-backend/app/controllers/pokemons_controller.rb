class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: pokemons
    end

    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        new_pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
        render json: new_pokemon
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
        render json: {msg: "delete successful"}
    end
end
