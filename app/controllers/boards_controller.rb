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
    board_finder = ::Boards::Find::BoardFinder.new
    @board = board_finder.find(params[:id])

    redirect_to root_path unless @board
  end
end
