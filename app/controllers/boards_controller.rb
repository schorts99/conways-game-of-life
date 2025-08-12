class BoardsController < ApplicationController
  def index
    boards_all_getter = ::Boards::GetAll::BoardsAllGetter.new
    @boards = boards_all_getter.get_all
  end

  def create
    board_creator = ::Boards::Create::BoardCreator.new
    board = board_creator.create

    redirect_to board_path(id: board.id)
  end

  def show
  end
end
