module Boards
  module GetAll
    class BoardsAllGetter
      def get_all
        Board.all
      end
    end
  end
end
