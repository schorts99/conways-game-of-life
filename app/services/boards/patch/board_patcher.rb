module Boards
  module Patch
    class BoardPatcher
      def patch(id, grid)
        board = Board.find_by(id:)

        raise ::Boards::BoardNotFound, "id: #{id}" unless board

        board.update!(grid:)
      end
    end
  end
end
