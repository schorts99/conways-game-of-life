module Boards
  module Create
    class BoardCreator
      def create
        Board.create!(grid: [])
      end
    end
  end
end
