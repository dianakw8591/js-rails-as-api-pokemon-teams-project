class TrainersController < ApplicationController
    def index
        trainers = Trainer.all;
        render json: trainers, include: :pokemon
    end

    def show
        trainer = Trainer.find(params[:id])
        render json: {id: trainer.id, name: trainer.name, pokemon: trainer.pokemon}
    end
end
